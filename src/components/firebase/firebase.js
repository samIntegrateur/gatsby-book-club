import firebaseConfig from "./config";

class Firebase {
  constructor(app) {
    if(!firebaseInstance) {
      app.initializeApp(firebaseConfig);

      this.auth = app.auth();
      this.db = app.firestore();
      this.functions = app.functions();
      this.storage = app.storage();
    }
  }

  async login({email, password}) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async getAuthors() {
    return this.db.collection('authors').get();
  }

  async createBook({bookName, authorId, bookCover, summary}) {
    const createBookCallable = this.functions.httpsCallable('createBook');
    console.log('bookName', bookName);
    console.log('authorId', authorId);
    console.log('bookCover', bookCover);
    console.log('summary', summary);
    return createBookCallable({
      bookName,
      authorId,
      bookCover,
      summary
    })
  }

  async register({email, password, username}) {
    // 1 create user
    await this.auth.createUserWithEmailAndPassword(email, password);
    // 2 create a new corresponding publicProfiles item
    const createProfileCallable = this.functions.httpsCallable('createPublicProfile');
    return createProfileCallable({
      username
    })
  }

  async createAuthor({authorName}) {
    const createAuthorCallable = this.functions.httpsCallable('createAuthor');
    return createAuthorCallable({
      authorName
    })
  }

  async postComment({text, bookId}){
    const myCloudFunctionName = 'postComment';
    const postCommentCallable = this.functions.httpsCallable(myCloudFunctionName);
    return postCommentCallable({
      text,
      bookId
    });
  }

  subscribeToBookComments({bookId, onSnapshot}) {
    const bookRef = this.db.collection('books').doc(bookId);
    // bookRef / book is a firebase reference, not an string
    // https://www.udemy.com/course/gatsby-js-firebase-hybrid-realtime-static-sites/learn/lecture/16021074#overview
    // onSnapshot will execute each time there is a new comment
    return this.db.collection('comments')
      .where('book', '==', bookRef)
      .orderBy('dateCreated', 'desc')
      .onSnapshot(onSnapshot);
  }

  getUserProfile({userId, onSnapshot}) {
    return this.db.collection('publicProfiles')
      .where('userId', '==', userId)
      .limit(1)
      .onSnapshot(onSnapshot);
  }

  async logout() {
    await this.auth.signOut();
  }
}

let firebaseInstance;

function getFirebaseInstance(app) {
  if(!firebaseInstance && app){
    firebaseInstance = new Firebase(app);
    return firebaseInstance;
  }else if(firebaseInstance){
    return firebaseInstance
  }else{
    return null;
  }
}

export default getFirebaseInstance;

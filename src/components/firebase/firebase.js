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

  async register({email, password, username}) {
    const newUser = await this.auth.createUserWithEmailAndPassword(email, password);
    console.log('newUser', newUser);
    // create a new publicProfiles item
    return this.db.collection('publicProfiles').doc(username).set({
      userId: newUser.user.uid
    });
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

  async getUserProfile({userId}) {
    return this.db.collection('publicProfiles').where('userId', '==', userId).get();
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

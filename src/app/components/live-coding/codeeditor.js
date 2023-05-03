let editor

export function  InitEditor(id) {
    console.log('Init Editor')
    editor = CodeMirror(document.getElementById(id),{
        lineNumbers: true,
        theme : 'base16-light',
        mode : 'javascript'
    })
    editor.setSize("100%","100%")

    let dbRef = initFireBase()

    Firepad.fromCodeMirror(dbRef, editor,
        {  defaultText: '//Write Your Code Here!' });
        return editor
}

export function downloadCodeFromEditor(filename){
  let anchor = document.createElement("a");
  anchor.style.display = "none"
  anchor.setAttribute("href","data:text/plan;charset=utf-8,"+ editor.getValue())
  anchor.setAttribute("download",filename)
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
} 

export function initFireBase() {
    // Initialize the Firebase SDK.
    !firebase.apps.length ? firebase.initializeApp({
      apiKey: 'AIzaSyDlltq2bxou1tLo55aSQ5pSTLAcKdK33ew',
      databaseURL: 'https://share-code-5db92-default-rtdb.firebaseio.com/'
    }) : firebase.app()  

  
    

    // Get Firebase Database reference.
    var firepadRef = firebase.database().ref();

    const urlparams = new URLSearchParams(window.location.search)

    const roomId = urlparams.get("id")

    if(roomId){
        firepadRef = firepadRef.child(roomId)
    }else{
        firepadRef = firepadRef.push();
        console.log('else case')
        const updateUrlEvent = new CustomEvent('updateUrl', {
            detail: {
              queryParams: {
                id: firepadRef.key,
              }
            }
          });
          
          // trigger the event when the URL needs to be updated
          window.dispatchEvent(updateUrlEvent);
    }

      return firepadRef
  }
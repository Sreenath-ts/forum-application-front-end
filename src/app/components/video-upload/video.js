// // let SelectedFile;
// let Name;
// let sockets;
// let count = 0;
// let offset = 0;
// let chunkSize = 1024 * 1024; // 1MB chunk size, you can adjust this value
// let SelectedFile

// export function FileChosen(evnt) {
//   console.log("file choosen...............");
//   SelectedFile = evnt.target.files[0];
//   document.getElementById("NameBox").value = SelectedFile.name;
// }

// export function StartUpload(socket) {
//   console.log("start upload...........................");
  
//   Name = document.getElementById("NameBox").value;
//   let Content =
//     "<span id='NameArea'>Uploading " +
//     SelectedFile.name +
//     " as " +
//     Name +
//     "</span>";
//   Content +=
//     '<div id="ProgressContainer"><div id="ProgressBar"></div></div><span id="percent">0%</span>';
//   Content +=
//     "<span id='Uploaded'> - <span id='MB'>0</span>/" +
//     Math.round(SelectedFile.size / 1048576) +
//     "MB</span>";
//   document.getElementById("UploadArea").innerHTML = Content;
//   console.log(SelectedFile, "file that is dselected");

//   socket.emit("Start", { Name: Name, Size: SelectedFile.size });
//   count = 1;

//   ReadChunk(socket);




//   socket.on("MoreData", function (data) {
//     UpdateBar(data["Percent"]);
//     let place = data["Place"] * chunkSize;
//     let newFile = SelectedFile.slice(
//       place,
//       place + Math.min(chunkSize, SelectedFile.size - place)
//     );
//     let reader = new FileReader();
//     reader.onload = function (event) {
//       if (event.target.readyState === FileReader.DONE) {
//         let buffer = event.target.result;
//         console.log(buffer,'buffer')
//         socket.emit("Upload", { Name: Name, Data: buffer });
      
//       }
//     };
//     reader.readAsArrayBuffer(newFile);
//   });
  
//   socket.on("UploadComplete", function (data) {
//     console.log("UploadComplete: ", data);
//   });
// }

// function UpdateBar(percent) {
//     document.getElementById("ProgressBar").style.width = percent + "%";
//     document.getElementById("percent").innerHTML = Math.round(percent) + "%";
//     let uploadedMB = Math.round((offset / 1048576) * 100) / 100;
//     document.getElementById("MB").innerHTML = uploadedMB;
//   }
  

// function ReadChunk(socket) {
//   let reader = new FileReader();

//   reader.onload = function (event) {
//     if (event.target.readyState === FileReader.DONE) {
//       let buffer = event.target.result;
//      console.log(typeof buffer,'type,',buffer);
//       socket.emit("Upload", { Name: Name, Data: buffer });

//       offset += buffer.byteLength;

//       UpdateBar((offset / SelectedFile.size) * 100);

//       if (offset < SelectedFile.size) {
//         setTimeout(function () {
//           ReadChunk(socket);
//         }, 0);
//       } else {
//         socket.emit("UploadComplete", { Name: Name });
//       }
//     }
//   };

//   let blob = SelectedFile.slice(offset, offset + chunkSize);
//   reader.readAsArrayBuffer(blob);
// }
// let SelectedFile
// let Name
// let streamReader
// let offset
// const chunkSize = 128 * 1024;
// export function FileChosen(evnt) {
//     console.log("file choosen...............");
//     SelectedFile = evnt.target.files[0];
    
//     // Check file size
   
    
//     document.getElementById("NameBox").value = SelectedFile.name;
//     Name =SelectedFile.name
//   }

// export function StartUpload(socket) {
//     // ...
//     Name = document.getElementById("NameBox").value;
//       let Content =
//         "<span id='NameArea'>Uploading " +
//         SelectedFile.name +
//         " as " +
//         Name +
//         "</span>";
//       Content +=
//         '<div id="ProgressContainer"><div id="ProgressBar"></div></div><span id="percent">0%</span>';
//       Content +=
//         "<span id='Uploaded'> - <span id='MB'>0</span>/" +
//         Math.round(SelectedFile.size / 1048576) +
//         "MB</span>";
//       document.getElementById("UploadArea").innerHTML = Content;
//       console.log(SelectedFile, "file that is dselected");
//     let chunkIndex = 0;
//     let fileSize = SelectedFile.size;
//     let chunks = Math.ceil(fileSize / chunkSize);
  
//     socket.emit("Start", { Name: Name, Size: fileSize });
  
//     streamReader = new FileReader();
//     streamReader.onload = function (event) {
//       let buffer = event.target.result;
//       socket.emit("Upload", { Name: Name, Data: buffer, Index: chunkIndex });
  
//       offset += buffer.byteLength;
  
//       UpdateBar((offset / fileSize) * 100);
  
//       if (offset < fileSize) {
//         chunkIndex++;
//         ReadChunk(socket, chunkIndex);
//       } else {
//         socket.emit("UploadComplete", { Name: Name });
//       }
//     };
  
//     ReadChunk(socket, chunkIndex);

//     socket.on("MoreData", function (data) {
//         let { Place, Percent } = data;
//         let chunkIndex = Place * chunkSize;
      
//         let start = chunkIndex;
//         let end = Math.min(start + chunkSize, SelectedFile.size);
//         let chunk = SelectedFile.slice(start, end);
//         streamReader.readAsArrayBuffer(chunk);
      
//         UpdateBar(Percent);
//       });
//   }
  
//   function ReadChunk(socket, chunkIndex) {
//     let start = chunkIndex * chunkSize;
//     let end = Math.min(start + chunkSize, SelectedFile.size);
//     let chunk = SelectedFile.slice(start, end);
//     streamReader.readAsArrayBuffer(chunk);
//   }
  
//   function UpdateBar(progress) {
//     const progressBar = document.getElementById("ProgressBar");
//     progressBar.style.width = `${progress}%`;
//     progressBar.innerText = `${Math.round(progress)}%`;
//   }

 
let SelectedFile;
let Name;
let streamReader;
let offset;
const chunkSize = 128 * 1024;

export function FileChosen(evnt) {
    
  console.log("file choosen...............");
  SelectedFile = evnt.target.files[0];

  // Check file size

  document.getElementById("NameBox").value = SelectedFile.name;
  Name = SelectedFile.name;
}

export function StartUpload(socket) {
  // ...
  Name = document.getElementById("NameBox").value;
  let Content =
    "<span id='NameArea'>Uploading " +
    SelectedFile.name +
    " as " +
    Name +
    "</span>";
  Content +=
    '<div id="ProgressContainer"><p style="display:inline">uploading percentage   </p><div style="display:inline" id="ProgressBar"></div></div> <span id="percent"> File size</span>';
  Content +=
    "<span id='Uploaded'> - <span id='MB'>0</span>/" +
    Math.round(SelectedFile.size / 1048576) +
    "MB</span>";
  document.getElementById("UploadArea").innerHTML = Content;
  console.log(SelectedFile, "file that is dselected");
  let chunkIndex = 0;
  let fileSize = SelectedFile.size;
  let chunks = Math.ceil(fileSize / chunkSize);

  socket.emit("Start", { Name: Name, Size: fileSize });

  streamReader = new FileReader();
  streamReader.onload = function (event) {
    let buffer = event.target.result;
    socket.emit("Upload", { Name: Name, Data: buffer, Index: chunkIndex });

    offset += buffer.byteLength;

    UpdateBar((offset / fileSize) * 100);

    if (offset < fileSize) {
      chunkIndex++;
      ReadChunk(socket, chunkIndex);
    } else {
      socket.emit("UploadComplete", { Name: Name });
    }
  };

  ReadChunk(socket, chunkIndex);

  socket.on("MoreData", function (data) {
    console.log( data,'moreData....................')
    let { Place, Percent } = data;
    let chunkIndex = Place * chunkSize;

    if (!streamReader || streamReader.readyState !== 1) {
      let start = chunkIndex;
      let end = Math.min(start + chunkSize, SelectedFile.size);
      let chunk = SelectedFile.slice(start, end);
      streamReader.readAsArrayBuffer(chunk);
    }

    UpdateBar(Percent);
  });
}

function ReadChunk(socket, chunkIndex) {
  let start = chunkIndex * chunkSize;
  let end = Math.min(start + chunkSize, SelectedFile.size);
  let chunk = SelectedFile.slice(start, end);

  if (!streamReader || streamReader.readyState !== 1) {
    streamReader.readAsArrayBuffer(chunk);
  }
}

function UpdateBar(progress) {
    console.log(progress,'progress')
    if(!isNaN(progress)){
  const progressBar = document.getElementById("ProgressBar");
  progressBar.style.width = `${progress}%`;
  progressBar.innerText = `${Math.round(progress)}%`;
    }
  
}

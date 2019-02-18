let dropArea = document.getElementById('dropZone');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)
})
function preventDefaults(e) {
  e.preventDefault()
  e.stopPropagation()
}

;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
});
dropArea.addEventListener('drop', handleDrop, false);
dropArea.addEventListener('dragleave', unhighlight, false);

function highlight(e) {
  dropArea.classList.add('highlight')
  dropArea.classList.remove('error');
}
function unhighlight(e) {
  dropArea.classList.remove('highlight')
}
function handleDrop(e) {
  unhighlight()
  let dt = e.dataTransfer
  let files = dt.files
  files && handleFiles(files)
}
function handleFiles(files) {
  files = [...files]
  initializeProgress(files.length)
  getUploadInfo(files.length);
  files.forEach(uploadFile)
}
let dragndropInfo = document.querySelector('.dragndrop-info');
let photoAmount = dragndropInfo.querySelector('.photo-amount');
function getUploadInfo(fileAmount) {
  photoAmount.textContent = fileAmount;
}
function uploadFile(file) {
  let url = 'https://api.cloudinary.com/v1_1/dkmzug1jt/image/upload'
  let formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'fg9gee7t');//_haHaIWantERROR')

  fetch(url, {
    method: 'POST',
    body: formData
  })
    //.then(progressDone) // <- Добавим вызов `progressDone` здесь
    .then(function (response) {
      progressDone();
      if (response.status == 200) {
        let elem = document.createElement('div');
        elem.classList.add('file-container');
        dropArea.querySelector('.dragndrop-default-info').appendChild(elem);
        let fileName = file.name;
        if (file.name.length > 38) {
          fileName = file.name.substring(0, 35);
          fileName += '...';
        }
        dropArea.querySelector('.file-container:last-of-type').textContent = 'Файл "' + fileName + '" успешно загружен';
      }
      if (response.status !== 200) {
        //alert('Загрузка завершилась с ошибкой, код: ' + response.status);
        dropArea.classList.add('error');
        dropArea.querySelector('.dragndrop-default-info').textContent =
          'Ошибка загрузки: ' + response.status + '\nПопробуйте ещё раз.';
      }
    })
    //.catch(response => returnError(response))
    .catch()
}
let filesDone = 0
let filesToDo = 0
let progressBar = document.getElementById('progress-bar')

function initializeProgress(numfiles) {
  dropArea.querySelector('.dragndrop-default-info').innerHTML = '';
  dropArea.querySelector('.dragndrop-default').classList.replace('dragndrop-default', 'dragndrop-with-files');
  progressBar.value = 0
  filesDone = 0
  filesToDo = numfiles
  dropArea.querySelector('.progress').hidden = false;
}
function progressDone() {
  filesDone++
  progressBar.value = filesDone / filesToDo * 100
  if(progressBar.value==100) {
    dropArea.querySelector('.uploading').textContent = 'Загрузка завершена!'
  }
}
function returnError(answer) {

  console.log(answer);
  //alert('Ошибка загрузки изображений')
  console.log('#&@%!')
}
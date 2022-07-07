let colorName = document.getElementById('colorName')
let colorType = document.getElementById('colorType')
let colorCode = document.getElementById('colorCode')
let dynamicBlock = '<div class="color-block-item">\n' +
  '            <div class="color-block-item-inside">\n' +
  '                <h3 class="color-name"></h3>\n' +
  '                <span class="color-type"></span>\n' +
  '                <span class="color-code"></span>\n' +
  '            </div>\n' +
  '        </div>'

function changeColorCodePlaceholder () {
  document.getElementById('colorType').addEventListener('change', function () {
    if (colorType.value === 'RGB') {
      document.getElementById('colorCode').placeholder = '0-255, 0-255, 0-255'
    }
    if (colorType.value === 'RGBA') {
      document.getElementById('colorCode').placeholder = '0-255, 0-255, 0-255, 0-1'
    }
    if (colorType.value === 'HEX') {
      document.getElementById('colorCode').placeholder = '#******'
    }
  })
}
changeColorCodePlaceholder()

function nameError () {
  document.getElementsByClassName('spanInvalid')[0].classList.add('active')
  setTimeout(function () {
    document.getElementsByClassName('spanInvalid')[0].classList.remove('active')
  }, 2000)
}

function colorCodeError () {
  document.getElementsByClassName('spanInvalid')[1].classList.add('active')
  setTimeout(function () {
    document.getElementsByClassName('spanInvalid')[1].classList.remove('active')
  }, 2000)
}

let colorNamesArr = [];
document.getElementById('saveBtn').addEventListener('click', function (e) {
  let nameReg = /^[a-zA-z]+$/;
  let rgbReg = /((?<!\d|\.)([0-9]?[0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?!\d|\.))/gi;
  let rgbaReg = /^(?:rgba?)?[\s]?[\(]?[\s+]?(\d+)[(\s)|(,)]+[\s+]?(\d+)[(\s)|(,)]+[\s+]?(\d+)[(\s)|(,)]+[\s+]?([0-1]?(?:\.\d+)?)$/;
  let hexReg = /^#[a-f0-9]{6}\b/gi;

  for (let i = 0; i < colorNamesArr.length; i++) {
    if (colorName.value === colorNamesArr[i]) {
      nameError();
      addBlock = false;
    }
  }

  if (colorName.value.match(nameReg)) {
    colorNamesArr.push(colorName.value)
  } else {
    nameError();
  }

  if (colorType.value === 'RGB') {
    if (colorCode.value.match(rgbReg)) {
      addBlock()
    } else colorCodeError()
  }
  if (colorType.value === 'RGBA') {
    if (colorCode.value.match(rgbaReg)) {
      addBlock()
    } else colorCodeError()
  }
  if (colorType.value === 'HEX') {
    if (colorCode.value.match(hexReg)) {
      addBlock()
    } else colorCodeError()
  }

  colorNamesArr = colorNamesArr.filter(function(item, pos) {
    return colorNamesArr.indexOf(item) === pos;
  })



  function addBlock () {
    document.getElementsByClassName('color-blocks')[0].insertAdjacentHTML('beforeend', dynamicBlock);

    let colorNamesArrLastChild = colorNamesArr[colorNamesArr.length-1]; //name value
    let colorNameLast = document.getElementsByClassName('color-name')[document.getElementsByClassName('color-name').length -1]; //last color-name
    let colorTypeLast = document.getElementsByClassName('color-type')[document.getElementsByClassName('color-type').length -1]; //last color-type
    let colorCodeLast = document.getElementsByClassName('color-code')[document.getElementsByClassName('color-code').length -1]; //last color-code

    //append block name value
    colorNameLast.textContent = colorNamesArrLastChild;

    //append block color-type value
    colorTypeLast.textContent = colorType.value;

    //append block color-code value
    colorCodeLast.textContent = colorCode.value;

    //add color to block👇🏻
    if (colorType.value === 'RGB') {
      document.getElementsByClassName("color-block-item")[document.getElementsByClassName('color-block-item').length-1].style.background = `rgb(${colorCodeLast.innerText})`;
    }
    if (colorType.value === 'RGBA') {
      document.getElementsByClassName("color-block-item")[document.getElementsByClassName('color-block-item').length-1].style.background = `rgba(${colorCodeLast.innerText})`;
    }
    if (colorType.value === 'HEX') {
      document.getElementsByClassName("color-block-item")[document.getElementsByClassName('color-block-item').length-1].style.background = colorCodeLast.innerText;
    }
  }

})

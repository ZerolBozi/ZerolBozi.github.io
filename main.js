//顯示註冊介面
function RegisterPage(){
    document.getElementById('form1').style.display = "none"
    document.getElementById('form2').style.display = "block"
}

//顯示車牌設定介面
function CarSettingPage(){
    document.getElementById('form1').style.display = "none"
    document.getElementById('form3').style.display = "block"
}

//返回首頁
function ReturnPage(){
    document.getElementById('form1').style.display = "block"
    document.getElementById('form2').style.display = "none"
    document.getElementById('form3').style.display = "none"
}

//註冊會員
function Register(){
    let RegistersendButton = document.getElementById('RegisterBtn')
    RegistersendButton.addEventListener('click', RegisterSend)
}

//新增車牌
function AddCarNum(){
    let AddCarIdsendButton = document.getElementById('AddCarNumBtn')
    AddCarIdsendButton.addEventListener('click', AddCarIdSend)
}

//更新車牌
function UpdateCarNum(){
    let UpdateCarIdsendButton = document.getElementById('UpdateCarNumBtn')
    UpdateCarIdsendButton.addEventListener('click', UpdateCarIdSend)

}

function RegisterSend() {
  let account = document.getElementById('Account').value
  let password = document.getElementById('Password').value
  let phone = document.getElementById('PhoneNumber').value
  let carId = document.getElementById('CarNumber').value
  let lineToken = document.getElementById('BindLine').value
  $.ajax({
    url: "https://script.google.com/macros/s/AKfycbxa2Ynw8aHo21JjdEELMRhNELHiyn0NqrI_REu3AjLiSA6doJG823sa5aJMzX0V9d4h/exec",
    data: {
        "method": "r",
        "account": account,
        "password":password,
        "phone": phone,
        "carId": carId,
        "lineToken": lineToken
    },
    success: function(response) {
      if(response == "1"){
        alert("註冊成功")
      }
      else if(response == "0"){
          alert("註冊失敗")
      }
      else if(response == "-1"){
          alert("用戶已存在")
      }
    },
  })
}

function UpdateCarIdSend() {
    let account = document.getElementById('UAccount').value
    let password = document.getElementById('UPassword').value
    let carId = document.getElementById('UCarNumber').value
    $.ajax({
      url: "https://script.google.com/macros/s/AKfycbxa2Ynw8aHo21JjdEELMRhNELHiyn0NqrI_REu3AjLiSA6doJG823sa5aJMzX0V9d4h/exec",
      data: {
          "method": "u",
          "account": account,
          "password":password,
          "carId": carId
      },
      success: function(response) {
        if(response == "成功"){
          alert("成功")
        }
      },
    })
  }

function AddCarIdSend() {
    let account = document.getElementById('UAccount').value
    let password = document.getElementById('UPassword').value
    let carId = document.getElementById('UCarNumber').value
    $.ajax({
      url: "https://script.google.com/macros/s/AKfycbxa2Ynw8aHo21JjdEELMRhNELHiyn0NqrI_REu3AjLiSA6doJG823sa5aJMzX0V9d4h/exec",
      data: {
          "method": "a",
          "account": account,
          "password":password,
          "carId": carId
      },
      success: function(response) {
        if(response == "成功"){
          alert("成功")
        }
      },
    })
  }

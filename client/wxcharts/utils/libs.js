module.exports = {
  user_login: user_login,
  user_send: user_send
}

function user_login() {
  wx.login({
    success: function (r) {
      var code = r.code;
      if (code) {
        wx.getUserInfo({
          success: function (res) {
            var msg = { 'encryptedData': res.encryptedData, 'iv': res.iv, 'code': code };
            msg = JSON.stringify(msg);
            wx.connectSocket({
              url: 'wss://luozhiming.club',
              success: function (res) {
                wx.onSocketOpen(function () {
                  wx.sendSocketMessage({
                    data: msg,
                  })
                  wx.onSocketMessage(function (res) {
                    console.log(res.data)
                    if (res.data == '0') {
                      wx.redirectTo({
                        url: './pages/index/register',
                      })
                    } else {
                      wx.redirectTo({
                        url: './pages/index/ZXG',
                      })
                    }
                  })
                })
              }
            })
          }
        })
      }
    }
  })
}

function user_send(msg) {
  wx.sendSocketMessage({
    data: msg,
  })
}


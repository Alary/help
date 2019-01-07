//index.js
//获取应用实例
const app = getApp()
let _this;
Page({
  data: {
    price: '',
    des: '',
    phone: ''
  },

  formSubmit(e) {
    let formId = e.detail.formId
    if (e.detail.value.des == '') {
      wx.showToast({
        title: '请填写帮助内容',
        icon: 'none'
      })
    } else if (e.detail.value.price == '') {
      wx.showToast({
        title: '请输入赏金',
        icon: 'none'
      })
    } else if (e.detail.value.mu == ''){
      wx.showToast({
        title: '请输入目的地',
        icon: 'none'
      })
    }else {
      wx.showLoading({
        title: '加载中',
      })
      app.com.post('help/add', {
        des: e.detail.value.des,
        wx_id: wx.getStorageSync("user").id,
        total_fee: e.detail.value.price,
        a_id: wx.getStorageSync("area").pk_id,
        title:this.data.title,
        mu: e.detail.value.mu,
        qi: e.detail.value.qi,
        form_id: e.detail.formId,
      }, function (res) {
        wx.hideLoading()
        if (res.code == 1) {
          wx.showToast({
            title: '发布成功',
          })
         
        }
      })
    }
  },
  navTo(e) {
    app.com.navTo(e)
  },
  navToArea() {
    wx.navigateTo({
      url: '/pages/area/area',
    })
  },
  publist() {
    wx.navigateTo({
      url: '/pages/pub/pub',
    })
  },
  onLoad: function (options) {
    _this = this
    this.setData({
      config:JSON.parse(options.data),
      title:options.label
    })
    wx.setNavigationBarTitle({
      title: options.label,
    })
  },
  onShow() {
    // if (wx.getStorageSync('area')) {
    //   this.setData({
    //     area: wx.getStorageSync('area')
    //   })
    // } else {
    //   wx.navigateTo({
    //     url: '/pages/area/area',
    //   })
    // }
  }

})

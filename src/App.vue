<template>
  <div id="app" @touchstart="start" @touchend="end">
    <div class="main-content-wrapper">
      <div class="date-wrapper">
        <date ref="datePicker" :moveDown="moveDown" @changeSelected="changeSelectedIndex" class="xxx"></date>
          <div class="arrow" @click="clickDown" :class="{'active': !moveDown}">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-arrow"></use>
            </svg>
          </div>
          <ul class="setting-wrapper">
            <li class="setting"
                v-for="(item, index) in actions" :key="index"
                :class="{'active': index === currentIndex}"
                @click="changeAction(index)">{{item}}
            </li>
          </ul>
          <ul class="main-content">
            <li class="item" v-for="(list, index) in lists" :key="index">
              <div class="item-head">
                <div class="item-title">{{list.title}}</div>
                <div class="item-time">16:24</div>
              </div>
              <div class="item-content">
                {{list.content}}
              </div>
              <div class="item-people">
                <div class="people-name" :class="{'trans': list.people === '经办人'}">我的角色: <span>{{list.people}}</span></div>
                <div class="actions">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-more"></use>
                  </svg>
                </div>
              </div>
            </li>
          </ul>
      </div>
    </div>
    <tab></tab>
  </div>
</template>

<script>

  export default {
    name: 'app',
    components: {},
    data() {
      return {
        lists: [
          {title: '227市场', content: '定价依据和客户判定', people: '交办人'},
          {title: '227市场', content: '定价依据和客户判定', people: '交办人'},
          {title: '227市场', content: '定价依据和客户判定', people: '经办人'},
          {title: '227市场', content: '定价依据和客户判定', people: '交办人'},
          {title: '227市场', content: '定价依据和客户判定', people: '交办人'},
          {title: '227市场', content: '定价依据和客户判定', people: '交办人'},
          {title: '227市场', content: '定价依据和客户判定', people: '交办人'},
        ],
        actions: [
          '一设置提醒', '创建时间', '最后发言时间'
        ],
        currentIndex: 0,
        moveY: '',
        moveDown: true,
        moveIndex: 0,
      }
    },
    computed: {},
    methods: {
      clickDay(data) {
        console.log(data);
      },
      changeDate(data) {
        console.log(data);
      },
      clickToday(data) {
        console.log(data);
      },
      changeAction(index) {

        this.currentIndex = index
      },
      start(e) {
        this.moveY = e.changedTouches[0].clientY
      },
      changeSelectedIndex(index){
        this.moveIndex = index
      },
      clickDown(e){
        let vm = this.$refs.datePicker
        let block = vm.$el.querySelector('.main-block')
        let {width} = block.getBoundingClientRect()
        if(e.currentTarget.classList.contains('active')){
          this.moveDown = true
          if(this.moveIndex){
            let year = vm.selectedYear
            let month = vm.selectedMonth +1
            let selectedYear = parseInt(vm.selectedDate.split('/')[0],10)
            let selectedMonth = parseInt(vm.selectedDate.split('/')[1],10)
            if(year === selectedYear && month === selectedMonth){
              vm.$el.querySelector('.main-block-wrapper').style.transform = `translateX(-${this.moveIndex*width*7}px)`
            }
          }
        }else{
          vm.$el.querySelector('.main-block-wrapper').style.transform = `translateX(0px)`
          this.moveDown = false
        }
      },
      end(e) {
        let vm = this.$refs.datePicker
        let y2 = e.changedTouches[0].clientY
        // 下滑
        if(y2 - this.moveY >= 60){
          vm.$el.querySelector('.main-block-wrapper').style.transform = `translateX(0px)`
          this.moveDown = false
        }else if(this.moveY - y2 >= 60){
          // 上滑
          this.moveDown = true
          if(this.moveIndex){
            let year = vm.selectedYear
            let month = vm.selectedMonth +1
            let selectedYear = parseInt(vm.selectedDate.split('/')[0],10)
            let selectedMonth = parseInt(vm.selectedDate.split('/')[1],10)
            if(year === selectedYear && month === selectedMonth){
              vm.$el.querySelector('.main-block-wrapper').style.transform = `translateX(-${this.moveIndex*width*7}px)`
            }
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  $color-orange: #ff9900;
  $color-blue: #2a579a;
  $font-title: 18;
  $font-info: 12;
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ul, li {
    list-style: none;
  }

  @function px($npx) {
    @return $npx/360 * 100vw
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .main-content-wrapper {

  }
  .date-wrapper {
    background: #fff;
    position: relative;
    .arrow{
      display: flex;
      justify-content: center;
      align-items: center;
      height: px(24);
      .icon{
        height: px(12);
        width: px(12);
        transform: rotate(90deg);
        fill: $color-blue;
      }
      &.active{
        .icon{
          transform: rotate(-90deg);
        }
      }
    }

    .setting-wrapper {
      position: absolute;
      width: 100%;
      height: px(42);
      background: #fff;
      box-shadow: 0 px(4) 0 #eee;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top: 1px solid #eee;

      .setting {
        height: 100%;
        display: inline-block;
        font-size: px(13);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 px(20);
        color: #666;

        &.active {
          color: $color-blue;
          font-weight: bold;
          position: relative;

          &:after {
            content: '';
            position: absolute;
            height: px(2);
            width: px(42);
            background: $color-blue;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
  }

  .main-content {
    margin-top: px(42);
    padding-bottom: px(52);
    overflow: auto;
    height: 100%;
    .item {
      padding: px(12) px(20);
      border-bottom: 1px solid #f2f2f2;

      .item-head {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .item-title {
          font-size: px($font-title);
          font-weight: bold;
        }

        .item-time {
          font-size: px(12);
          color: #ccc;
        }
      }

      .item-content {
        font-size: px(13);
        color: #999;
        margin: px(2) 0;
      }

      .item-people {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .people-name {
          font-size: px(13);
          color: $color-blue;

          &.trans {
            color: $color-orange
          }
        }

        .icon {
          width: px(14);
          height: px(14);
          fill: #999;
        }
      }
    }
  }
</style>

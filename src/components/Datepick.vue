<template>
  <div class="date-picker">
    <div class="calendar">
      <!--<div class="header__pre" @click="handlePreMonth">-->
      <!--</div>-->
      <div class="header-title">
        <span>{{selectedYear}}-{{selectedMonth + 1}}-{{selectedDate ? selectedDate.split('/')[2]: new Date().getDate()}}</span>
        <span class="today" @click="goToToday">今天</span>
      </div>
      <!--<div class="header__next" @click="handleNextMonth">-->
      <!--</div>-->
      <div class="calendar-main" @touchstart="start" @touchend="end">
        <div class="main-block-head-wrapper">
          <div class="main-block-head" v-for="(item, index) in calendarHeader" :key="index">
            {{item}}
          </div>
        </div>
        <div class="main-block-wrapper" :class="{'close': moveDown}">
          <div class="main-block" v-for="(item, index) in daysInMonth"
               :class="{
             'is-today': `${selectedYear}/${selectedMonth+1}/${item.content}` === dateToday,
             'is-selected': `${selectedYear}/${selectedMonth+1}/${item.content}` === selectedDate,
             'is-marked': markedDay.indexOf(`${selectedYear}/${selectedMonth+1}/${item.content}`) >= 0
             }"
               @click="selectDate(item)">{{item.content}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Datepick",
    props: ['moveDown'],
    data(){
      return {
        calendarHeader: ["日", "一", "二", "三", "四", "五", "六"],
        selectedYear: new Date().getFullYear(),
        selectedMonth: new Date().getMonth(),
        selectedDate: null,
        firstDate: 1,
        daysInMonth: [],
        markedDay: ['2019/2/1','2019/2/4','2019/2/16','2019/2/20'],
        moveX: '',
        index: 1,
        index2: 1,
        moveIndex: 0
      }
    },
    computed: {
      dateToday(){
        return `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}`
      }
    },
    methods: {
      displayDaysPerMonth(year, month){
        let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
          daysInMonth[1] = 29;
        }
        let targetDay = new Date(year, month, 1).getDay()
        let total_calendar_list = []

        let preNum = targetDay
        if (targetDay > 0) {
          for (let i = 0; i < preNum; i++) {
            let obj = {
              type: "pre",
              content: ""
            };
            total_calendar_list.push(obj)
          }
        }

        for (let i = 0; i < daysInMonth[month]; i++) {
          let obj = {
            type: "normal",
            content: i + 1
          };
          total_calendar_list.push(obj)
        }

        let nextNum = 6 - new Date(year, month+1, 0).getDay()
        for (let i = 0; i < nextNum; i++) {
          let obj = {
            type: "next",
            content: ""
          };
          total_calendar_list.push(obj)
        }

        this.daysInMonth = total_calendar_list
      },
      setMoveIndex(item){
        let index = this.daysInMonth.findIndex(day => {
          return item === day.content
        })
        this.moveIndex = parseInt(index/7,10)
        this.$emit('changeSelected',this.moveIndex)
      },
      selectDate(item){
        if(item.type === 'normal'){
          this.selectedDate = `${this.selectedYear}/${this.selectedMonth + 1}/${item.content}`
          this.setMoveIndex(item.content)
        }
      },
      start(e){
        this.moveX = e.changedTouches[0].clientX
      },
      end(e){
        let x2 = e.changedTouches[0].clientX
        let vm = this.$el.querySelector('.main-block-wrapper')
        let {width} = this.$el.querySelector('.main-block').getBoundingClientRect()
        let n = this.daysInMonth.length
        let length = n/7
        if (x2 - this.moveX >= 40){
          // 右滑
          if(vm.classList.contains('close')){
            if(this.moveIndex){
              if(this.moveIndex > 0 ){
                this.moveIndex -= 1
                vm.style.transform = `translateX(${-(this.moveIndex)*width*7}px)`
              }
            }else{
              this.preMonth()
              this.moveIndex = this.daysInMonth.length/7 - 1
              vm.style.transform = `translateX(${-(this.moveIndex)*width*7}px)`
            }
          }else{
            this.preMonth()
          }
        } else if(this.moveX - x2 >=40){
          // 左滑
          if(vm.classList.contains('close')){
            if(this.moveIndex){
              this.moveIndex += 1
              if(this.moveIndex > 0 && this.moveIndex < length){
                vm.style.transform = `translateX(${-(this.moveIndex)*width*7}px)`
              } else if(this.moveIndex === length){
                this.nextMonth()
                vm.style.transform = `translateX(0px)`
                this.moveIndex = 0
              }
            } else {
              this.moveIndex += 1
              if(this.moveIndex > 0 && this.moveIndex < length){
                vm.style.transform = `translateX(${-(this.moveIndex)*width*7}px)`
              } else if(this.moveIndex === length){
                this.nextMonth()
                vm.style.transform = `translateX(0px)`
                this.moveIndex = 0
              }
            }
          }else{
            this.nextMonth()
          }
        }
      },
      preMonth(){
        if(this.selectedMonth === 0){
          this.selectedYear = this.selectedYear - 1
          this.selectedMonth = 11
          // this.selectedDate = 1
        } else {
          this.selectedMonth = this.selectedMonth - 1
          // this.selectedDate = 1
        }
        this.displayDaysPerMonth(this.selectedYear, this.selectedMonth)
      },
      nextMonth(){
        if(this.selectedMonth === 11){
          this.selectedYear = this.selectedYear + 1
          this.selectedMonth = 0
          // this.selectedDate = 1
        } else {
          this.selectedMonth = this.selectedMonth + 1
          // this.selectedDate = 1
        }
        this.displayDaysPerMonth(this.selectedYear, this.selectedMonth)
      },
      goToToday(){
        this.selectedYear = new Date().getFullYear()
        this.selectedMonth = new Date().getMonth()
        this.selectedDate = `${this.selectedYear}/${this.selectedMonth + 1}/${new Date().getDate()}`
        this.displayDaysPerMonth(this.selectedYear, this.selectedMonth)
        let date = new Date().getDate()
        this.setMoveIndex(date)
        let vm = this.$el.querySelector('.main-block-wrapper')
        if(vm.classList.contains('close')){
          vm.style.transform = `translateX(${-(this.moveIndex)*336}px)`
        }
      }
    },
    created(){
      this.displayDaysPerMonth(this.selectedYear, this.selectedMonth)
    }
  }
</script>

<style scoped lang="scss">

  $block-height: 48;
  $block-width: 48;
  $calendar-head-font: 12;
  $calendar-body-font: 16;
  $color-orange: #ff9900;
  $color-blue: #2a579a;

  @function px($n) {
    @return 100vw * $n / 360;
  }

  @mixin positionCenter{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .header-title{
    height: px(48);
    background: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: px($calendar-body-font);
    line-height: px($calendar-body-font);
    vertical-align: top;
    .today {
      position: absolute;
      right: px(20);
      display: inline-block;
      font-size: $calendar-head-font;
    }
  }
  .calendar-main{
    overflow: hidden;
    .main-block-head-wrapper {
      display: flex;
      justify-content: center;
      .main-block-head{
        height: px($block-height);
        width: px($block-width);
        font-size: px($calendar-head-font);
        @include positionCenter;
        color: #999;
        font-weight: bold;
        flex-shrink: 0;
      }
    }

    .main-block-wrapper {
      display: flex;
      flex-wrap: wrap;
      width: 7 * px(48);
      margin: 0 auto;
      &.close {
        flex-wrap: nowrap;
      }
      .main-block {
        @include positionCenter;
        height: px($block-height);
        width: px($block-width);
        flex-shrink: 0;
        font-size: px($calendar-body-font);
        color: #666;

        &.is-today{
          color: $color-orange;
        }

        &.is-selected{
          background: $color-blue;
          border-radius: 50%;
          color: #fff;
        }

        &.is-marked{
          position: relative;
          &:after{
            display: block;
            position: absolute;
            content: '';
            height: px(6);
            width: px(6);
            border-radius: 50%;
            background: $color-orange;
            bottom: px(6);
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
  }

</style>
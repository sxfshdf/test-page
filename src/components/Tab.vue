<template>
  <div class="tab">
    <ul>
      <li class="tab-item" v-for="(tab,index) in tabs" :key="index"
          :class="{'active': index===currentIndex}"
          @click="changeTab(tab,index)"
      >
        <div class="tab-content-wrapper">
          <div class="tab-icon">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="`#icon-${tab.icon}`"></use>
            </svg>
          </div>
          <div class="tab-name">{{tab.tabName}}</div>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
  import '../../svg'
  export default {
    name: "Tab",
    data(){
      return {
        tabs: [
          { tabName: '工作', icon: 'work'},
          { tabName: '角色', icon: 'me'},
          { tabName: '事项圈', icon: 'circle'},
          { tabName: '同事', icon: 'team'},
          { tabName: '日历', icon: 'calendar'}
        ],
        currentIndex: 0
      }
    },
    methods:{
      changeTab(tab,index){
        this.currentIndex = index
      }
    }
  }
</script>

<style scoped lang="scss">
  $tab-height: 52;
  $icon-height: 22;
  $icon-color: #bcbcbc;
  $font-size: 12;
  $tab-item-height: 40;
  $color-blue: #2a579a;
  @function px($npx){
    @return $npx/360 * 100vw
  }
  .tab{
    position: fixed;
    bottom: 0;
    width: 100%;
    box-shadow: 0 px(-2) px(4) rgba(0,0,0,0.1);
    height: px(52);
    background: #fff;
    ul{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 px(10);

    }

    .tab-item{
      height: px($tab-height);
      width: px($tab-height);
      display: flex;
      align-items: center;
      justify-content: center;
      .tab-content-wrapper{
        .tab-icon{
          display: flex;
          align-items: center;
          justify-content: center;
          .icon{
            width: px($icon-height);
            height: px($icon-height);
            fill: $icon-color;
          }
        }
        .tab-name{
          font-size: px($font-size);
          color: $icon-color;
        }
      }
      &.active{
        .tab-content-wrapper{
          .tab-icon{
            .icon{
              fill: $color-blue
            }
          }
        }
        .tab-name{
          color: $color-blue
        }
      }
    }

  }

</style>
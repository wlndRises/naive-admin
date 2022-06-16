<template>
  <el-progress :percentage="displayValue" v-bind="$attrs" />
</template>
<script>
import { requestAnimationFrame, cancelAnimationFrame } from '@/utils/motion'
export default {
  name: 'Progress',
  props: {
    startVal: {
      type: Number,
      required: false,
      default: 0,
    },
    endVal: {
      type: Number,
      required: false,
      default: 100,
    },
    duration: {
      type: Number,
      required: false,
      default: 3000,
    },
    autoplay: {
      type: Boolean,
      required: false,
      default: true,
    },
    // 使用缓和功能
    useEasing: {
      type: Boolean,
      required: false,
      default: true,
    },
    // 缓和回调函数
    easingFn: {
      type: Function,
      default(t, b, c, d) {
        return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b
      },
    },
  },
  data() {
    return {
      localStartVal: this.startVal,
      displayValue: parseInt(this.startVal),
      printVal: null,
      paused: false,
      localDuration: this.duration,
      startTime: null,
      timestamp: null,
      remaining: null,
      rAF: null,
    }
  },
  computed: {
    countDown() {
      return this.startVal > this.endVal
    },
  },
  watch: {
    startVal() {
      if (this.autoplay) {
        this.start()
      }
    },
    endVal() {
      if (this.autoplay) {
        this.start()
      }
    },
  },
  mounted() {
    if (this.autoplay) {
      this.start()
    }
    this.$emit('mountedCallback')
  },
  destroyed() {
    cancelAnimationFrame(this.rAF)
  },
  methods: {
    start() {
      this.localStartVal = this.startVal
      this.startTime = null
      this.localDuration = this.duration
      this.paused = false
      this.rAF = requestAnimationFrame(this.count)
    },
    pauseResume() {
      if (this.paused) {
        this.resume()
        this.paused = false
      } else {
        this.pause()
        this.paused = true
      }
    },
    pause() {
      cancelAnimationFrame(this.rAF)
    },
    resume() {
      this.startTime = null
      this.localDuration = +this.remaining
      this.localStartVal = +this.printVal
      requestAnimationFrame(this.count)
    },
    reset() {
      this.startTime = null
      cancelAnimationFrame(this.rAF)
      this.displayValue = parseInt(this.startVal)
    },
    count(timestamp) {
      if (!this.startTime) this.startTime = timestamp
      this.timestamp = timestamp
      const progress = timestamp - this.startTime
      this.remaining = this.localDuration - progress

      if (this.useEasing) {
        if (this.countDown) {
          this.printVal =
            this.localStartVal -
            this.easingFn(progress, 0, this.localStartVal - this.endVal, this.localDuration)
        } else {
          this.printVal = this.easingFn(
            progress,
            this.localStartVal,
            this.endVal - this.localStartVal,
            this.localDuration
          )
        }
      } else {
        if (this.countDown) {
          this.printVal =
            this.localStartVal -
            (this.localStartVal - this.endVal) * (progress / this.localDuration)
        } else {
          this.printVal =
            this.localStartVal +
            (this.endVal - this.localStartVal) * (progress / this.localDuration)
        }
      }
      if (this.countDown) {
        this.printVal = this.printVal < this.endVal ? this.endVal : this.printVal
      } else {
        this.printVal = this.printVal > this.endVal ? this.endVal : this.printVal
      }

      this.displayValue = parseInt(this.printVal)
      if (progress < this.localDuration) {
        this.rAF = requestAnimationFrame(this.count)
      } else {
        this.$emit('callback')
      }
    },
  },
}
</script>

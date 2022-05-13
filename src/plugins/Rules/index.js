const rules = {
  install(App) {
    App.mixin({
      created() {
        const _rules = this.$options.rules
        if (_rules) {
          // Object.values(_rules).forEach(({ validator, message }) => {
          //   console.log(validator, message)
          // })
          Object.keys(_rules).forEach(key => {
            const { validator, message } = _rules[key]
            this.$watch(
              key,
              newVal => {
                const flag = validator(newVal)
                if (!flag) {
                  console.log(message)
                }
              },
              {
                immediate: true,
              }
            )
          })
        }
      },
    })
  },
}

export default rules

<script>
export default ({ props }) => {
  return (
    <div>
      {props.icon &&
        (props.icon.includes('el-icon') ? (
          <i class={[props.icon, 'sub-el-icon']} />
        ) : (
          <svg-icon icon-class={props.icon} />
        ))}
      <span class="inline-block max-w-28 truncate">{props.title}</span>
      {props.badge && <el-badge {...{ attrs: props.badge }} />}
    </div>
  )
}
</script>

<style scoped>
.el-badge >>> .el-badge__content {
  position: relative;
  top: -19px;
}
</style>

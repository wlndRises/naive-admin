import { isString } from '../is'
/**
 * @description: iview 纵向合并单元格
 * @param {Array} 表格数据
 * @param {Array | String} 需要纵向合并的列字段组成的数组 也可以接收单个字段
 * @return {Array} 每行合并的格数组成的数组
 * @author: wind
 * eg:
 * const _row = this.rowSpanList[rowIndex]
 * const _col = _row > 0 ? 1 : 0
 * return {
 *  rowspan: _row, // 纵向合并
 *  colspan: _col,
 * };
 */
export const getRowSpanList = function (data, contentList) {
  // 单个字段转为数组
  isString(contentList) && (contentList = [contentList])
  //每次都清空之前存储的 保证遍历的数据是最新的数据。以免造成数据渲染混乱
  const rowSpanList = []
  let pos = 0
  //遍历数据
  data.forEach((_, index) => {
    //判断是否是第一项
    if (index === 0) {
      rowSpanList.push(1)
      pos = 0
    } else {
      //不是第一项时，就根据标识去存储
      if (contentList.every(content => data[index][content] === data[index - 1][content])) {
        // if (data[index][contentList] === data[index - 1][contentList]) {
        // 查找到符合条件的数据时每次要把之前存储的数据+1
        rowSpanList[pos] += 1
        rowSpanList.push(0)
      } else {
        // 没有符合的数据时，要记住当前的index
        rowSpanList.push(1)
        pos = index
      }
    }
  })
  return rowSpanList
}

/*
 * @Author: lzp
 * @Date: 2022-11-13 17:17:30
 * @Description: file content
 */
const MODE = import.meta.env.MODE // 环境变量

export const baseUrl = MODE == 'development' ? '/api' : 'http://127.0.0.1:7001'
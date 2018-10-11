export default {
  stripscript (s) {
    var pattern = new RegExp('[`~!@#$^&*()=|{}\':;\',\\[\\]<>/?~！@#￥……&*（）——|{}【】‘；：”“\'。，、？]')
    var rs = ''
    for (var i = 0; i < s.length; i++) {
      rs = rs + s.substr(i, 1).replace(pattern, '_')
    }
    return rs
  },
  getFileTypeText (mimetype) {
    var mimetype1 = mimetype.split('/')[0]
    var mimetypedata = {
      'application/vnd.ms-word': '文档',
      'application/vnd.ms-excel': '文档',
      'application/vnd.ms-powerpoint': '文档',
      'application/pdf': '文档',
      'application/x-shockwave-flash': '视频',
      'text': '文档',
      'image': '图片',
      'audio': '音频',
      'video': '视频',
    }
    return mimetypedata[mimetype] || mimetypedata[mimetype1] || '其他'
  },
  getFileExtension (type) {
    var mimetype = {
      'application/postscript': '.eps',
      'application/octet-stream': '.exe',
      'application/vnd.ms-word': '.doc',
      'application/vnd.ms-excel': '.xls',
      'application/vnd.ms-powerpoint': '.pps',
      'application/pdf': '.pdf',
      'application/xml': '.xml',
      'application/vnd.oasis.opendocument.text': '.odt',
      'application/x-shockwave-flash': '.swf',
      'application/x-gzip': '.tgz',
      'application/x-bzip2': '.tbz',
      'application/zip': '.zip',
      'application/x-rar': '.rar',
      'application/x-tar': '.tar',
      'application/x-7z-compressed': '.7z',
      'text/plain': '.txt',
      'text/x-php': '.php',
      'text/html': '.html',
      'text/javascript': '.js',
      'text/css': '.css',
      'text/rtf': '.rtf',
      'text/rtfd': '.rtfd',
      'text/x-python': '.py',
      'text/x-java-source': '.java',
      'text/x-ruby': '.rb',
      'text/x-shellscript': '.sh',
      'text/x-perl': '.pl',
      'text/x-sql': '.sql',
      'image/x-ms-bmp': '.bmp',
      'image/jpeg': '.jpeg',
      'image/gif': '.gif',
      'image/png': '.png',
      'image/tiff': '.tiff',
      'image/x-targa': '.tga',
      'image/vnd.adobe.photoshop': '.psd',
      'audio/mpeg': '.mp3',
      'audio/midi': '.mid',
      'audio/ogg': '.ogg',
      'audio/mp4': '.mp4a',
      'audio/wav': '.wav',
      'audio/x-ms-wma': '.wma',
      'video/x-msvideo': '.avi',
      'video/x-dv': '.dv',
      'video/mp4': '.mp4',
      'video/mpeg': '.mpg',
      'video/quicktime': '.mov',
      'video/x-ms-wmv': '.wm',
      'video/x-flv': '.flv',
      'video/x-matroska': '.mkv'
    }
    return mimetype[type] || '.html'
  },
  getFileIconToExtension (extension) {
    var filetype = {
      'nofiletype': '/img/fileicon/notype.png',
      // 文档
      'doc': '/img/fileicon/doc.png',
      'docx': '/img/fileicon/doc.png',
      'xls': '/img/fileicon/xlsx.png',
      'xlsx': '/img/fileicon/xlsx.png',
      'ppt': '/img/fileicon/pptx.png',
      'pptx': '/img/fileicon/pptx.png',
      'pdf': '/img/fileicon/pdf.png',
      'text': '/img/fileicon/xtx.png',
      'plain': '/img/fileicon/txt.png',
      // 图片
      'jpg': '/img/fileicon/jpg.png',
      'gif': '/img/fileicon/picture.png',
      'png': '/img/fileicon/png.png',
      'bmp': '/img/fileicon/image.png',
      'psd': '/img/fileicon/psd.png',
      'jpeg': '/img/fileicon/jpg.png',
      'JPEG': '/img/fileicon/jpg.png',
      // 应用
      'exe': '/img/fileicon/exe.png',
      'dmp': '/img/fileicon/dmg.png',
      'application': '/img/fileicon/exe.png',
      'x-msdownload': '/img/fileicon/exe.png',
      // 压缩
      'zip': '/img/fileicon/zip.png',
      'rar': '/img/fileicon/zip.png',
      '7z': '/img/fileicon/zip.png',

      // 音频
      'mp3': '/img/fileicon/mp3.png',
      'wav': '/img/fileicon/audio.png',
      'wma': '/img/fileicon/audio.png',
      'asf': '/img/fileicon/audio.png',
      'midi': '/img/fileicon/audio.png',
      'ogg': '/img/fileicon/audio.png',
      'mp4': '/img/fileicon/mp4.png',
      'mpeg4': '/img/fileicon/mp4.png',

      // 代码
      'php': '/img/fileicon/php.png',
      'java': '/img/fileicon/java.png',
      'js': '/img/fileicon/js.png',
      'css': '/img/fileicon/css.png',
      'html': '/img/fileicon/html.png',
      'xml': '/img/fileicon/xml.png',
      'javascript': '/img/fileicon/js.png'
    }
    extension = PHP.trim(extension, '.')
    return filetype[extension] || filetype['nofiletype']
  },
  getFielname (filename, callback, pathdata, next) {
    if (!callback) {
      callback = function (error, filename) {
      }
    }
    if (!filename) filename = PHP.time().toString()
    if (!next) next = 1
    if (!pathdata) pathdata = ''
    var path = require('path')
    var fs = require('fs')
    fs.stat(path.resolve((pathdata + '/' + filename)), function (e, stat) {
      if (stat) {
        var pathData = PHP.pathinfo(filename)
        var filename_next = pathData['filename'] + '(' + next + ').' + pathData['extension']
        fs.stat(path.resolve(pathdata + '/' + filename_next), function (e, stat) {
          if (stat) {
            getFielname(filename, callback, pathdata, ++next)
          } else {
            callback(null, filename_next)
          }
        })

      } else {
        callback(null, filename)
      }
    })
  },
  PrvateFunction: {
    crypto_encode (str) {
      var key = 'aklsdiasldsal'
      var CryptoJS = require('crypto-js')
      // Encrypt
      return CryptoJS.AES.encrypt(str, key).toString()
    },
    /**
     * 字符串解密函数
     *
     * @param {Object}
     *            $str
     */
    crypto_decode (str) {
      var key = 'aklsdiasldsal'
      var CryptoJS = require('crypto-js')
      var bytes = CryptoJS.AES.decrypt(str, key)
      return bytes.toString(CryptoJS.enc.Utf8)
    },
    /**
     * 获取一个唯一的ID
     */
    getuuid () {
      var s = []
      var hexDigits = '0123456789abcdef'
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the
      // clock_seq_hi_and_reserved
      // to 01
      s[8] = s[13] = s[18] = s[23] = '-'

      var uuid = s.join('')
      return uuid
    }
  },
  FileSignSortBy (arr, prop, desc) {
    var props = [],
      ret = [],
      i = 0,
      len = arr.length
    if (typeof prop == 'string') {
      for (; i < len; i++) {
        var oI = arr[i];
        (props[i] = new String(oI && oI[prop] || ''))._obj = oI
      }
    } else if (typeof prop == 'function') {
      for (; i < len; i++) {
        var oI = arr[i];
        (props[i] = new String(oI && prop(oI) || ''))._obj = oI
      }
    } else {
      throw '参数类型错误'
    }
    props.sort()
    for (i = 0; i < len; i++) {
      ret[i] = props[i]._obj
    }
    if (desc) {
      ret.reverse()
    }
    return ret
  },
  getFileType (type) {
    var mimetype = {
      '.eps': 'application/postscript',
      '.exe': 'application/octet-stream',
      '.doc': 'application/vnd.ms-word',
      '.xls': 'application/vnd.ms-excel',
      '.pps': 'application/vnd.ms-powerpoint',
      '.pdf': 'application/pdf',
      '.xml': 'application/xml',
      '.odt': 'application/vnd.oasis.opendocument.text',
      '.swf': 'application/x-shockwave-flash',
      '.tgz': 'application/x-gzip',
      '.tbz': 'application/x-bzip2',
      '.zip': 'application/zip',
      '.rar': 'application/x-rar',
      '.tar': 'application/x-tar',
      '.7z': 'application/x-7z-compressed',
      '.txt': 'text/plain',
      '.php': 'text/x-php',
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.rtf': 'text/rtf',
      '.rtfd': 'text/rtfd',
      '.py': 'text/x-python',
      '.java': 'text/x-java-source',
      '.rb': 'text/x-ruby',
      '.sh': 'text/x-shellscript',
      '.pl': 'text/x-perl',
      '.sql': 'text/x-sql',
      '.bmp': 'image/x-ms-bmp',
      '.jpeg': 'image/jpeg',
      '.jpg': 'image/jpeg',
      '.gif': 'image/gif',
      '.png': 'image/png',
      '.tiff': 'image/tiff',
      '.tga': 'image/x-targa',
      '.psd': 'image/vnd.adobe.photoshop',
      '.mp3': 'audio/mpeg',
      '.mid': 'audio/midi',
      '.ogg': 'audio/ogg',
      '.mp4a': 'audio/mp4',
      '.wav': 'audio/wav',
      '.wma': 'audio/x-ms-wma',
      '.avi': 'video/x-msvideo',
      '.dv': 'video/x-dv',
      '.mp4': 'video/mp4',
      '.mpg': 'video/mpeg',
      '.mov': 'video/quicktime',
      '.wm': 'video/x-ms-wmv',
      '.flv': 'video/x-flv',
      '.mkv': 'video/x-matroska'
    }
    return mimetype[type.toLocaleLowerCase()]
  }
}

const $siteList = $('.siteList')//获取类为siteList
const $lastLi = $siteList.find('li.last')//在siteList中找到li里面的类为last的元素
const x = localStorage.getItem('x')//把x从localStorage里面取出来
const xObject = JSON.parse(x)//把x变为对象
const hashMap = xObject || //当xObject第一次操作时为空，就用下面的代码作为出是值
[//要注意，hashMap是全局变量，不要被污染了。因为我们开了parcel，parcel默认帮我们开了一个作用域，所以不用担心这个问题
{logo : 'A',url :'https://www.acfun.cn'},
{logo : 'B',url :'https://www.bilibili.com'},
{logo : 'Z',url :'https://www.zhihu.com'},
]
const simplifyUrl = (url) => {
    return url.replace('http://','').replace('https://','').replace('www.','').replace(/\/.*/,'')//把http，https，www,/去除加一个空
}
const render = ()=>{
    $siteList.find('li:not(.last)').remove()//删除除了last的所有元素，因为会重复保存之前的元素
    hashMap.forEach((node,index) => {
        const $li = $(`<li>
        <div class="site">
          <div class="logo">${node.logo}</div>
          <div class="link">${simplifyUrl(node.url)}</div>
          <div class="close">
          <svg class="icon" >
          <use xlink:href="#icon-close">
          </use>
      </svg>
          </div>
        </div>
      </a>
        </li>`).insertBefore($lastLi)
        $li.on('click',() => {
            window.open(node.url,'_self')
        })
        $li.on('click','.close',(e) => {
            e.stopPropagation()
            hashMap.splice(index,1)
            render()
        })
    })
}
render()//然后遍历这个hashMap，直接创建li，这样就不用再HTML里面写了
$('.addButton')
    .on('click',() => {//监听点击
        let url = window.prompt('请输入需要添加的网址')
        if(url.indexOf('https') !== 0 ){//如果用户输入的不是http开头的，帮他加上
            url = 'https://' + url
        }
        console.log(url);
        hashMap.push({
            logo : simplifyUrl(url)[0].toUpperCase(),
            url : url
        })
         render() 
    })
    window.onbeforeunload = () => {//监听用户关闭页面
        const string = JSON.stringify(hashMap)//localStorage只能存字符串，要把hashMap变成字符串
        localStorage.setItem('x',string)//在本地的存储里面设置一个x，值为string
    }
    //监听用户关闭页面，在页面关闭的时候把hashMap存到localStorage里面你
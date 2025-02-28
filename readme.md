## WSMCS Official Website

WSMCS 官网

------

> 来自 GrassBlock2022 授权使用  内部项目 禁止公开


#### 文件布局
- [component.html](component.html) 记录了所有组件的模板，在这里编辑样式和组件属性
- 导航和页脚的组件位于其中[component.html](component.html) (`nav`,`footer`)
- [deprecated](/deprecated)的文件不需要打包

#### 组件系统
使用 `<component>`定义一段组件或者一段html（用{{name}}创建PlaceHolder）：
```html
<component id="page-header">
    <section id="header" class="flex-1 header-bg">
        <header class="max-w-7xl flex flex-row flex-wrap mx-auto px-4 pt-32 pb-26 lg:pt-48 lg:pb-46 gap-16">
            <div class="flex-1">
                <div style="height: 3rem"></div>
                <h2 class="text-light font-medium leading-normal lg:text-5xl lg:leading-normal text-4xl"
                    data-aos="fade-up">{{title}}</h2>
                <p class="text-light-secondary text-xl mt-4" data-aos="fade-up" data-aos-delay="150">{{description}}</p>
                <div class="component-child flex flex-row gap-4 mt-8">

                </div>
            </div>
            <div class="flex-1 lg:flex hidden justify-end"></div>
        </header>
        <p class="bg-description display-light">*背景图像: 前 2 周目 | 出生点</p>
        <p class="bg-description display-dark">*背景图像: 前 2 周目 | 小黑塔</p>
    </section>
</component>
```

使用 `<apply>`标签应用组件：
```html
<apply type="page-header" placing="#page" component-id="header">
    <property data-id="title">WSMCS</property>
    <property data-id="description">
        WSMCS 由繁星之海工作室旗下 WSMCS 管理组运营。
        我们拥有原版生存、粘液单方块空岛、起床战争三个子服，未来还会添加新玩法。
        我们玩家群体和谐友善，管理组活跃，欢迎新玩家游玩。
    </property>

    <child placing="header">
        <a role="button" class="button-light" href="index.html?loc=join"
           data-aos="fade-up" data-aos-delay="300">加入</a>
    </child>
    <child placing="header">
        <a role="button" class="button text-light" target="_blank" href="https://wiki.tbstmc.xyz"
           data-aos="fade-up" data-aos-delay="450">文档</a>
    </child>
</apply>
```

`<compose>`标签内联一段html:
```html
<compose type="navbar" placing="#page">
    <property data-id="page-name">违规玩家</property>
</compose>
```
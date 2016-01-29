# react-redux-universal-application-starter

babel es6 gulp webpack

## 배경

universal(isomorphic) javascript와 hybrid render에 큰관심을 가지고 있었고 react는 이를 구현하기 좋은 라이브러리입니다. react를 es5로 사용하는 것도 좋으나, 이들은 es6 모듈을 지원하기위해 계속 노력하고 있고 jsx 트랜스파일 역시 babel이 맡게되어 es6를 시작해보기 좋은 환경입니다. 

기존 수많은 react와 flux구조를 위한 starter kit이 있지만 universal하지 않거나, production용으로 사용하지 말라고 권고한 babel-node로 서버를 사용하고, 테스크러너를 사용하지 않으며, 너무 기초적인 부분만 다루고 있어 css나 클라이언트 전용 컴포넌트들을 추가하면 동작하지 않는 것들이 많습니다. 본 프로젝트는 이들에 대한 해결책을 담고 있습니다.

## Dependency

주요한 dependency입니다. 

- gulp
- webpack
    - webpack-dev-server
- browser-sync
- babel

- express
- mongoose

- react
- redux
- react-router

- scss

## 왜 webpack + gulp?

webpack이 등장하면서 gulp나 grunt같은 테스크러너대신 webpack으로 빌드하고 npm으로 스크립트를 실행하는 방식이 유행하고 있습니다. 이런 방식을 사용하였으나, 프로젝트가 커져 webpack을 사용하지않는 테스크가 필요해지거나, 테스크가 디테일하고 많아져 결국 webpack을 위한 task 파일을 따로 작성하는 등 아직 유연함이 떨어집니다. 새로운 테스크를 추가할 때의 편리함을 위해 gulp와 webpack을 함께 사용합니다.

## 구조

universal(isomorphic) javascript로 hibrid render를 하면서 가장 첫번째 부딪히는 문제는 클라이언트에서만 동작하는 컴포넌트 렌더문제입니다. 대표적으로 masonry같은 window에서만 동작하는 모듈이나 webpack의 빌드를 위해 require된 js가 아닌 파일들 (import 'header.css') 을 포함하는 컴포넌트들은 서버사이드에서 import할때 에러가 발생합니다. 따라서 client side와 server side를 체크하여 유동적으로 모듈을 가져와야하는데 안타깝게도 es6의 모듈(import)은 dynamic import를 지원하지 않습니다. (스펙)

이를 해결하기위한 방법들을 몇가지 소개하자면, 

#### [isomorphic500](https://github.com/gpbl/isomorphic500) 방법

``` js
import React from 'react';
...
if (process.env.BROWSER) {
    require("some.css");
    var someLib = require("only-works-on-browser-lib");
    var BrowserComponent = require("Only-works-on-browser-component")
}

export default class Comp extends React.Component {
    render() {
        var browserComp;
        if (process.env.BROWSER) {
            browserComp = <BrowserComponent />
        } else {
            browserComp = null; 
        }

        return (
            <div>
                {browserComp}
            </div>
        )
    }
}
```


#### server-side build 
이는 서버도 빌드하는 방식입니다. 
webpack은 [alias](https://webpack.github.io/docs/configuration.html#resolve-alias)를 이용하여 불러올 모듈을 서버와 클라이언트마다 다르게 할 수 있다는 장점이 있습니다.
그러나 서버빌드는 빌드가 불필요했던 것을 빌드해야한다는 점이 마음에 들지 않았습니다.

첫번째 방식을 선택했었지만, 일일히 브라우저 환경인지를 체크하여 모듈을 require로 가져오는 구조는 제게 조금 tricky해보였고 실험적으로 서버사이드에서 특정 extension과 파일이름을 가진 파일을 import할 경우 무시하는 모듈 ignore.js를 만들어 사용하여보았습니다. 이에대한 불편함이나 이슈가 발생하면 알려주시면 감사하겠습니다.

### react 패턴

#### container component 패턴
container는 react나 flux구조에 공식적으로 문서화되어있는 구조는 아니지만 react커뮤니티에서 널리 쓰이는 패턴입니다. react를 사용하다보면 컴포넌트에 많은 기능들이 포함되기 시작하여 같은 버튼임에도 다른 기능을 가져 react가 추구한 재사용이 생각보다 잘 되지 않는 것을 알 수있습니다. 이를 기능이 포함되지 않은 순수한 컴포넌트와 이 컴포넌트들을 사용하고 기능이 포함된 컴포넌트 컨테이너로 분류하여 컴포넌트 재사용성을 높이는 패턴입니다. [container components](https://medium.com/@learnreact/container-components-c0e67432e005)에 자세히 설명되어있습니다. 

### 기타 유의사항

#### 반드시 react를 불러올때는 대문자로 써야한다.
``` js
// bad
import react from 'react';
import reactDom from 'react-dom';

// good
import React from 'react';
import ReactDOM from 'react-dom';
```
컨벤션으로도 대문자를 사용하는게 맞지만, 첫문자를 소문자로 쓸경우 react-router등이 동작하지 않습니다. 반드시 아래와 같이 작성하세요.

#### babel-polyfill에는 fetch가 빠져있다. 
다시 생각해보면 맞는 말입니다. 
core-js참고.

#### react-hot-loader

[react-hot-loader](https://github.com/gaearon/react-hot-loader)는 deprecate될 예정이며 [react-transform-hmr](https://github.com/gaearon/react-transform-hmr)로 곧 대체됩니다. 아직 불안정하여 react-hot-loader를 사용하고 있지만 hmr을 고려해 볼 수 있습니다. 이 모듈의 개발자인 [Dan Abramov의 포스트](https://medium.com/@dan_abramov/the-death-of-react-hot-loader-765fa791d7c4)를 참고하세요.

react cms인 [relax](https://github.com/relax/relax/blob/master/webpack.config.js)는 이미 hmr을 사용하고있습니다. 

#### [react-router](https://github.com/rackt/react-router)

아직 unstable release인 2.0.0-rc5를 사용하고 있습니다. 2.0.0은 아직 이슈해결과 문서작업이 덜 끝났지만 api변동이 많으므로 이를 사용하길 권합니다.

### universal application을 처음 접할 시 참고사항

#### 서버와 클라이언트의 최초 진입하는 react 컴포넌트가 다릅니다.
그 이유는 redux-devtools와 react-router의 렌더방식 때문입니다. devtools는 서버에서는 동작하지않는 브라우저전용 컴포넌트이며 클라이언트에만 넣었을 경우 checksum이 다르다며 react가 경고를 줍니다. 이를 해결하기위해 Root컴포넌트를 만들어서 클라이언트에서 mount된 이후 devtools를 렌더하게됩니다. 또한 react-router는 클라이언트 렌더시에는 <Router>를, 서버렌더시에는 <RouterContext>(2.0.0 버전부터 RoutingContext에서 RouterContext로 이름을 변경하였습니다.)를 사용하기 때문이기도 합니다. 

또 다른 해결책으론 두번 렌더

## 기타
KOA를 사용해보고 싶습니다.




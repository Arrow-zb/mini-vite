// 用 proxy 监听一个对象后，数据的获取会触发 get 函数
// obj.name 收集依赖
// obj.name = xx 触发 set，执行收集到的 effect
// obj.name  触发 get 
 
// 用 map 收集所有依赖
// {
//   target: {
//     key: [effect1, effect2]
//   }
// }
const targetMap = new WeakMap();
let effectStack = []; // 存储 effect
function track(target, key) {
  // 初始化
  const effect = effectStack[effectStack.length - 1];
  if(effect) {
    // 需要收集
    let depMap = target.get(target);
    if(depMap === undefined) {
      depMap = new Map();
      targetMap.set(target, depMap);
    };

    let dep = depMap.get(key);
    if(dep === undefined) {
      dep = new Set();
      depMap.set(key, dep);
    };

    // 完成了初始化
    // 下面就需要收集了
    // 双向缓存
    if(!dep.has(effect)) {
      dep.add(effect); 
      effect.deps.push(dep);
    }
  }
};

function trigger(target, key, info) {
  let depMap = targetMap.get(target);
  if(depMap === undefined) {
    return;   // 没有 effect 副作用
  };

  const effects = new Set();
  const computeds = new Set();    // computed 是一个特殊的 effect

  if(key) {
    let deps = depMap.get(key);
    deps.forEach(effect => {
      if(effect.computed) {
        computeds.add(effect);
      }else {
        effects.add(effect);
      }
    });
  };

  effects.forEach(effect => effect());
  effects.forEach(computed => computed());
}

const baseHanlder = {
  // get 和 set，还有删除，是不是存在等
  get(target, key) {
    const ret = target[key];  // 实际中用 Reflect.get(target, key);
    // todo 收集依赖到全局的 map
    track(target, key);
    return ret // typeof ret=='object' ? reactive(ret) : ret;
  },
  set(target, key, val) {
    const info = { oldValue: target[key], newValue: val };
    target[key] = val;  // Reflect.set
    // todo 这里要去执行收集到的 effect， 执行一下就可以了
    trigger(target, key, info);
  }
}

function reactive(target) {
  // Object.defineProperty vue2的
  const observed = new Proxy(target, baseHanlder);
  return observed;
};

function effect(fn, options={}) {
  // 只考虑执行的逻辑
  let e = createReactiveEffect(fn, options);
  if(!options.lazy) {
    e();
  };
  return e;
};

function createReactiveEffect(fn, options) {
  // effect 扩展配置
  const effect = function effect(...args) {
    return run(effect, fn, args);
  };
  effect.deps = [];
  effect.computed = options.computed;
  effect.lazy = options.lazy;
  return effect;
};

// 调度
function run(effect, fn, args) {
  // 执行
  // if()
}

function computed() {
  const runner = effect(fn, { computed: true, lazy: true });
  return {
    effect: runner,
    get value() {
      return runner();
    }
  }
};


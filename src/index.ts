const factory = new Map<Function, any>([
    [Object, (source, clone) => Object.keys(source).reduce((result, key) => (result[key] = clone(source[key]), result), {})],
    [Array, (source, clone) => source.map(item => clone(item))],
    [Function, (source) => Function('s', `return function ${source.name}(){ return s.apply(this, arguments) }`)(source)],
    [Date, (source) => new Date(source.valueOf())],
    [RegExp, (source) => Function(`return ${source.toString()}`)()],
    [Number, (source) => Function(`return ${source.toString()}`)()],
    [Boolean, (source) => Function(`return ${source.toString()}`)()],
    [String, (source) => Function(`return '${source.toString()}'`)()],
]);

export function deepClone(source: any) {
    if (source == null) return source;
    const construct = factory.get(source.constructor) || ((s) => Function('s', `return ${source.constructor.name}(s)`)(s.toString()));
    return construct(source, deepClone);
}

// const oneLine = (factory => (source) => (source == null) ? source : (factory.get(source.constructor) || ((s) => Function('s', `return ${source.constructor.name}(s)`)(s.toString())))(source, deepClone))(new Map<Function, any>([[Object, (s, dc) => Object.keys(s).reduce((result, key) => (result[key] = dc(s[key]), result), {})], [Array, (s, dc) => s.map(x => dc(x))], [Function, (s) => Function('s', `return function ${s.name}(){ return s.apply(this, arguments) }`)(s)], [Date, (s) => new Date(s.valueOf())], [RegExp, (s) => Function(`return ${s.toString()}`)()], [Boolean, (s) => s],]));
// export const deepClone = oneLine;

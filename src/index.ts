const factory = new Map<(s) => any, any>([
    [Object, (source, clone) => Object.keys(source).reduce((result, key) => (result[key] = clone(source[key]), result), {})],
    [Array, (source, clone) => source.map(item => clone(item))],
    [Function, (source) => Function('s', `return function ${source.name}(){ return s.apply(this, arguments) }`)(source)],
    [Date, (source) => new Date(source.valueOf())],
    [RegExp, (source) => Function(`return ${source.toString()}`)()],
    [Boolean, (source) => source],
    [String, (source) => source],
]);

export function xclone(source: any) {
    if (source == null) {
        return source;
    }
    const construct = factory.get(source.constructor) || ((s) => Function('s', `return ${source.constructor.name}(s)`)(s.toString()));
    return construct(source, xclone);
}

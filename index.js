'use strict';

const conditionalGroupRules = ['media','supports','document'];

const isObject = item => {
    return item != null && typeof item === 'object' && Array.isArray(item) === false;
}

/**
 * Determine if selector is already scoped
 *
 * @param {string} selector
 * @param {string} scope
 */
const isScopeApplied = (selector, scope) => {
    const selectorTopScope = selector.split(" ",1)[0];
    return selectorTopScope === scope;
}

/**
 * Determine if scope is valid
 *
 * @param {string} scope
 */
const isValidScope = scope => {
    if (scope){
        return scope.indexOf(',') ===  -1;
    } else {
        return false;
    }

}

/**
 * Determine if rule should be scoped
 *
 * @param {Rule} rule
 */
const isRuleScopable = rule => {

    if(rule.parent.type !== 'root') {
        return rule.parent.type === 'atrule' && conditionalGroupRules.indexOf(rule.parent.name) > -1;
    } else {
        return  true;
    }

}

const scopify = (options) => {

    let scope;

    if (typeof options === 'string') {
        scope = options;
    } else if (isObject(options) && options.scope) {
        scope = options.scope
    }

    return {
        postcssPlugin: 'postcss-scopify',
        Once (root, { result }) {
            // guard statment- allow only valid scopes
            if(!isValidScope(scope)){
                throw root.error('invalid scope', { plugin: 'postcss-scopify' });
            }
            root.walkRules(rule => {

                // skip scoping of special rules (certain At-rules, nested, etc')
                if(!isRuleScopable(rule)){
                    return rule;
                }

                rule.selectors = rule.selectors.map(selector => {
                    if (isScopeApplied(selector,scope)) {
                        return selector;
                    }

                    // special case for a top level '&' selector, resolves to scope
                    if (selector.includes('&')) {
                        return selector.replace(/&/g, scope);
                    }

                    return scope + ' ' + selector;

                });
            });
        },
    };
}


module.exports = scopify;
module.exports.postcss = true;

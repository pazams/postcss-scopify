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
    if (!scope){
        return false;
    }
    return scope.indexOf(',') ===  -1;
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

/**
 * extract the scope from the input given by caller
 *
 * @param {string | Record<string, string>} options
 */
const extractScope = (options) => {
    if (typeof options === 'string') {
	    return options;
    } else if (isObject(options) && options.scope) {
            return options.scope
    }
    return null;
}

const scopify = (options) => {
    return {
        postcssPlugin: 'postcss-scopify',
        Once (root, { result }) {
            const scope = extractScope(options);
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

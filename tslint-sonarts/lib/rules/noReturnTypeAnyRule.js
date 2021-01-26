"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * SonarTS
 * Copyright (C) 2017-2019 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
const tslint = require("tslint");
const ts = require("typescript");
const nodes_1 = require("../utils/nodes");
const sonarAnalysis_1 = require("../utils/sonarAnalysis");
class Rule extends tslint.Rules.TypedRule {
    applyWithProgram(sourceFile, program) {
        return new Visitor(this.getOptions().ruleName, program).visit(sourceFile).getIssues();
    }
}
Rule.metadata = {
    ruleName: "no-return-type-any",
    description: "Primitive return types should be used",
    rationale: tslint.Utils.dedent `
      The return type any should be avoided because it prevents the type safety checks normally done by the compiler. 
      When a function returns a primitive type (i.e. number, string or boolean) it is safe to replace any with number, 
      string or boolean type respectively, or remove the return type completely and let compiler infer it.`,
    optionsDescription: "",
    options: null,
    rspecKey: "RSPEC-4324",
    type: "functionality",
    typescriptOnly: false,
};
Rule.MESSAGE = "Remove this return type or change it to a more specific.";
exports.Rule = Rule;
class Visitor extends sonarAnalysis_1.TypedSonarRuleVisitor {
    visitFunctionDeclaration(node) {
        // check existence of `node.body` to ignore function overload declarations
        if (node.type && node.type.kind === ts.SyntaxKind.AnyKeyword && node.body) {
            const returns = this.getAllReturns(node.body);
            if (returns.length > 0 && this.allReturnTypesEqual(returns)) {
                this.addIssue(node.type, Rule.MESSAGE);
            }
        }
        super.visitFunctionDeclaration(node);
    }
    getAllReturns(body) {
        const returns = [];
        const visitNode = (node) => {
            if (nodes_1.isReturnStatement(node)) {
                returns.push(node);
            }
            else if (!nodes_1.isFunctionLikeDeclaration(node)) {
                ts.forEachChild(node, visitNode);
            }
        };
        visitNode(body);
        return returns;
    }
    getReturnType(node) {
        const typeChecker = this.program.getTypeChecker();
        return node.expression && typeChecker.getTypeAtLocation(node.expression);
    }
    allReturnTypesEqual(returns) {
        const firstReturnType = this.getReturnType(returns[0]);
        if (firstReturnType && isPrimitiveType(firstReturnType)) {
            return returns.every(nextReturn => {
                const nextReturnType = this.getReturnType(nextReturn);
                return nextReturnType !== undefined && nextReturnType.flags === firstReturnType.flags;
            });
        }
        return false;
    }
}
function isPrimitiveType({ flags }) {
    return (flags & ts.TypeFlags.BooleanLike ||
        flags & ts.TypeFlags.NumberLike ||
        flags & ts.TypeFlags.StringLike ||
        flags & ts.TypeFlags.EnumLike);
}
//# sourceMappingURL=noReturnTypeAnyRule.js.map
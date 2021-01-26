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
const sonarAnalysis_1 = require("../utils/sonarAnalysis");
const nodes_1 = require("../utils/nodes");
class Rule extends tslint.Rules.AbstractRule {
    apply(sourceFile) {
        return new Visitor(this.getOptions().ruleName).visit(sourceFile).getIssues();
    }
}
Rule.metadata = {
    ruleName: "no-inverted-boolean-check",
    description: "Boolean checks should not be inverted",
    rationale: tslint.Utils.dedent ``,
    optionsDescription: "",
    options: null,
    rspecKey: "RSPEC-1940",
    type: "maintainability",
    typescriptOnly: false,
};
exports.Rule = Rule;
class Visitor extends sonarAnalysis_1.SonarRuleVisitor {
    visitPrefixUnaryExpression(node) {
        if (node.operator === ts.SyntaxKind.ExclamationToken) {
            let operand = node.operand;
            while (nodes_1.isParenthesizedExpression(operand)) {
                operand = operand.expression;
            }
            if (nodes_1.isBinaryExpression(operand)) {
                const invertedOperator = Visitor.invertedOperatorsByKind[operand.operatorToken.kind];
                if (invertedOperator) {
                    this.addIssue(node, `Use the opposite operator (\"${invertedOperator}\") instead.`);
                }
            }
        }
        super.visitPrefixUnaryExpression(node);
    }
}
Visitor.invertedOperatorsByKind = {
    [ts.SyntaxKind.EqualsEqualsToken]: "!=",
    [ts.SyntaxKind.ExclamationEqualsToken]: "==",
    [ts.SyntaxKind.EqualsEqualsEqualsToken]: "!==",
    [ts.SyntaxKind.ExclamationEqualsEqualsToken]: "===",
};
//# sourceMappingURL=noInvertedBooleanCheckRule.js.map
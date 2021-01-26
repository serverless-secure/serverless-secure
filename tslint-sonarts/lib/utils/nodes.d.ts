import * as ts from "typescript";
export declare function is(node: ts.Node | undefined, ...kinds: ts.SyntaxKind[]): boolean;
export declare function isArrayBindingPattern(node: ts.Node): node is ts.ArrayBindingPattern;
export declare function isArrayLiteralExpression(node: ts.Node): node is ts.ArrayLiteralExpression;
export declare function isArrowFunction(node: ts.Node): node is ts.ArrowFunction;
export declare function isAssignment(node: ts.Node): node is ts.BinaryExpression;
export declare function isAssignmentKind(kind: ts.SyntaxKind): boolean;
export declare function isBinaryExpression(node: ts.Node): node is ts.BinaryExpression;
export declare function isBindingElement(node: ts.Node): node is ts.BindingElement;
export declare function isBlock(node: ts.Node): node is ts.Block;
export declare function isBreakStatement(node: ts.Node): node is ts.BreakStatement;
export declare function isCallExpression(node: ts.Node): node is ts.CallExpression;
export declare function isCaseClause(node: ts.Node): node is ts.CaseClause;
export declare function isCatchClause(node: ts.Node): node is ts.CatchClause;
export declare function isContinueStatement(node: ts.Node): node is ts.ContinueStatement;
export declare function isElementAccessExpression(node: ts.Node): node is ts.ElementAccessExpression;
export declare function isExpressionStatement(node: ts.Node): node is ts.ExpressionStatement;
export declare function isFunctionDeclaration(node: ts.Node): node is ts.FunctionDeclaration;
export declare function isFunctionExpression(node: ts.Node): node is ts.FunctionExpression;
export declare function isFunctionLikeDeclaration(node: ts.Node): node is ts.FunctionLikeDeclaration;
export declare function isIdentifier(node: ts.Node): node is ts.Identifier;
export declare function isInterfaceDeclaration(node: ts.Node): node is ts.InterfaceDeclaration;
export declare function isIfStatement(node: ts.Node): node is ts.IfStatement;
export declare function isIterationStatement(node: ts.Node): node is ts.IterationStatement;
export declare function isLabeledStatement(node: ts.Node): node is ts.LabeledStatement;
export declare function isLiteralExpression(node: ts.Node): node is ts.LiteralExpression;
export declare function isNewExpression(node: ts.Node): node is ts.NewExpression;
export declare function isNumericLiteral(node: ts.Node): node is ts.NumericLiteral;
export declare function isObjectBindingPattern(node: ts.Node): node is ts.ObjectBindingPattern;
export declare function isObjectLiteralExpression(node: ts.Node): node is ts.ObjectLiteralExpression;
export declare function isParenthesizedExpression(node: ts.Node): node is ts.ParenthesizedExpression;
export declare function isPostfixUnaryExpression(node: ts.Node): node is ts.PostfixUnaryExpression;
export declare function isPrefixUnaryExpression(node: ts.Node): node is ts.PrefixUnaryExpression;
export declare function isPropertyAccessExpression(node: ts.Node): node is ts.PropertyAccessExpression;
export declare function isPropertyAssignment(node: ts.Node): node is ts.PropertyAssignment;
export declare function isReturnStatement(node: ts.Node): node is ts.ReturnStatement;
export declare function isShorthandPropertyAssignment(node: ts.Node): node is ts.ShorthandPropertyAssignment;
export declare function isSpreadAssignment(node: ts.Node): node is ts.SpreadAssignment;
export declare function isSpreadElement(node: ts.Node): node is ts.SpreadElement;
export declare function isStringLiteral(node: ts.Node): node is ts.StringLiteral;
export declare function isToken(node: ts.Node): boolean;
export declare function isThrowStatement(node: ts.Node): node is ts.ThrowStatement;
export declare function isTypeNode(node: ts.Node): node is ts.TypeNode;
export declare function isVariableDeclaration(node: ts.Node): node is ts.VariableDeclaration;
export declare function isVariableDeclarationList(node: ts.Node): node is ts.VariableDeclarationList;
export declare function isVariableStatement(node: ts.Node): node is ts.VariableStatement;
export declare function isUnionTypeNode(node: ts.Node): node is ts.UnionTypeNode;
export declare function isUnionOrIntersectionTypeNode(node: ts.Node): node is ts.UnionOrIntersectionTypeNode;
export declare function isSignatureDeclaration(node: ts.Node): node is ts.SignatureDeclaration;

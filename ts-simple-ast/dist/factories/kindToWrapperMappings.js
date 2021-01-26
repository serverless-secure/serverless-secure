"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
var compiler = require("../compiler");
var typescript_1 = require("../typescript");
// when changing this, make sure to run `npm run code-generate`.
// that will automatically update all other parts of the application that need to be updated when this changes.
// using an "any" type here because I couldn't figure out a way of getting the typescript compiler to understand this
exports.kindToWrapperMappings = (_a = {},
    _a[typescript_1.SyntaxKind.SourceFile] = compiler.SourceFile,
    _a[typescript_1.SyntaxKind.ArrayLiteralExpression] = compiler.ArrayLiteralExpression,
    _a[typescript_1.SyntaxKind.ArrayType] = compiler.ArrayTypeNode,
    _a[typescript_1.SyntaxKind.ArrowFunction] = compiler.ArrowFunction,
    _a[typescript_1.SyntaxKind.AsExpression] = compiler.AsExpression,
    _a[typescript_1.SyntaxKind.AwaitExpression] = compiler.AwaitExpression,
    _a[typescript_1.SyntaxKind.BinaryExpression] = compiler.BinaryExpression,
    _a[typescript_1.SyntaxKind.Block] = compiler.Block,
    _a[typescript_1.SyntaxKind.BreakStatement] = compiler.BreakStatement,
    _a[typescript_1.SyntaxKind.CallExpression] = compiler.CallExpression,
    _a[typescript_1.SyntaxKind.CallSignature] = compiler.CallSignatureDeclaration,
    _a[typescript_1.SyntaxKind.CaseBlock] = compiler.CaseBlock,
    _a[typescript_1.SyntaxKind.CaseClause] = compiler.CaseClause,
    _a[typescript_1.SyntaxKind.CatchClause] = compiler.CatchClause,
    _a[typescript_1.SyntaxKind.ClassDeclaration] = compiler.ClassDeclaration,
    _a[typescript_1.SyntaxKind.Constructor] = compiler.ConstructorDeclaration,
    _a[typescript_1.SyntaxKind.ConstructorType] = compiler.ConstructorTypeNode,
    _a[typescript_1.SyntaxKind.ConstructSignature] = compiler.ConstructSignatureDeclaration,
    _a[typescript_1.SyntaxKind.ContinueStatement] = compiler.ContinueStatement,
    _a[typescript_1.SyntaxKind.CommaListExpression] = compiler.CommaListExpression,
    _a[typescript_1.SyntaxKind.ComputedPropertyName] = compiler.ComputedPropertyName,
    _a[typescript_1.SyntaxKind.ConditionalExpression] = compiler.ConditionalExpression,
    _a[typescript_1.SyntaxKind.DebuggerStatement] = compiler.DebuggerStatement,
    _a[typescript_1.SyntaxKind.Decorator] = compiler.Decorator,
    _a[typescript_1.SyntaxKind.DefaultClause] = compiler.DefaultClause,
    _a[typescript_1.SyntaxKind.DeleteExpression] = compiler.DeleteExpression,
    _a[typescript_1.SyntaxKind.DoStatement] = compiler.DoStatement,
    _a[typescript_1.SyntaxKind.ElementAccessExpression] = compiler.ElementAccessExpression,
    _a[typescript_1.SyntaxKind.EmptyStatement] = compiler.EmptyStatement,
    _a[typescript_1.SyntaxKind.EnumDeclaration] = compiler.EnumDeclaration,
    _a[typescript_1.SyntaxKind.EnumMember] = compiler.EnumMember,
    _a[typescript_1.SyntaxKind.ExportAssignment] = compiler.ExportAssignment,
    _a[typescript_1.SyntaxKind.ExportDeclaration] = compiler.ExportDeclaration,
    _a[typescript_1.SyntaxKind.ExportSpecifier] = compiler.ExportSpecifier,
    _a[typescript_1.SyntaxKind.ExpressionWithTypeArguments] = compiler.ExpressionWithTypeArguments,
    _a[typescript_1.SyntaxKind.ExpressionStatement] = compiler.ExpressionStatement,
    _a[typescript_1.SyntaxKind.ExternalModuleReference] = compiler.ExternalModuleReference,
    _a[typescript_1.SyntaxKind.QualifiedName] = compiler.QualifiedName,
    _a[typescript_1.SyntaxKind.ForInStatement] = compiler.ForInStatement,
    _a[typescript_1.SyntaxKind.ForOfStatement] = compiler.ForOfStatement,
    _a[typescript_1.SyntaxKind.ForStatement] = compiler.ForStatement,
    _a[typescript_1.SyntaxKind.FunctionDeclaration] = compiler.FunctionDeclaration,
    _a[typescript_1.SyntaxKind.FunctionExpression] = compiler.FunctionExpression,
    _a[typescript_1.SyntaxKind.FunctionType] = compiler.FunctionTypeNode,
    _a[typescript_1.SyntaxKind.GetAccessor] = compiler.GetAccessorDeclaration,
    _a[typescript_1.SyntaxKind.HeritageClause] = compiler.HeritageClause,
    _a[typescript_1.SyntaxKind.Identifier] = compiler.Identifier,
    _a[typescript_1.SyntaxKind.IfStatement] = compiler.IfStatement,
    _a[typescript_1.SyntaxKind.ImportDeclaration] = compiler.ImportDeclaration,
    _a[typescript_1.SyntaxKind.ImportEqualsDeclaration] = compiler.ImportEqualsDeclaration,
    _a[typescript_1.SyntaxKind.ImportSpecifier] = compiler.ImportSpecifier,
    _a[typescript_1.SyntaxKind.ImportType] = compiler.ImportTypeNode,
    _a[typescript_1.SyntaxKind.IndexSignature] = compiler.IndexSignatureDeclaration,
    _a[typescript_1.SyntaxKind.InterfaceDeclaration] = compiler.InterfaceDeclaration,
    _a[typescript_1.SyntaxKind.IntersectionType] = compiler.IntersectionTypeNode,
    _a[typescript_1.SyntaxKind.JSDocTag] = compiler.JSDocUnknownTag,
    _a[typescript_1.SyntaxKind.JSDocAugmentsTag] = compiler.JSDocAugmentsTag,
    _a[typescript_1.SyntaxKind.JSDocClassTag] = compiler.JSDocClassTag,
    _a[typescript_1.SyntaxKind.JSDocReturnTag] = compiler.JSDocReturnTag,
    _a[typescript_1.SyntaxKind.JSDocTypeTag] = compiler.JSDocTypeTag,
    _a[typescript_1.SyntaxKind.JSDocTypedefTag] = compiler.JSDocTypedefTag,
    _a[typescript_1.SyntaxKind.JSDocParameterTag] = compiler.JSDocParameterTag,
    _a[typescript_1.SyntaxKind.JSDocPropertyTag] = compiler.JSDocPropertyTag,
    _a[typescript_1.SyntaxKind.JsxAttribute] = compiler.JsxAttribute,
    _a[typescript_1.SyntaxKind.JsxClosingElement] = compiler.JsxClosingElement,
    _a[typescript_1.SyntaxKind.JsxClosingFragment] = compiler.JsxClosingFragment,
    _a[typescript_1.SyntaxKind.JsxElement] = compiler.JsxElement,
    _a[typescript_1.SyntaxKind.JsxExpression] = compiler.JsxExpression,
    _a[typescript_1.SyntaxKind.JsxFragment] = compiler.JsxFragment,
    _a[typescript_1.SyntaxKind.JsxOpeningElement] = compiler.JsxOpeningElement,
    _a[typescript_1.SyntaxKind.JsxOpeningFragment] = compiler.JsxOpeningFragment,
    _a[typescript_1.SyntaxKind.JsxSelfClosingElement] = compiler.JsxSelfClosingElement,
    _a[typescript_1.SyntaxKind.JsxSpreadAttribute] = compiler.JsxSpreadAttribute,
    _a[typescript_1.SyntaxKind.JsxText] = compiler.JsxText,
    _a[typescript_1.SyntaxKind.LabeledStatement] = compiler.LabeledStatement,
    _a[typescript_1.SyntaxKind.LiteralType] = compiler.LiteralTypeNode,
    _a[typescript_1.SyntaxKind.MetaProperty] = compiler.MetaProperty,
    _a[typescript_1.SyntaxKind.MethodDeclaration] = compiler.MethodDeclaration,
    _a[typescript_1.SyntaxKind.MethodSignature] = compiler.MethodSignature,
    _a[typescript_1.SyntaxKind.ModuleDeclaration] = compiler.NamespaceDeclaration,
    _a[typescript_1.SyntaxKind.NewExpression] = compiler.NewExpression,
    _a[typescript_1.SyntaxKind.NonNullExpression] = compiler.NonNullExpression,
    _a[typescript_1.SyntaxKind.NotEmittedStatement] = compiler.NotEmittedStatement,
    _a[typescript_1.SyntaxKind.NoSubstitutionTemplateLiteral] = compiler.NoSubstitutionTemplateLiteral,
    _a[typescript_1.SyntaxKind.NumericLiteral] = compiler.NumericLiteral,
    _a[typescript_1.SyntaxKind.ObjectLiteralExpression] = compiler.ObjectLiteralExpression,
    _a[typescript_1.SyntaxKind.OmittedExpression] = compiler.OmittedExpression,
    _a[typescript_1.SyntaxKind.Parameter] = compiler.ParameterDeclaration,
    _a[typescript_1.SyntaxKind.ParenthesizedExpression] = compiler.ParenthesizedExpression,
    _a[typescript_1.SyntaxKind.PartiallyEmittedExpression] = compiler.PartiallyEmittedExpression,
    _a[typescript_1.SyntaxKind.PostfixUnaryExpression] = compiler.PostfixUnaryExpression,
    _a[typescript_1.SyntaxKind.PrefixUnaryExpression] = compiler.PrefixUnaryExpression,
    _a[typescript_1.SyntaxKind.PropertyAccessExpression] = compiler.PropertyAccessExpression,
    _a[typescript_1.SyntaxKind.PropertyAssignment] = compiler.PropertyAssignment,
    _a[typescript_1.SyntaxKind.PropertyDeclaration] = compiler.PropertyDeclaration,
    _a[typescript_1.SyntaxKind.PropertySignature] = compiler.PropertySignature,
    _a[typescript_1.SyntaxKind.RegularExpressionLiteral] = compiler.RegularExpressionLiteral,
    _a[typescript_1.SyntaxKind.ReturnStatement] = compiler.ReturnStatement,
    _a[typescript_1.SyntaxKind.SetAccessor] = compiler.SetAccessorDeclaration,
    _a[typescript_1.SyntaxKind.ShorthandPropertyAssignment] = compiler.ShorthandPropertyAssignment,
    _a[typescript_1.SyntaxKind.SpreadAssignment] = compiler.SpreadAssignment,
    _a[typescript_1.SyntaxKind.SpreadElement] = compiler.SpreadElement,
    _a[typescript_1.SyntaxKind.StringLiteral] = compiler.StringLiteral,
    _a[typescript_1.SyntaxKind.SwitchStatement] = compiler.SwitchStatement,
    _a[typescript_1.SyntaxKind.SyntaxList] = compiler.SyntaxList,
    _a[typescript_1.SyntaxKind.TaggedTemplateExpression] = compiler.TaggedTemplateExpression,
    _a[typescript_1.SyntaxKind.TemplateExpression] = compiler.TemplateExpression,
    _a[typescript_1.SyntaxKind.TemplateHead] = compiler.TemplateHead,
    _a[typescript_1.SyntaxKind.TemplateMiddle] = compiler.TemplateMiddle,
    _a[typescript_1.SyntaxKind.TemplateSpan] = compiler.TemplateSpan,
    _a[typescript_1.SyntaxKind.TemplateTail] = compiler.TemplateTail,
    _a[typescript_1.SyntaxKind.ThrowStatement] = compiler.ThrowStatement,
    _a[typescript_1.SyntaxKind.TryStatement] = compiler.TryStatement,
    _a[typescript_1.SyntaxKind.TupleType] = compiler.TupleTypeNode,
    _a[typescript_1.SyntaxKind.TypeAliasDeclaration] = compiler.TypeAliasDeclaration,
    _a[typescript_1.SyntaxKind.TypeAssertionExpression] = compiler.TypeAssertion,
    _a[typescript_1.SyntaxKind.TypeLiteral] = compiler.TypeLiteralNode,
    _a[typescript_1.SyntaxKind.TypeParameter] = compiler.TypeParameterDeclaration,
    _a[typescript_1.SyntaxKind.TypeReference] = compiler.TypeReferenceNode,
    _a[typescript_1.SyntaxKind.UnionType] = compiler.UnionTypeNode,
    _a[typescript_1.SyntaxKind.VariableDeclaration] = compiler.VariableDeclaration,
    _a[typescript_1.SyntaxKind.VariableDeclarationList] = compiler.VariableDeclarationList,
    _a[typescript_1.SyntaxKind.VariableStatement] = compiler.VariableStatement,
    _a[typescript_1.SyntaxKind.JSDocComment] = compiler.JSDoc,
    _a[typescript_1.SyntaxKind.TypePredicate] = compiler.TypeNode,
    _a[typescript_1.SyntaxKind.SemicolonToken] = compiler.Node,
    _a[typescript_1.SyntaxKind.TypeOfExpression] = compiler.TypeOfExpression,
    _a[typescript_1.SyntaxKind.WhileStatement] = compiler.WhileStatement,
    _a[typescript_1.SyntaxKind.WithStatement] = compiler.WithStatement,
    _a[typescript_1.SyntaxKind.YieldExpression] = compiler.YieldExpression,
    // keywords
    _a[typescript_1.SyntaxKind.AnyKeyword] = compiler.Expression,
    _a[typescript_1.SyntaxKind.BooleanKeyword] = compiler.Expression,
    _a[typescript_1.SyntaxKind.FalseKeyword] = compiler.BooleanLiteral,
    _a[typescript_1.SyntaxKind.ImportKeyword] = compiler.ImportExpression,
    _a[typescript_1.SyntaxKind.NeverKeyword] = compiler.Expression,
    _a[typescript_1.SyntaxKind.NullKeyword] = compiler.NullLiteral,
    _a[typescript_1.SyntaxKind.NumberKeyword] = compiler.Expression,
    _a[typescript_1.SyntaxKind.ObjectKeyword] = compiler.Expression,
    _a[typescript_1.SyntaxKind.StringKeyword] = compiler.Expression,
    _a[typescript_1.SyntaxKind.SymbolKeyword] = compiler.Expression,
    _a[typescript_1.SyntaxKind.SuperKeyword] = compiler.SuperExpression,
    _a[typescript_1.SyntaxKind.ThisKeyword] = compiler.ThisExpression,
    _a[typescript_1.SyntaxKind.TrueKeyword] = compiler.BooleanLiteral,
    _a[typescript_1.SyntaxKind.UndefinedKeyword] = compiler.Expression,
    _a[typescript_1.SyntaxKind.VoidKeyword] = compiler.VoidExpression,
    _a);

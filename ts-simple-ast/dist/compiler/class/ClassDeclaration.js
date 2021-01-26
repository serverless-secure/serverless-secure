"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var errors = require("../../errors");
var manipulation_1 = require("../../manipulation");
var typescript_1 = require("../../typescript");
var utils_1 = require("../../utils");
var base_1 = require("../base");
var callBaseFill_1 = require("../callBaseFill");
var function_1 = require("../function");
var namespace_1 = require("../namespace");
var statement_1 = require("../statement");
var base_2 = require("./base");
var MethodDeclaration_1 = require("./MethodDeclaration");
exports.ClassDeclarationBase = base_1.ChildOrderableNode(base_1.TextInsertableNode(base_1.ImplementsClauseableNode(base_1.HeritageClauseableNode(base_1.DecoratableNode(base_1.TypeParameteredNode(namespace_1.NamespaceChildableNode(base_1.JSDocableNode(base_1.AmbientableNode(base_2.AbstractableNode(base_1.ExportableNode(base_1.ModifierableNode(base_1.NameableNode(statement_1.Statement)))))))))))));
var ClassDeclaration = /** @class */ (function (_super) {
    tslib_1.__extends(ClassDeclaration, _super);
    function ClassDeclaration() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Fills the node from a structure.
     * @param structure - Structure to fill.
     */
    ClassDeclaration.prototype.fill = function (structure) {
        callBaseFill_1.callBaseFill(exports.ClassDeclarationBase.prototype, this, structure);
        if (structure.extends != null)
            this.setExtends(structure.extends);
        if (structure.ctors != null)
            this.addConstructors(structure.ctors);
        if (structure.properties != null)
            this.addProperties(structure.properties);
        if (structure.getAccessors != null)
            this.addGetAccessors(structure.getAccessors);
        if (structure.setAccessors != null)
            this.addSetAccessors(structure.setAccessors);
        if (structure.methods != null)
            this.addMethods(structure.methods);
        return this;
    };
    /**
     * Sets the extends expression.
     * @param text - Text to set as the extends expression.
     */
    ClassDeclaration.prototype.setExtends = function (text) {
        if (utils_1.StringUtils.isNullOrWhitespace(text))
            return this.removeExtends();
        var heritageClauses = this.getHeritageClauses();
        var extendsClause = this.getHeritageClauseByKind(typescript_1.SyntaxKind.ExtendsKeyword);
        if (extendsClause != null) {
            var childSyntaxList = extendsClause.getFirstChildByKindOrThrow(typescript_1.SyntaxKind.SyntaxList);
            var childSyntaxListStart = childSyntaxList.getStart();
            manipulation_1.insertIntoParentTextRange({
                parent: extendsClause,
                newText: text,
                insertPos: childSyntaxListStart,
                replacing: {
                    textLength: childSyntaxList.getEnd() - childSyntaxListStart
                }
            });
            return this;
        }
        var implementsClause = this.getHeritageClauseByKind(typescript_1.SyntaxKind.ImplementsKeyword);
        var insertPos;
        if (implementsClause != null)
            insertPos = implementsClause.getStart();
        else
            insertPos = this.getFirstChildByKindOrThrow(typescript_1.SyntaxKind.OpenBraceToken).getStart();
        var isLastSpace = /\s/.test(this.getSourceFile().getFullText()[insertPos - 1]);
        var newText = "extends " + text + " ";
        if (!isLastSpace)
            newText = " " + newText;
        manipulation_1.insertIntoParentTextRange({
            parent: implementsClause == null ? this : implementsClause.getParentSyntaxListOrThrow(),
            insertPos: insertPos,
            newText: newText
        });
        return this;
    };
    /**
     * Removes the extends expression, if it exists.
     */
    ClassDeclaration.prototype.removeExtends = function () {
        var extendsClause = this.getHeritageClauseByKind(typescript_1.SyntaxKind.ExtendsKeyword);
        if (extendsClause == null)
            return this;
        extendsClause.removeExpression(0);
        return this;
    };
    /**
     * Gets the extends expression or throws if it doesn't exist.
     */
    ClassDeclaration.prototype.getExtendsOrThrow = function () {
        return errors.throwIfNullOrUndefined(this.getExtends(), "Expected to find the extends expression for the class " + this.getName() + ".");
    };
    /**
     * Gets the extends expression or returns undefined if it doesn't exist.
     */
    ClassDeclaration.prototype.getExtends = function () {
        var extendsClause = this.getHeritageClauseByKind(typescript_1.SyntaxKind.ExtendsKeyword);
        if (extendsClause == null)
            return undefined;
        var types = extendsClause.getTypeNodes();
        return types.length === 0 ? undefined : types[0];
    };
    /**
     * Adds a constructor.
     * @param structure - Structure of the constructor.
     */
    ClassDeclaration.prototype.addConstructor = function (structure) {
        if (structure === void 0) { structure = {}; }
        return this.insertConstructor(manipulation_1.getEndIndexFromArray(this.getMembers()), structure);
    };
    /**
     * Adds constructors.
     * @param structures - Structures of the constructor.
     */
    ClassDeclaration.prototype.addConstructors = function (structures) {
        return this.insertConstructors(manipulation_1.getEndIndexFromArray(this.getMembers()), structures);
    };
    /**
     * Inserts a constructor.
     * @param index - Index to insert at.
     * @param structure - Structure of the constructor.
     */
    ClassDeclaration.prototype.insertConstructor = function (index, structure) {
        if (structure === void 0) { structure = {}; }
        return this.insertConstructors(index, [structure])[0];
    };
    /**
     * Inserts constructors.
     * @param index - Index to insert at.
     * @param structures - Structures of the constructor.
     */
    ClassDeclaration.prototype.insertConstructors = function (index, structures) {
        var _this = this;
        var isAmbient = this.isAmbient();
        return manipulation_1.insertIntoBracesOrSourceFileWithGetChildren({
            getIndexedChildren: function () { return _this.getMembers(); },
            parent: this,
            index: index,
            structures: structures,
            expectedKind: typescript_1.SyntaxKind.Constructor,
            write: function (writer, info) {
                if (!isAmbient && info.previousMember != null)
                    writer.blankLineIfLastNot();
                else
                    writer.newLineIfLastNot();
                _this.global.structurePrinterFactory.forConstructorDeclaration({ isAmbient: isAmbient }).printTexts(writer, structures);
                if (!isAmbient && info.nextMember != null)
                    writer.blankLineIfLastNot();
                else
                    writer.newLineIfLastNot();
            }
        });
    };
    /**
     * Gets the constructor declarations.
     */
    ClassDeclaration.prototype.getConstructors = function () {
        return this.getMembers().filter(function (m) { return utils_1.TypeGuards.isConstructorDeclaration(m); });
    };
    /**
     * Add get accessor.
     * @param structure - Structure representing the get accessor.
     */
    ClassDeclaration.prototype.addGetAccessor = function (structure) {
        return this.addGetAccessors([structure])[0];
    };
    /**
     * Add properties.
     * @param structures - Structures representing the properties.
     */
    ClassDeclaration.prototype.addGetAccessors = function (structures) {
        return this.insertGetAccessors(manipulation_1.getEndIndexFromArray(this.getMembers()), structures);
    };
    /**
     * Insert get accessor.
     * @param index - Index to insert at.
     * @param structure - Structure representing the get accessor.
     */
    ClassDeclaration.prototype.insertGetAccessor = function (index, structure) {
        return this.insertGetAccessors(index, [structure])[0];
    };
    /**
     * Insert properties.
     * @param index - Index to insert at.
     * @param structures - Structures representing the properties.
     */
    ClassDeclaration.prototype.insertGetAccessors = function (index, structures) {
        var _this = this;
        return manipulation_1.insertIntoBracesOrSourceFileWithGetChildren({
            getIndexedChildren: function () { return _this.getMembers(); },
            parent: this,
            index: index,
            structures: structures,
            expectedKind: typescript_1.SyntaxKind.GetAccessor,
            write: function (writer, info) {
                if (info.previousMember != null)
                    writer.blankLineIfLastNot();
                else
                    writer.newLineIfLastNot();
                _this.global.structurePrinterFactory.forGetAccessorDeclaration({ isAmbient: _this.isAmbient() }).printTexts(writer, structures);
                if (info.nextMember != null)
                    writer.blankLineIfLastNot();
                else
                    writer.newLineIfLastNot();
            }
        });
    };
    /**
     * Add set accessor.
     * @param structure - Structure representing the set accessor.
     */
    ClassDeclaration.prototype.addSetAccessor = function (structure) {
        return this.addSetAccessors([structure])[0];
    };
    /**
     * Add properties.
     * @param structures - Structures representing the properties.
     */
    ClassDeclaration.prototype.addSetAccessors = function (structures) {
        return this.insertSetAccessors(manipulation_1.getEndIndexFromArray(this.getMembers()), structures);
    };
    /**
     * Insert set accessor.
     * @param index - Index to insert at.
     * @param structure - Structure representing the set accessor.
     */
    ClassDeclaration.prototype.insertSetAccessor = function (index, structure) {
        return this.insertSetAccessors(index, [structure])[0];
    };
    /**
     * Insert properties.
     * @param index - Index to insert at.
     * @param structures - Structures representing the properties.
     */
    ClassDeclaration.prototype.insertSetAccessors = function (index, structures) {
        var _this = this;
        return manipulation_1.insertIntoBracesOrSourceFileWithGetChildren({
            getIndexedChildren: function () { return _this.getMembers(); },
            parent: this,
            index: index,
            structures: structures,
            expectedKind: typescript_1.SyntaxKind.SetAccessor,
            write: function (writer, info) {
                if (info.previousMember != null)
                    writer.blankLineIfLastNot();
                else
                    writer.newLineIfLastNot();
                _this.global.structurePrinterFactory.forSetAccessorDeclaration({ isAmbient: _this.isAmbient() }).printTexts(writer, structures);
                if (info.nextMember != null)
                    writer.blankLineIfLastNot();
                else
                    writer.newLineIfLastNot();
            }
        });
    };
    /**
     * Add property.
     * @param structure - Structure representing the property.
     */
    ClassDeclaration.prototype.addProperty = function (structure) {
        return this.addProperties([structure])[0];
    };
    /**
     * Add properties.
     * @param structures - Structures representing the properties.
     */
    ClassDeclaration.prototype.addProperties = function (structures) {
        return this.insertProperties(manipulation_1.getEndIndexFromArray(this.getMembers()), structures);
    };
    /**
     * Insert property.
     * @param index - Index to insert at.
     * @param structure - Structure representing the property.
     */
    ClassDeclaration.prototype.insertProperty = function (index, structure) {
        return this.insertProperties(index, [structure])[0];
    };
    /**
     * Insert properties.
     * @param index - Index to insert at.
     * @param structures - Structures representing the properties.
     */
    ClassDeclaration.prototype.insertProperties = function (index, structures) {
        var _this = this;
        return manipulation_1.insertIntoBracesOrSourceFileWithGetChildren({
            getIndexedChildren: function () { return _this.getMembers(); },
            parent: this,
            index: index,
            structures: structures,
            expectedKind: typescript_1.SyntaxKind.PropertyDeclaration,
            write: function (writer, info) {
                if (info.previousMember != null && utils_1.TypeGuards.hasBody(info.previousMember))
                    writer.blankLineIfLastNot();
                else
                    writer.newLineIfLastNot();
                _this.global.structurePrinterFactory.forPropertyDeclaration().printTexts(writer, structures);
                if (info.nextMember != null && utils_1.TypeGuards.hasBody(info.nextMember))
                    writer.blankLineIfLastNot();
                else
                    writer.newLineIfLastNot();
            }
        });
    };
    ClassDeclaration.prototype.getInstanceProperty = function (nameOrFindFunction) {
        return utils_1.getNodeByNameOrFindFunction(this.getInstanceProperties(), nameOrFindFunction);
    };
    ClassDeclaration.prototype.getInstancePropertyOrThrow = function (nameOrFindFunction) {
        return errors.throwIfNullOrUndefined(this.getInstanceProperty(nameOrFindFunction), function () { return utils_1.getNotFoundErrorMessageForNameOrFindFunction("class instance property", nameOrFindFunction); });
    };
    /**
     * Gets the class instance property declarations.
     */
    ClassDeclaration.prototype.getInstanceProperties = function () {
        return this.getInstanceMembers()
            .filter(function (m) { return isClassPropertyType(m); });
    };
    ClassDeclaration.prototype.getStaticProperty = function (nameOrFindFunction) {
        return utils_1.getNodeByNameOrFindFunction(this.getStaticProperties(), nameOrFindFunction);
    };
    ClassDeclaration.prototype.getStaticPropertyOrThrow = function (nameOrFindFunction) {
        return errors.throwIfNullOrUndefined(this.getStaticProperty(nameOrFindFunction), function () { return utils_1.getNotFoundErrorMessageForNameOrFindFunction("class static property", nameOrFindFunction); });
    };
    /**
     * Gets the class instance property declarations.
     */
    ClassDeclaration.prototype.getStaticProperties = function () {
        return this.getStaticMembers()
            .filter(function (m) { return isClassPropertyType(m); });
    };
    ClassDeclaration.prototype.getProperty = function (nameOrFindFunction) {
        return utils_1.getNodeByNameOrFindFunction(this.getProperties(), nameOrFindFunction);
    };
    ClassDeclaration.prototype.getPropertyOrThrow = function (nameOrFindFunction) {
        return errors.throwIfNullOrUndefined(this.getProperty(nameOrFindFunction), function () { return utils_1.getNotFoundErrorMessageForNameOrFindFunction("class property declaration", nameOrFindFunction); });
    };
    /**
     * Gets the class property declarations regardless of whether it's an instance of static property.
     */
    ClassDeclaration.prototype.getProperties = function () {
        return this.getMembers()
            .filter(function (m) { return utils_1.TypeGuards.isPropertyDeclaration(m); });
    };
    ClassDeclaration.prototype.getGetAccessor = function (nameOrFindFunction) {
        return utils_1.getNodeByNameOrFindFunction(this.getGetAccessors(), nameOrFindFunction);
    };
    ClassDeclaration.prototype.getGetAccessorOrThrow = function (nameOrFindFunction) {
        return errors.throwIfNullOrUndefined(this.getGetAccessor(nameOrFindFunction), function () { return utils_1.getNotFoundErrorMessageForNameOrFindFunction("class getAccessor declaration", nameOrFindFunction); });
    };
    /**
     * Gets the class get accessor declarations regardless of whether it's an instance of static getAccessor.
     */
    ClassDeclaration.prototype.getGetAccessors = function () {
        return this.getMembers()
            .filter(function (m) { return utils_1.TypeGuards.isGetAccessorDeclaration(m); });
    };
    ClassDeclaration.prototype.getSetAccessor = function (nameOrFindFunction) {
        return utils_1.getNodeByNameOrFindFunction(this.getSetAccessors(), nameOrFindFunction);
    };
    ClassDeclaration.prototype.getSetAccessorOrThrow = function (nameOrFindFunction) {
        return errors.throwIfNullOrUndefined(this.getSetAccessor(nameOrFindFunction), function () { return utils_1.getNotFoundErrorMessageForNameOrFindFunction("class setAccessor declaration", nameOrFindFunction); });
    };
    /**
     * Sets the class set accessor declarations regardless of whether it's an instance of static setAccessor.
     */
    ClassDeclaration.prototype.getSetAccessors = function () {
        return this.getMembers()
            .filter(function (m) { return utils_1.TypeGuards.isSetAccessorDeclaration(m); });
    };
    /**
     * Add method.
     * @param structure - Structure representing the method.
     */
    ClassDeclaration.prototype.addMethod = function (structure) {
        return this.addMethods([structure])[0];
    };
    /**
     * Add methods.
     * @param structures - Structures representing the methods.
     */
    ClassDeclaration.prototype.addMethods = function (structures) {
        return this.insertMethods(manipulation_1.getEndIndexFromArray(this.getMembers()), structures);
    };
    /**
     * Insert method.
     * @param index - Index to insert at.
     * @param structure - Structure representing the method.
     */
    ClassDeclaration.prototype.insertMethod = function (index, structure) {
        return this.insertMethods(index, [structure])[0];
    };
    /**
     * Insert methods.
     * @param index - Index to insert at.
     * @param structures - Structures representing the methods.
     */
    ClassDeclaration.prototype.insertMethods = function (index, structures) {
        var _this = this;
        var isAmbient = this.isAmbient();
        structures = structures.map(function (s) { return (tslib_1.__assign({}, s)); });
        // insert, fill, and get created nodes
        return manipulation_1.insertIntoBracesOrSourceFileWithGetChildren({
            parent: this,
            index: index,
            getIndexedChildren: function () { return _this.getMembers(); },
            write: function (writer, info) {
                if (!isAmbient && info.previousMember != null)
                    writer.blankLineIfLastNot();
                else
                    writer.newLineIfLastNot();
                _this.global.structurePrinterFactory.forMethodDeclaration({ isAmbient: isAmbient }).printTexts(writer, structures);
                if (!isAmbient && info.nextMember != null)
                    writer.blankLineIfLastNot();
                else
                    writer.newLineIfLastNot();
            },
            structures: structures,
            expectedKind: typescript_1.SyntaxKind.MethodDeclaration
        });
    };
    ClassDeclaration.prototype.getMethod = function (nameOrFindFunction) {
        return utils_1.getNodeByNameOrFindFunction(this.getMethods(), nameOrFindFunction);
    };
    ClassDeclaration.prototype.getMethodOrThrow = function (nameOrFindFunction) {
        return errors.throwIfNullOrUndefined(this.getMethod(nameOrFindFunction), function () { return utils_1.getNotFoundErrorMessageForNameOrFindFunction("class method declaration", nameOrFindFunction); });
    };
    /**
     * Gets the class method declarations regardless of whether it's an instance of static method.
     */
    ClassDeclaration.prototype.getMethods = function () {
        return this.getMembers()
            .filter(function (m) { return utils_1.TypeGuards.isMethodDeclaration(m); });
    };
    ClassDeclaration.prototype.getInstanceMethod = function (nameOrFindFunction) {
        return utils_1.getNodeByNameOrFindFunction(this.getInstanceMethods(), nameOrFindFunction);
    };
    ClassDeclaration.prototype.getInstanceMethodOrThrow = function (nameOrFindFunction) {
        return errors.throwIfNullOrUndefined(this.getInstanceMethod(nameOrFindFunction), function () { return utils_1.getNotFoundErrorMessageForNameOrFindFunction("class instance method", nameOrFindFunction); });
    };
    /**
     * Gets the class instance method declarations.
     */
    ClassDeclaration.prototype.getInstanceMethods = function () {
        return this.getInstanceMembers().filter(function (m) { return m instanceof MethodDeclaration_1.MethodDeclaration; });
    };
    ClassDeclaration.prototype.getStaticMethod = function (nameOrFindFunction) {
        return utils_1.getNodeByNameOrFindFunction(this.getStaticMethods(), nameOrFindFunction);
    };
    ClassDeclaration.prototype.getStaticMethodOrThrow = function (nameOrFindFunction) {
        return errors.throwIfNullOrUndefined(this.getStaticMethod(nameOrFindFunction), function () { return utils_1.getNotFoundErrorMessageForNameOrFindFunction("class static method", nameOrFindFunction); });
    };
    /**
     * Gets the class instance method declarations.
     */
    ClassDeclaration.prototype.getStaticMethods = function () {
        return this.getStaticMembers().filter(function (m) { return m instanceof MethodDeclaration_1.MethodDeclaration; });
    };
    ClassDeclaration.prototype.getInstanceMember = function (nameOrFindFunction) {
        return utils_1.getNodeByNameOrFindFunction(this.getInstanceMembers(), nameOrFindFunction);
    };
    ClassDeclaration.prototype.getInstanceMemberOrThrow = function (nameOrFindFunction) {
        return errors.throwIfNullOrUndefined(this.getInstanceMember(nameOrFindFunction), function () { return utils_1.getNotFoundErrorMessageForNameOrFindFunction("class instance member", nameOrFindFunction); });
    };
    /**
     * Gets the instance members.
     */
    ClassDeclaration.prototype.getInstanceMembers = function () {
        return this.getMembersWithParameterProperties()
            .filter(function (m) { return !utils_1.TypeGuards.isConstructorDeclaration(m) && (utils_1.TypeGuards.isParameterDeclaration(m) || !m.isStatic()); });
    };
    ClassDeclaration.prototype.getStaticMember = function (nameOrFindFunction) {
        return utils_1.getNodeByNameOrFindFunction(this.getStaticMembers(), nameOrFindFunction);
    };
    ClassDeclaration.prototype.getStaticMemberOrThrow = function (nameOrFindFunction) {
        return errors.throwIfNullOrUndefined(this.getStaticMember(nameOrFindFunction), function () { return utils_1.getNotFoundErrorMessageForNameOrFindFunction("class static member", nameOrFindFunction); });
    };
    /**
     * Gets the static members.
     */
    ClassDeclaration.prototype.getStaticMembers = function () {
        return this.getMembers().filter(function (m) { return !utils_1.TypeGuards.isConstructorDeclaration(m) && !(m instanceof function_1.ParameterDeclaration) && m.isStatic(); });
    };
    /**
     * Gets the class members regardless of whether an instance of static member with parameter properties.
     * @internal
     */
    ClassDeclaration.prototype.getMembersWithParameterProperties = function () {
        var e_1, _a, e_2, _b;
        var members = this.getMembers();
        var implementationCtors = members.filter(function (c) { return utils_1.TypeGuards.isConstructorDeclaration(c) && c.isImplementation(); });
        try {
            for (var implementationCtors_1 = tslib_1.__values(implementationCtors), implementationCtors_1_1 = implementationCtors_1.next(); !implementationCtors_1_1.done; implementationCtors_1_1 = implementationCtors_1.next()) {
                var ctor = implementationCtors_1_1.value;
                // insert after the constructor
                var insertIndex = members.indexOf(ctor) + 1;
                try {
                    for (var _c = tslib_1.__values(ctor.getParameters()), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var param = _d.value;
                        if (param.isParameterProperty()) {
                            members.splice(insertIndex, 0, param);
                            insertIndex++;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (implementationCtors_1_1 && !implementationCtors_1_1.done && (_a = implementationCtors_1.return)) _a.call(implementationCtors_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return members;
    };
    /**
     * Gets the class' members regardless of whether it's an instance of static member.
     */
    ClassDeclaration.prototype.getMembers = function () {
        return getAllMembers(this).filter(function (m) { return isSupportedClassMember(m); });
        function getAllMembers(classDec) {
            var members = classDec.compilerNode.members.map(function (m) { return classDec.getNodeFromCompilerNode(m); });
            // filter out the method declarations or constructor declarations without a body if not ambient
            return classDec.isAmbient() ? members : members.filter(function (m) {
                if (!(utils_1.TypeGuards.isConstructorDeclaration(m) || utils_1.TypeGuards.isMethodDeclaration(m)))
                    return true;
                if (utils_1.TypeGuards.isMethodDeclaration(m) && m.isAbstract())
                    return true;
                return m.isImplementation();
            });
        }
    };
    ClassDeclaration.prototype.getMember = function (nameOrFindFunction) {
        return utils_1.getNodeByNameOrFindFunction(this.getMembers(), nameOrFindFunction);
    };
    ClassDeclaration.prototype.getMemberOrThrow = function (nameOrFindFunction) {
        return errors.throwIfNullOrUndefined(this.getMember(nameOrFindFunction), function () { return utils_1.getNotFoundErrorMessageForNameOrFindFunction("class member", nameOrFindFunction); });
    };
    /**
     * Gets the base types.
     *
     * This is useful to use if the base could possibly be a mixin.
     */
    ClassDeclaration.prototype.getBaseTypes = function () {
        return this.getType().getBaseTypes();
    };
    /**
     * Gets the base class or throws.
     *
     * Note: Use getBaseTypes if you need to get the mixins.
     */
    ClassDeclaration.prototype.getBaseClassOrThrow = function () {
        return errors.throwIfNullOrUndefined(this.getBaseClass(), "Expected to find the base class of " + this.getName() + ".");
    };
    /**
     * Gets the base class.
     *
     * Note: Use getBaseTypes if you need to get the mixins.
     */
    ClassDeclaration.prototype.getBaseClass = function () {
        var baseTypes = utils_1.ArrayUtils.flatten(this.getBaseTypes().map(function (t) { return t.isIntersection() ? t.getIntersectionTypes() : [t]; }));
        var declarations = baseTypes
            .map(function (t) { return t.getSymbol(); })
            .filter(function (s) { return s != null; })
            .map(function (s) { return s.getDeclarations(); })
            .reduce(function (a, b) { return a.concat(b); }, [])
            .filter(function (d) { return d.getKind() === typescript_1.SyntaxKind.ClassDeclaration; });
        if (declarations.length !== 1)
            return undefined;
        return declarations[0];
    };
    /**
     * Gets all the derived classes.
     */
    ClassDeclaration.prototype.getDerivedClasses = function () {
        var e_3, _a;
        var classes = this.getImmediateDerivedClasses();
        for (var i = 0; i < classes.length; i++) {
            var derivedClasses = classes[i].getImmediateDerivedClasses();
            try {
                for (var derivedClasses_1 = tslib_1.__values(derivedClasses), derivedClasses_1_1 = derivedClasses_1.next(); !derivedClasses_1_1.done; derivedClasses_1_1 = derivedClasses_1.next()) {
                    var derivedClass = derivedClasses_1_1.value;
                    // don't allow circular references
                    if (derivedClass !== this && classes.indexOf(derivedClass) === -1)
                        classes.push(derivedClass);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (derivedClasses_1_1 && !derivedClasses_1_1.done && (_a = derivedClasses_1.return)) _a.call(derivedClasses_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        return classes;
    };
    ClassDeclaration.prototype.getImmediateDerivedClasses = function () {
        var e_4, _a;
        var classes = [];
        var nameNode = this.getNameNode();
        if (nameNode == null)
            return classes;
        try {
            for (var _b = tslib_1.__values(nameNode.findReferencesAsNodes()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var node = _c.value;
                var nodeParent = node.getParentIfKind(typescript_1.SyntaxKind.ExpressionWithTypeArguments);
                if (nodeParent == null)
                    continue;
                var heritageClause = nodeParent.getParentIfKind(typescript_1.SyntaxKind.HeritageClause);
                if (heritageClause == null || heritageClause.getToken() !== typescript_1.SyntaxKind.ExtendsKeyword)
                    continue;
                classes.push(heritageClause.getFirstAncestorByKindOrThrow(typescript_1.SyntaxKind.ClassDeclaration));
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return classes;
    };
    return ClassDeclaration;
}(exports.ClassDeclarationBase));
exports.ClassDeclaration = ClassDeclaration;
function isClassPropertyType(m) {
    return utils_1.TypeGuards.isPropertyDeclaration(m)
        || utils_1.TypeGuards.isSetAccessorDeclaration(m)
        || utils_1.TypeGuards.isGetAccessorDeclaration(m)
        || utils_1.TypeGuards.isParameterDeclaration(m);
}
function isSupportedClassMember(m) {
    return utils_1.TypeGuards.isMethodDeclaration(m)
        || utils_1.TypeGuards.isPropertyDeclaration(m)
        || utils_1.TypeGuards.isGetAccessorDeclaration(m)
        || utils_1.TypeGuards.isSetAccessorDeclaration(m)
        || utils_1.TypeGuards.isConstructorDeclaration(m);
}

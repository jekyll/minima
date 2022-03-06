'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var SlidingPanesSettings = /** @class */ (function () {
    function SlidingPanesSettings() {
        this.headerWidth = 32;
        this.leafWidth = 700;
        this.leafAutoWidth = false;
        this.disabled = false;
        this.rotateHeaders = true;
        this.headerAlt = false;
        this.orienation = "mixed";
        this.stackingEnabled = true;
        this.smoothAnimation = true;
    }
    return SlidingPanesSettings;
}());
var SlidingPanesSettingTab = /** @class */ (function (_super) {
    __extends(SlidingPanesSettingTab, _super);
    function SlidingPanesSettingTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    SlidingPanesSettingTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        new obsidian.Setting(containerEl)
            .setName("Toggle Sliding Panes")
            .setDesc("Turns sliding panes on or off globally")
            .addToggle(function (toggle) { return toggle.setValue(!_this.plugin.settings.disabled)
            .onChange(function (value) {
            _this.plugin.settings.disabled = !value;
            _this.plugin.saveData(_this.plugin.settings);
            if (_this.plugin.settings.disabled) {
                _this.plugin.disable();
            }
            else {
                _this.plugin.enable();
            }
        }); });
        new obsidian.Setting(containerEl)
            .setName('Smooth Animation')
            .setDesc('Whether to use smooth animation (on) or snapping (off)')
            .addToggle(function (toggle) { return toggle.setValue(_this.plugin.settings.smoothAnimation)
            .onChange(function (value) {
            _this.plugin.settings.smoothAnimation = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName('Leaf Auto Width')
            .setDesc('If on, the width of the pane should fill the available space')
            .addToggle(function (toggle) { return toggle.setValue(_this.plugin.settings.leafAutoWidth)
            .onChange(function (value) {
            _this.plugin.settings.leafAutoWidth = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName('Leaf Width')
            .setDesc('The width of a single pane (only if auto width is off)')
            .addText(function (text) { return text.setPlaceholder('Example: 700')
            .setValue((_this.plugin.settings.leafWidth || '') + '')
            .onChange(function (value) {
            _this.plugin.settings.leafWidth = parseInt(value.trim());
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Toggle rotated headers")
            .setDesc("Rotates headers to use as spines")
            .addToggle(function (toggle) { return toggle.setValue(_this.plugin.settings.rotateHeaders)
            .onChange(function (value) {
            _this.plugin.settings.rotateHeaders = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Swap rotated header direction")
            .setDesc("Swaps the direction of rotated headers")
            .addToggle(function (toggle) { return toggle.setValue(_this.plugin.settings.headerAlt)
            .onChange(function (value) {
            _this.plugin.settings.headerAlt = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName("Header text orientation")
            .setDesc("Select the header text orientation")
            .addDropdown(function (dropdown) {
            dropdown.addOption("sideway", "Sideway");
            dropdown.addOption("mixed", "Mixed");
            dropdown.addOption("upright", "Upright");
            dropdown.setValue(_this.plugin.settings.orienation);
            dropdown.onChange(function (value) {
                _this.plugin.settings.orienation = value;
                _this.plugin.saveData(_this.plugin.settings);
                _this.plugin.refresh();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Toggle stacking")
            .setDesc("Panes will stack up to the left and right")
            .addToggle(function (toggle) { return toggle.setValue(_this.plugin.settings.stackingEnabled)
            .onChange(function (value) {
            _this.plugin.settings.stackingEnabled = value;
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
        new obsidian.Setting(containerEl)
            .setName('Spine Width')
            .setDesc('The width of the rotated header (or gap) for stacking')
            .addText(function (text) { return text.setPlaceholder('Example: 32')
            .setValue((_this.plugin.settings.headerWidth || '') + '')
            .onChange(function (value) {
            _this.plugin.settings.headerWidth = parseInt(value.trim());
            _this.plugin.saveData(_this.plugin.settings);
            _this.plugin.refresh();
        }); });
    };
    return SlidingPanesSettingTab;
}(obsidian.PluginSettingTab));
var SlidingPanesCommands = /** @class */ (function () {
    function SlidingPanesCommands(plugin) {
        this.plugin = plugin;
    }
    SlidingPanesCommands.prototype.addToggleSettingCommand = function (id, name, settingName) {
        var _this = this;
        this.plugin.addCommand({
            id: id,
            name: name,
            callback: function () {
                // switch the setting, save and refresh
                //@ts-ignore
                _this.plugin.settings[settingName] = !_this.plugin.settings[settingName];
                _this.plugin.saveData(_this.plugin.settings);
                _this.plugin.refresh();
            }
        });
    };
    SlidingPanesCommands.prototype.addCommands = function () {
        var _this = this;
        // add the toggle on/off command
        this.plugin.addCommand({
            id: 'toggle-sliding-panes',
            name: 'Toggle Sliding Panes',
            callback: function () {
                // switch the disabled setting and save
                _this.plugin.settings.disabled = !_this.plugin.settings.disabled;
                _this.plugin.saveData(_this.plugin.settings);
                // disable or enable as necessary
                _this.plugin.settings.disabled ? _this.plugin.disable() : _this.plugin.enable();
            }
        });
        // add a command to toggle smooth animation
        this.addToggleSettingCommand('toggle-sliding-panes-smooth-animation', 'Toggle Smooth Animation', 'smoothAnimation');
        // add a command to toggle leaf auto width
        this.addToggleSettingCommand('toggle-sliding-panes-leaf-auto-width', 'Toggle Leaf Auto Width', 'leafAutoWidth');
        // add a command to toggle stacking
        this.addToggleSettingCommand('toggle-sliding-panes-stacking', 'Toggle Stacking', 'stackingEnabled');
        // add a command to toggle rotated headers
        this.addToggleSettingCommand('toggle-sliding-panes-rotated-headers', 'Toggle Rotated Headers', 'rotateHeaders');
        // add a command to toggle swapped header direction
        this.addToggleSettingCommand('toggle-sliding-panes-header-alt', 'Swap rotated header direction', 'headerAlt');
    };
    return SlidingPanesCommands;
}());

var SlidingPanesPlugin = /** @class */ (function (_super) {
    __extends(SlidingPanesPlugin, _super);
    function SlidingPanesPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // helper variables
        _this.activeLeafIndex = 0;
        _this.prevRootLeaves = [];
        // enable andy mode
        _this.enable = function () {
            // add the event handlers
            _this.registerEvent(_this.app.workspace.on('resize', _this.handleResize));
            _this.registerEvent(_this.app.workspace.on('layout-change', _this.handleLayoutChange));
            _this.registerEvent(_this.app.workspace.on('file-open', _this.handleFileOpen));
            _this.registerEvent(_this.app.vault.on('delete', _this.handleDelete));
            // wait for layout to be ready to perform the rest
            _this.app.workspace.layoutReady ? _this.reallyEnable() : _this.app.workspace.on('layout-ready', _this.reallyEnable);
        };
        // really enable things (once the layout is ready)
        _this.reallyEnable = function () {
            // we don't need the event handler anymore
            _this.app.workspace.off('layout-ready', _this.reallyEnable);
            // backup the function so I can restore it
            _this.rootSplitAny.oldOnChildResizeStart = _this.rootSplitAny.onChildResizeStart;
            _this.rootSplitAny.onChildResizeStart = _this.onChildResizeStart;
            // add some extra classes that can't fit in the styles.css
            // because they use settings
            _this.addStyle();
            // do all the calucations necessary for the workspace leaves
            _this.recalculateLeaves();
        };
        // shut down andy mode
        _this.disable = function () {
            // get rid of the extra style tag we added
            _this.removeStyle();
            // iterate through the root leaves to remove the stuff we added
            _this.rootLeaves.forEach(_this.clearLeaf);
            // restore the default functionality
            _this.rootSplitAny.onChildResizeStart = _this.rootSplitAny.oldOnChildResizeStart;
        };
        _this.clearLeaf = function (leaf) {
            leaf.containerEl.style.width = null;
            leaf.containerEl.style.left = null;
            leaf.containerEl.style.right = null;
            leaf.containerEl.classList.remove('mod-am-left-of-active');
            leaf.containerEl.classList.remove('mod-am-right-of-active');
            var iconEl = leaf.view.iconEl;
            var iconText = iconEl.getAttribute("aria-label");
            if (iconText.includes("(")) {
                iconEl.setAttribute("aria-label", iconText.substring(iconText.lastIndexOf('(') + 1, iconText.lastIndexOf(')')));
            }
        };
        // refresh funcion for when we change settings
        _this.refresh = function () {
            // re-load the style
            _this.updateStyle();
            // recalculate leaf positions
            _this.recalculateLeaves();
        };
        // remove the stlying elements we've created
        _this.removeStyle = function () {
            var el = document.getElementById('plugin-sliding-panes');
            if (el)
                el.remove();
            document.body.classList.remove('plugin-sliding-panes');
            document.body.classList.remove('plugin-sliding-panes-rotate-header');
            document.body.classList.remove('plugin-sliding-panes-header-alt');
            document.body.classList.remove('plugin-sliding-panes-stacking');
        };
        // add the styling elements we need
        _this.addStyle = function () {
            // add a css block for our settings-dependent styles
            var css = document.createElement('style');
            css.id = 'plugin-sliding-panes';
            document.getElementsByTagName("head")[0].appendChild(css);
            // add the main class
            document.body.classList.add('plugin-sliding-panes');
            // update the style with the settings-dependent styles
            _this.updateStyle();
        };
        // update the styles (at the start, or as the result of a settings change)
        _this.updateStyle = function () {
            // if we've got rotate headers on, add the class which enables it
            document.body.classList.toggle('plugin-sliding-panes-rotate-header', _this.settings.rotateHeaders);
            document.body.classList.toggle('plugin-sliding-panes-header-alt', _this.settings.headerAlt);
            // do the same for stacking
            document.body.classList.toggle('plugin-sliding-panes-stacking', _this.settings.stackingEnabled);
            // get the custom css element
            var el = document.getElementById('plugin-sliding-panes');
            if (!el)
                throw "plugin-sliding-panes element not found!";
            else {
                // set the settings-dependent css
                el.innerText = "body.plugin-sliding-panes{--header-width:" + _this.settings.headerWidth + "px;}";
                if (!_this.settings.leafAutoWidth) {
                    el.innerText += "body.plugin-sliding-panes .mod-root>.workspace-leaf{width:" + (_this.settings.leafWidth + _this.settings.headerWidth) + "px;}";
                }
            }
            if (_this.settings.rotateHeaders) {
                _this.selectOrientation(_this.settings.orienation);
            }
        };
        _this.handleResize = function () {
            if (_this.app.workspace.layoutReady) {
                _this.recalculateLeaves();
            }
        };
        _this.handleLayoutChange = function () {
            var rootLeaves = _this.rootLeaves;
            if (rootLeaves.length < _this.prevRootLeaves.length) {
                _this.prevRootLeaves.forEach(function (leaf) {
                    if (!rootLeaves.contains(leaf)) {
                        _this.clearLeaf(leaf);
                    }
                });
            }
            _this.prevRootLeaves = _this.rootLeaves;
            //this.recalculateLeaves();
        };
        // Recalculate the leaf sizing and positions
        _this.recalculateLeaves = function () {
            // rootSplit.children is undocumented for now, but it's easier to use for what we're doing.
            // we only want leaves at the root of the root split
            // (this is to fix compatibility with backlinks in document and other such plugins)
            var rootContainerEl = _this.rootContainerEl;
            var rootLeaves = _this.rootLeaves;
            var leafCount = rootLeaves.length;
            var totalWidth = 0;
            // iterate through all the root-level leaves
            var widthChange = false;
            rootLeaves.forEach(function (leaf, i) {
                // @ts-ignore to get the undocumented containerEl
                var containerEl = leaf.containerEl;
                containerEl.style.flex = null;
                var oldWidth = containerEl.clientWidth;
                if (_this.settings.leafAutoWidth) {
                    containerEl.style.width = (rootContainerEl.clientWidth - ((leafCount - 1) * _this.settings.headerWidth)) + "px";
                }
                else {
                    containerEl.style.width = null;
                }
                if (oldWidth == containerEl.clientWidth)
                    widthChange = true;
                containerEl.style.left = _this.settings.stackingEnabled
                    ? (i * _this.settings.headerWidth) + "px"
                    : null;
                containerEl.style.right = _this.settings.stackingEnabled
                    ? (((leafCount - i) * _this.settings.headerWidth) - containerEl.clientWidth) + "px"
                    : null;
                // keep track of the total width of all leaves
                totalWidth += containerEl.clientWidth;
                var iconEl = leaf.view.iconEl;
                var iconText = iconEl.getAttribute("aria-label");
                if (!iconText.includes("(")) {
                    iconEl.setAttribute("aria-label", leaf.getDisplayText() + " (" + iconText + ")");
                }
            });
            // if the total width of all leaves is less than the width available,
            // add back the flex class so they fill the space
            if (totalWidth < rootContainerEl.clientWidth) {
                rootLeaves.forEach(function (leaf) {
                    leaf.containerEl.style.flex = '1 0 0';
                });
            }
            if (widthChange)
                _this.focusActiveLeaf(!_this.settings.leafAutoWidth);
        };
        // this function is called, not only when a file opens, but when the active pane is switched
        _this.handleFileOpen = function (e) {
            // put a small timeout on it because when a file is opened on the far right 
            // it wasn't focussing properly. The timeout fixes this
            setTimeout(function () {
                // focus on the newly selected leaf
                _this.focusActiveLeaf();
            }, 10);
        };
        // hande when a file is deleted
        _this.handleDelete = function (file) {
            // close any leaves with the deleted file open
            // detaching a leaf while iterating messes with the iteration
            var leavesToDetach = [];
            _this.app.workspace.iterateRootLeaves(function (leaf) {
                if (leaf.view instanceof obsidian.FileView && leaf.view.file == file) {
                    leavesToDetach.push(leaf);
                }
            });
            leavesToDetach.forEach(function (leaf) { return leaf.detach(); });
        };
        // overriden function for rootSplit child resize
        _this.onChildResizeStart = function (leaf, event) {
            // only really apply this to vertical splits
            if (_this.rootSplitAny.direction === "vertical") {
                // this is the width the leaf started at before resize
                var startWidth_1 = leaf.containerEl.clientWidth;
                // the mousemove event to trigger while resizing
                var mousemove_1 = function (e) {
                    // get the difference between the first position and current
                    var deltaX = e.pageX - event.pageX;
                    // adjust the start width by the delta
                    leaf.containerEl.style.width = startWidth_1 + deltaX + "px";
                };
                // the mouseup event to trigger at the end of resizing
                var mouseup_1 = function () {
                    // if stacking is enabled, we need to re-jig the "right" value
                    if (_this.settings.stackingEnabled) {
                        // we need the leaf count and index to calculate the correct value
                        var rootLeaves = _this.rootLeaves;
                        var leafCount = rootLeaves.length;
                        var leafIndex = rootLeaves.findIndex(function (l) { return l == leaf; });
                        leaf.containerEl.style.right = (((leafCount - leafIndex - 1) * _this.settings.headerWidth) - leaf.containerEl.clientWidth) + "px";
                    }
                    // remove these event listeners. We're done with them
                    document.removeEventListener("mousemove", mousemove_1);
                    document.removeEventListener("mouseup", mouseup_1);
                };
                // Add the above two event listeners
                document.addEventListener("mousemove", mousemove_1);
                document.addEventListener("mouseup", mouseup_1);
            }
        };
        return _this;
    }
    Object.defineProperty(SlidingPanesPlugin.prototype, "rootSplit", {
        // helper gets for any casts (for undocumented API stuff)
        get: function () { return this.app.workspace.rootSplit; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SlidingPanesPlugin.prototype, "rootSplitAny", {
        get: function () { return this.rootSplit; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SlidingPanesPlugin.prototype, "rootContainerEl", {
        get: function () { return this.app.workspace.rootSplit.containerEl; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SlidingPanesPlugin.prototype, "rootLeaves", {
        get: function () {
            var rootContainerEl = this.rootContainerEl;
            var rootLeaves = [];
            this.app.workspace.iterateRootLeaves(function (leaf) {
                if (leaf.containerEl.parentElement === rootContainerEl) {
                    rootLeaves.push(leaf);
                }
            });
            return rootLeaves;
        },
        enumerable: false,
        configurable: true
    });
    // when the plugin is loaded
    SlidingPanesPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        // load settings
                        _a = this;
                        _c = (_b = Object).assign;
                        _d = [new SlidingPanesSettings()];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        // load settings
                        _a.settings = _c.apply(_b, _d.concat([_e.sent()]));
                        // if it's not disabled in the settings, enable it
                        if (!this.settings.disabled)
                            this.enable();
                        // add the settings tab
                        this.addSettingTab(new SlidingPanesSettingTab(this.app, this));
                        // add the commands
                        new SlidingPanesCommands(this).addCommands();
                        return [2 /*return*/];
                }
            });
        });
    };
    // on unload, perform the same steps as disable
    SlidingPanesPlugin.prototype.onunload = function () {
        this.disable();
    };
    SlidingPanesPlugin.prototype.selectOrientation = function (orient) {
        document.body.classList.toggle('plugin-sliding-select-orientation-mixed', orient == 'mixed');
        document.body.classList.toggle('plugin-sliding-select-orientation-upright', orient == 'upright');
        document.body.classList.toggle('plugin-sliding-select-orientation-sideway', orient == 'sideway');
    };
    SlidingPanesPlugin.prototype.focusActiveLeaf = function (animated) {
        var _this = this;
        if (animated === void 0) { animated = true; }
        // get back to the leaf which has been andy'd (`any` because parentSplit is undocumented)
        var activeLeaf = this.app.workspace.activeLeaf;
        while (activeLeaf != null && activeLeaf.parentSplit != null && activeLeaf.parentSplit != this.app.workspace.rootSplit) {
            activeLeaf = activeLeaf.parentSplit;
        }
        if (activeLeaf != null && this.rootSplit) {
            var rootContainerEl = this.rootContainerEl;
            var rootLeaves = this.rootLeaves;
            var leafCount = rootLeaves.length;
            // get the index of the active leaf
            // also, get the position of this leaf, so we can scroll to it
            // as leaves are resizable, we have to iterate through all leaves to the
            // left until we get to the active one and add all their widths together
            var position_1 = 0;
            this.activeLeafIndex = -1;
            rootLeaves.forEach(function (leaf, index) {
                // @ts-ignore to get the undocumented containerEl
                var containerEl = leaf.containerEl;
                // this is the active one
                if (leaf == activeLeaf) {
                    _this.activeLeafIndex = index;
                    containerEl.classList.remove('mod-am-left-of-active');
                    containerEl.classList.remove('mod-am-right-of-active');
                }
                else if (_this.activeLeafIndex == -1 || index < _this.activeLeafIndex) {
                    // this is before the active one, add the width
                    position_1 += containerEl.clientWidth;
                    containerEl.classList.add('mod-am-left-of-active');
                    containerEl.classList.remove('mod-am-right-of-active');
                }
                else {
                    // this is right of the active one
                    containerEl.classList.remove('mod-am-left-of-active');
                    containerEl.classList.add('mod-am-right-of-active');
                }
            });
            // get this leaf's left value (the amount of space to the left for sticky headers)
            var left = parseInt(activeLeaf.containerEl.style.left) || 0;
            // the amount of space to the right we need to leave for sticky headers
            var headersToRightWidth = this.settings.stackingEnabled ? (leafCount - this.activeLeafIndex - 1) * this.settings.headerWidth : 0;
            // determine whether to request 'smooth' animations or 'auto' snap
            var behavior = animated && this.settings.smoothAnimation ? 'smooth' : 'auto';
            // it's too far left
            if (rootContainerEl.scrollLeft > position_1 - left) {
                // scroll the left side of the pane into view
                rootContainerEl.scrollTo({ left: position_1 - left, top: 0, behavior: behavior });
            }
            // it's too far right
            else if (rootContainerEl.scrollLeft + rootContainerEl.clientWidth < position_1 + activeLeaf.containerEl.clientWidth + headersToRightWidth) {
                // scroll the right side of the pane into view
                rootContainerEl.scrollTo({ left: position_1 + activeLeaf.containerEl.clientWidth + headersToRightWidth - rootContainerEl.clientWidth, top: 0, behavior: behavior });
            }
        }
    };
    return SlidingPanesPlugin;
}(obsidian.Plugin));

module.exports = SlidingPanesPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy9zZXR0aW5ncy50cyIsInNyYy9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi5cclxuXHJcblBlcm1pc3Npb24gdG8gdXNlLCBjb3B5LCBtb2RpZnksIGFuZC9vciBkaXN0cmlidXRlIHRoaXMgc29mdHdhcmUgZm9yIGFueVxyXG5wdXJwb3NlIHdpdGggb3Igd2l0aG91dCBmZWUgaXMgaGVyZWJ5IGdyYW50ZWQuXHJcblxyXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiIEFORCBUSEUgQVVUSE9SIERJU0NMQUlNUyBBTEwgV0FSUkFOVElFUyBXSVRIXHJcblJFR0FSRCBUTyBUSElTIFNPRlRXQVJFIElOQ0xVRElORyBBTEwgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWVxyXG5BTkQgRklUTkVTUy4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUiBCRSBMSUFCTEUgRk9SIEFOWSBTUEVDSUFMLCBESVJFQ1QsXHJcbklORElSRUNULCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVMgT1IgQU5ZIERBTUFHRVMgV0hBVFNPRVZFUiBSRVNVTFRJTkcgRlJPTVxyXG5MT1NTIE9GIFVTRSwgREFUQSBPUiBQUk9GSVRTLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgTkVHTElHRU5DRSBPUlxyXG5PVEhFUiBUT1JUSU9VUyBBQ1RJT04sIEFSSVNJTkcgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgVVNFIE9SXHJcblBFUkZPUk1BTkNFIE9GIFRISVMgU09GVFdBUkUuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG4vKiogQGRlcHJlY2F0ZWQgKi9cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXlzKCkge1xyXG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XHJcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXHJcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXHJcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xyXG4gICAgcmV0dXJuIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5KHRvLCBmcm9tKSB7XHJcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBmcm9tLmxlbmd0aCwgaiA9IHRvLmxlbmd0aDsgaSA8IGlsOyBpKyssIGorKylcclxuICAgICAgICB0b1tqXSA9IGZyb21baV07XHJcbiAgICByZXR1cm4gdG87XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSBPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcclxufSkgOiBmdW5jdGlvbihvLCB2KSB7XHJcbiAgICBvW1wiZGVmYXVsdFwiXSA9IHY7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnRTdGFyKG1vZCkge1xyXG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcclxuICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgIGlmIChtb2QgIT0gbnVsbCkgZm9yICh2YXIgayBpbiBtb2QpIGlmIChrICE9PSBcImRlZmF1bHRcIiAmJiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobW9kLCBrKSkgX19jcmVhdGVCaW5kaW5nKHJlc3VsdCwgbW9kLCBrKTtcclxuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19pbXBvcnREZWZhdWx0KG1vZCkge1xyXG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBkZWZhdWx0OiBtb2QgfTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRHZXQocmVjZWl2ZXIsIHN0YXRlLCBraW5kLCBmKSB7XHJcbiAgICBpZiAoa2luZCA9PT0gXCJhXCIgJiYgIWYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJQcml2YXRlIGFjY2Vzc29yIHdhcyBkZWZpbmVkIHdpdGhvdXQgYSBnZXR0ZXJcIik7XHJcbiAgICBpZiAodHlwZW9mIHN0YXRlID09PSBcImZ1bmN0aW9uXCIgPyByZWNlaXZlciAhPT0gc3RhdGUgfHwgIWYgOiAhc3RhdGUuaGFzKHJlY2VpdmVyKSkgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCByZWFkIHByaXZhdGUgbWVtYmVyIGZyb20gYW4gb2JqZWN0IHdob3NlIGNsYXNzIGRpZCBub3QgZGVjbGFyZSBpdFwiKTtcclxuICAgIHJldHVybiBraW5kID09PSBcIm1cIiA/IGYgOiBraW5kID09PSBcImFcIiA/IGYuY2FsbChyZWNlaXZlcikgOiBmID8gZi52YWx1ZSA6IHN0YXRlLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBzdGF0ZSwgdmFsdWUsIGtpbmQsIGYpIHtcclxuICAgIGlmIChraW5kID09PSBcIm1cIikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgbWV0aG9kIGlzIG5vdCB3cml0YWJsZVwiKTtcclxuICAgIGlmIChraW5kID09PSBcImFcIiAmJiAhZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlByaXZhdGUgYWNjZXNzb3Igd2FzIGRlZmluZWQgd2l0aG91dCBhIHNldHRlclwiKTtcclxuICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHJlY2VpdmVyICE9PSBzdGF0ZSB8fCAhZiA6ICFzdGF0ZS5oYXMocmVjZWl2ZXIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IHdyaXRlIHByaXZhdGUgbWVtYmVyIHRvIGFuIG9iamVjdCB3aG9zZSBjbGFzcyBkaWQgbm90IGRlY2xhcmUgaXRcIik7XHJcbiAgICByZXR1cm4gKGtpbmQgPT09IFwiYVwiID8gZi5jYWxsKHJlY2VpdmVyLCB2YWx1ZSkgOiBmID8gZi52YWx1ZSA9IHZhbHVlIDogc3RhdGUuc2V0KHJlY2VpdmVyLCB2YWx1ZSkpLCB2YWx1ZTtcclxufVxyXG4iLCJpbXBvcnQgeyBBcHAsIFBsdWdpbiwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcblxuZXhwb3J0IHR5cGUgT3JpZW50YXRpb24gPSBcInNpZGV3YXlcIiB8IFwibWl4ZWRcIiB8IFwidXByaWdodFwiXG5cbmRlY2xhcmUgY2xhc3MgU2xpZGluZ1BhbmVzUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcbiAgc2V0dGluZ3M6IFNsaWRpbmdQYW5lc1NldHRpbmdzO1xuICBkaXNhYmxlKCk6IHZvaWQ7XG4gIGVuYWJsZSgpOiB2b2lkO1xuICByZWZyZXNoKCk6IHZvaWQ7XG59XG5cbmV4cG9ydCBjbGFzcyBTbGlkaW5nUGFuZXNTZXR0aW5ncyB7XG4gIGhlYWRlcldpZHRoOiBudW1iZXIgPSAzMjtcbiAgbGVhZldpZHRoOiBudW1iZXIgPSA3MDA7XG4gIGxlYWZBdXRvV2lkdGg6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcm90YXRlSGVhZGVyczogYm9vbGVhbiA9IHRydWU7XG4gIGhlYWRlckFsdDogYm9vbGVhbiA9IGZhbHNlO1xuICBvcmllbmF0aW9uOiBPcmllbnRhdGlvbiA9IFwibWl4ZWRcIjtcbiAgc3RhY2tpbmdFbmFibGVkOiBib29sZWFuID0gdHJ1ZTtcbiAgc21vb3RoQW5pbWF0aW9uOiBib29sZWFuID0gdHJ1ZTtcbn1cblxuZXhwb3J0IGNsYXNzIFNsaWRpbmdQYW5lc1NldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcblxuICBwbHVnaW46IFNsaWRpbmdQYW5lc1BsdWdpbjtcbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogU2xpZGluZ1BhbmVzUGx1Z2luKSB7XG4gICAgc3VwZXIoYXBwLCBwbHVnaW4pO1xuICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICB9XG5cbiAgZGlzcGxheSgpOiB2b2lkIHtcbiAgICBsZXQgeyBjb250YWluZXJFbCB9ID0gdGhpcztcblxuICAgIGNvbnRhaW5lckVsLmVtcHR5KCk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiVG9nZ2xlIFNsaWRpbmcgUGFuZXNcIilcbiAgICAgIC5zZXREZXNjKFwiVHVybnMgc2xpZGluZyBwYW5lcyBvbiBvciBvZmYgZ2xvYmFsbHlcIilcbiAgICAgIC5hZGRUb2dnbGUodG9nZ2xlID0+IHRvZ2dsZS5zZXRWYWx1ZSghdGhpcy5wbHVnaW4uc2V0dGluZ3MuZGlzYWJsZWQpXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5kaXNhYmxlZCA9ICF2YWx1ZTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG4gICAgICAgICAgaWYgKHRoaXMucGx1Z2luLnNldHRpbmdzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5kaXNhYmxlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uZW5hYmxlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKCdTbW9vdGggQW5pbWF0aW9uJylcbiAgICAgIC5zZXREZXNjKCdXaGV0aGVyIHRvIHVzZSBzbW9vdGggYW5pbWF0aW9uIChvbikgb3Igc25hcHBpbmcgKG9mZiknKVxuICAgICAgLmFkZFRvZ2dsZSh0b2dnbGUgPT4gdG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnNtb290aEFuaW1hdGlvbilcbiAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLnNtb290aEFuaW1hdGlvbiA9IHZhbHVlO1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XG4gICAgICAgIH0pKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoJ0xlYWYgQXV0byBXaWR0aCcpXG4gICAgICAuc2V0RGVzYygnSWYgb24sIHRoZSB3aWR0aCBvZiB0aGUgcGFuZSBzaG91bGQgZmlsbCB0aGUgYXZhaWxhYmxlIHNwYWNlJylcbiAgICAgIC5hZGRUb2dnbGUodG9nZ2xlID0+IHRvZ2dsZS5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5sZWFmQXV0b1dpZHRoKVxuICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubGVhZkF1dG9XaWR0aCA9IHZhbHVlO1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XG4gICAgICAgIH0pKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoJ0xlYWYgV2lkdGgnKVxuICAgICAgLnNldERlc2MoJ1RoZSB3aWR0aCBvZiBhIHNpbmdsZSBwYW5lIChvbmx5IGlmIGF1dG8gd2lkdGggaXMgb2ZmKScpXG4gICAgICAuYWRkVGV4dCh0ZXh0ID0+IHRleHQuc2V0UGxhY2Vob2xkZXIoJ0V4YW1wbGU6IDcwMCcpXG4gICAgICAgIC5zZXRWYWx1ZSgodGhpcy5wbHVnaW4uc2V0dGluZ3MubGVhZldpZHRoIHx8ICcnKSArICcnKVxuICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubGVhZldpZHRoID0gcGFyc2VJbnQodmFsdWUudHJpbSgpKTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG4gICAgICAgICAgdGhpcy5wbHVnaW4ucmVmcmVzaCgpO1xuICAgICAgICB9KSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiVG9nZ2xlIHJvdGF0ZWQgaGVhZGVyc1wiKVxuICAgICAgLnNldERlc2MoXCJSb3RhdGVzIGhlYWRlcnMgdG8gdXNlIGFzIHNwaW5lc1wiKVxuICAgICAgLmFkZFRvZ2dsZSh0b2dnbGUgPT4gdG9nZ2xlLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnJvdGF0ZUhlYWRlcnMpXG4gICAgICAgIC5vbkNoYW5nZSgodmFsdWUpID0+IHtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5yb3RhdGVIZWFkZXJzID0gdmFsdWU7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xuICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcbiAgICAgICAgfSkpO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIlN3YXAgcm90YXRlZCBoZWFkZXIgZGlyZWN0aW9uXCIpXG4gICAgICAuc2V0RGVzYyhcIlN3YXBzIHRoZSBkaXJlY3Rpb24gb2Ygcm90YXRlZCBoZWFkZXJzXCIpXG4gICAgICAuYWRkVG9nZ2xlKHRvZ2dsZSA9PiB0b2dnbGUuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuaGVhZGVyQWx0KVxuICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuaGVhZGVyQWx0ID0gdmFsdWU7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xuICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcbiAgICAgICAgfSkpO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgLnNldE5hbWUoXCJIZWFkZXIgdGV4dCBvcmllbnRhdGlvblwiKVxuICAgIC5zZXREZXNjKFwiU2VsZWN0IHRoZSBoZWFkZXIgdGV4dCBvcmllbnRhdGlvblwiKVxuICAgIC5hZGREcm9wZG93bigoZHJvcGRvd24pID0+IHtcbiAgICAgIGRyb3Bkb3duLmFkZE9wdGlvbihcInNpZGV3YXlcIiwgXCJTaWRld2F5XCIpXG4gICAgICBkcm9wZG93bi5hZGRPcHRpb24oXCJtaXhlZFwiLCBcIk1peGVkXCIpXG4gICAgICBkcm9wZG93bi5hZGRPcHRpb24oXCJ1cHJpZ2h0XCIsIFwiVXByaWdodFwiKVxuICAgICAgZHJvcGRvd24uc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Mub3JpZW5hdGlvbilcbiAgICAgIGRyb3Bkb3duLm9uQ2hhbmdlKCh2YWx1ZTogT3JpZW50YXRpb24pID0+IHtcbiAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Mub3JpZW5hdGlvbiA9IHZhbHVlO1xuICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG4gICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcbiAgICAgIH0pfSk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiVG9nZ2xlIHN0YWNraW5nXCIpXG4gICAgICAuc2V0RGVzYyhcIlBhbmVzIHdpbGwgc3RhY2sgdXAgdG8gdGhlIGxlZnQgYW5kIHJpZ2h0XCIpXG4gICAgICAuYWRkVG9nZ2xlKHRvZ2dsZSA9PiB0b2dnbGUuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc3RhY2tpbmdFbmFibGVkKVxuICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Muc3RhY2tpbmdFbmFibGVkID0gdmFsdWU7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xuICAgICAgICAgIHRoaXMucGx1Z2luLnJlZnJlc2goKTtcbiAgICAgICAgfSkpO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZSgnU3BpbmUgV2lkdGgnKVxuICAgICAgLnNldERlc2MoJ1RoZSB3aWR0aCBvZiB0aGUgcm90YXRlZCBoZWFkZXIgKG9yIGdhcCkgZm9yIHN0YWNraW5nJylcbiAgICAgIC5hZGRUZXh0KHRleHQgPT4gdGV4dC5zZXRQbGFjZWhvbGRlcignRXhhbXBsZTogMzInKVxuICAgICAgICAuc2V0VmFsdWUoKHRoaXMucGx1Z2luLnNldHRpbmdzLmhlYWRlcldpZHRoIHx8ICcnKSArICcnKVxuICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MuaGVhZGVyV2lkdGggPSBwYXJzZUludCh2YWx1ZS50cmltKCkpO1xuICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcbiAgICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XG4gICAgICAgIH0pKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2xpZGluZ1BhbmVzQ29tbWFuZHMge1xuICBwbHVnaW46IFNsaWRpbmdQYW5lc1BsdWdpbjtcbiAgY29uc3RydWN0b3IocGx1Z2luOiBTbGlkaW5nUGFuZXNQbHVnaW4pIHtcbiAgICB0aGlzLnBsdWdpbiA9IHBsdWdpbjtcbiAgfVxuXG4gIGFkZFRvZ2dsZVNldHRpbmdDb21tYW5kKGlkOnN0cmluZywgbmFtZTpzdHJpbmcsIHNldHRpbmdOYW1lOnN0cmluZykge1xuICAgIHRoaXMucGx1Z2luLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6IGlkLFxuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgIC8vIHN3aXRjaCB0aGUgc2V0dGluZywgc2F2ZSBhbmQgcmVmcmVzaFxuICAgICAgICAvL0B0cy1pZ25vcmVcbiAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3Nbc2V0dGluZ05hbWVdID0gIXRoaXMucGx1Z2luLnNldHRpbmdzW3NldHRpbmdOYW1lXTtcbiAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xuICAgICAgICB0aGlzLnBsdWdpbi5yZWZyZXNoKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBhZGRDb21tYW5kcygpOiB2b2lkIHtcbiAgICAvLyBhZGQgdGhlIHRvZ2dsZSBvbi9vZmYgY29tbWFuZFxuICAgIHRoaXMucGx1Z2luLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6ICd0b2dnbGUtc2xpZGluZy1wYW5lcycsXG4gICAgICBuYW1lOiAnVG9nZ2xlIFNsaWRpbmcgUGFuZXMnLFxuICAgICAgY2FsbGJhY2s6ICgpID0+IHtcbiAgICAgICAgLy8gc3dpdGNoIHRoZSBkaXNhYmxlZCBzZXR0aW5nIGFuZCBzYXZlXG4gICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmRpc2FibGVkID0gIXRoaXMucGx1Z2luLnNldHRpbmdzLmRpc2FibGVkO1xuICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG5cbiAgICAgICAgLy8gZGlzYWJsZSBvciBlbmFibGUgYXMgbmVjZXNzYXJ5XG4gICAgICAgIHRoaXMucGx1Z2luLnNldHRpbmdzLmRpc2FibGVkID8gdGhpcy5wbHVnaW4uZGlzYWJsZSgpIDogdGhpcy5wbHVnaW4uZW5hYmxlKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBhZGQgYSBjb21tYW5kIHRvIHRvZ2dsZSBzbW9vdGggYW5pbWF0aW9uXG4gICAgdGhpcy5hZGRUb2dnbGVTZXR0aW5nQ29tbWFuZCgndG9nZ2xlLXNsaWRpbmctcGFuZXMtc21vb3RoLWFuaW1hdGlvbicsICdUb2dnbGUgU21vb3RoIEFuaW1hdGlvbicsICdzbW9vdGhBbmltYXRpb24nKTtcblxuICAgIC8vIGFkZCBhIGNvbW1hbmQgdG8gdG9nZ2xlIGxlYWYgYXV0byB3aWR0aFxuICAgIHRoaXMuYWRkVG9nZ2xlU2V0dGluZ0NvbW1hbmQoJ3RvZ2dsZS1zbGlkaW5nLXBhbmVzLWxlYWYtYXV0by13aWR0aCcsICdUb2dnbGUgTGVhZiBBdXRvIFdpZHRoJywgJ2xlYWZBdXRvV2lkdGgnKTtcbiAgICBcbiAgICAvLyBhZGQgYSBjb21tYW5kIHRvIHRvZ2dsZSBzdGFja2luZ1xuICAgIHRoaXMuYWRkVG9nZ2xlU2V0dGluZ0NvbW1hbmQoJ3RvZ2dsZS1zbGlkaW5nLXBhbmVzLXN0YWNraW5nJywgJ1RvZ2dsZSBTdGFja2luZycsICdzdGFja2luZ0VuYWJsZWQnKTtcblxuICAgIC8vIGFkZCBhIGNvbW1hbmQgdG8gdG9nZ2xlIHJvdGF0ZWQgaGVhZGVyc1xuICAgIHRoaXMuYWRkVG9nZ2xlU2V0dGluZ0NvbW1hbmQoJ3RvZ2dsZS1zbGlkaW5nLXBhbmVzLXJvdGF0ZWQtaGVhZGVycycsICdUb2dnbGUgUm90YXRlZCBIZWFkZXJzJywgJ3JvdGF0ZUhlYWRlcnMnKTtcblxuICAgIC8vIGFkZCBhIGNvbW1hbmQgdG8gdG9nZ2xlIHN3YXBwZWQgaGVhZGVyIGRpcmVjdGlvblxuICAgIHRoaXMuYWRkVG9nZ2xlU2V0dGluZ0NvbW1hbmQoJ3RvZ2dsZS1zbGlkaW5nLXBhbmVzLWhlYWRlci1hbHQnLCAnU3dhcCByb3RhdGVkIGhlYWRlciBkaXJlY3Rpb24nLCAnaGVhZGVyQWx0Jyk7XG4gIH1cbn0iLCJpbXBvcnQgJy4vc3R5bGVzLnNjc3MnXG5pbXBvcnQgeyBGaWxlVmlldywgUGx1Z2luLCBUQWJzdHJhY3RGaWxlLCBXb3Jrc3BhY2VMZWFmLCBXb3Jrc3BhY2VJdGVtLCBXb3Jrc3BhY2VTcGxpdCB9IGZyb20gJ29ic2lkaWFuJztcbmltcG9ydCB7IFdvcmtzcGFjZUl0ZW1FeHQgfSBmcm9tICcuL29ic2lkaWFuLWV4dCc7XG5pbXBvcnQgeyBFZGl0b3IsIFBvc2l0aW9uLCBUb2tlbiB9IGZyb20gJ2NvZGVtaXJyb3InO1xuaW1wb3J0IHsgU2xpZGluZ1BhbmVzU2V0dGluZ3MsIFNsaWRpbmdQYW5lc1NldHRpbmdUYWIsIFNsaWRpbmdQYW5lc0NvbW1hbmRzLCBPcmllbnRhdGlvbiB9IGZyb20gJy4vc2V0dGluZ3MnO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNsaWRpbmdQYW5lc1BsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG4gIHNldHRpbmdzOiBTbGlkaW5nUGFuZXNTZXR0aW5ncztcblxuICAvLyBoZWxwZXIgdmFyaWFibGVzXG4gIHByaXZhdGUgYWN0aXZlTGVhZkluZGV4OiBudW1iZXIgPSAwO1xuXG4gIC8vIGhlbHBlciBnZXRzIGZvciBhbnkgY2FzdHMgKGZvciB1bmRvY3VtZW50ZWQgQVBJIHN0dWZmKVxuICBwcml2YXRlIGdldCByb290U3BsaXQoKTogV29ya3NwYWNlU3BsaXQgeyByZXR1cm4gdGhpcy5hcHAud29ya3NwYWNlLnJvb3RTcGxpdDsgfVxuICBwcml2YXRlIGdldCByb290U3BsaXRBbnkoKTogYW55IHsgcmV0dXJuIHRoaXMucm9vdFNwbGl0IGFzIGFueTsgfVxuICBwcml2YXRlIGdldCByb290Q29udGFpbmVyRWwoKTogSFRNTEVsZW1lbnQgeyByZXR1cm4gKHRoaXMuYXBwLndvcmtzcGFjZS5yb290U3BsaXQgYXMgV29ya3NwYWNlSXRlbSBhcyBXb3Jrc3BhY2VJdGVtRXh0KS5jb250YWluZXJFbDsgfVxuICBwcml2YXRlIGdldCByb290TGVhdmVzKCk6IFdvcmtzcGFjZUxlYWZbXSB7XG4gICAgY29uc3Qgcm9vdENvbnRhaW5lckVsID0gdGhpcy5yb290Q29udGFpbmVyRWw7XG4gICAgbGV0IHJvb3RMZWF2ZXM6IFdvcmtzcGFjZUxlYWZbXSA9IFtdO1xuICAgIHRoaXMuYXBwLndvcmtzcGFjZS5pdGVyYXRlUm9vdExlYXZlcygobGVhZjogYW55KSA9PiB7XG4gICAgICBpZiAobGVhZi5jb250YWluZXJFbC5wYXJlbnRFbGVtZW50ID09PSByb290Q29udGFpbmVyRWwpIHtcbiAgICAgICAgcm9vdExlYXZlcy5wdXNoKGxlYWYpO1xuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHJvb3RMZWF2ZXM7XG4gIH1cbiAgcHJpdmF0ZSBwcmV2Um9vdExlYXZlczogV29ya3NwYWNlTGVhZltdID0gW107XG5cbiAgLy8gd2hlbiB0aGUgcGx1Z2luIGlzIGxvYWRlZFxuICBhc3luYyBvbmxvYWQoKSB7XG4gICAgLy8gbG9hZCBzZXR0aW5nc1xuICAgIHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKG5ldyBTbGlkaW5nUGFuZXNTZXR0aW5ncygpLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xuXG4gICAgLy8gaWYgaXQncyBub3QgZGlzYWJsZWQgaW4gdGhlIHNldHRpbmdzLCBlbmFibGUgaXRcbiAgICBpZiAoIXRoaXMuc2V0dGluZ3MuZGlzYWJsZWQpIHRoaXMuZW5hYmxlKCk7XG5cbiAgICAvLyBhZGQgdGhlIHNldHRpbmdzIHRhYlxuICAgIHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgU2xpZGluZ1BhbmVzU2V0dGluZ1RhYih0aGlzLmFwcCwgdGhpcykpO1xuICAgIC8vIGFkZCB0aGUgY29tbWFuZHNcbiAgICBuZXcgU2xpZGluZ1BhbmVzQ29tbWFuZHModGhpcykuYWRkQ29tbWFuZHMoKTtcbiAgfVxuXG4gIC8vIG9uIHVubG9hZCwgcGVyZm9ybSB0aGUgc2FtZSBzdGVwcyBhcyBkaXNhYmxlXG4gIG9udW5sb2FkKCkge1xuICAgIHRoaXMuZGlzYWJsZSgpO1xuICB9XG5cbiAgLy8gZW5hYmxlIGFuZHkgbW9kZVxuICBlbmFibGUgPSAoKSA9PiB7XG4gICAgLy8gYWRkIHRoZSBldmVudCBoYW5kbGVyc1xuICAgIHRoaXMucmVnaXN0ZXJFdmVudCh0aGlzLmFwcC53b3Jrc3BhY2Uub24oJ3Jlc2l6ZScsIHRoaXMuaGFuZGxlUmVzaXplKSk7XG4gICAgdGhpcy5yZWdpc3RlckV2ZW50KHRoaXMuYXBwLndvcmtzcGFjZS5vbignbGF5b3V0LWNoYW5nZScsIHRoaXMuaGFuZGxlTGF5b3V0Q2hhbmdlKSk7XG4gICAgdGhpcy5yZWdpc3RlckV2ZW50KHRoaXMuYXBwLndvcmtzcGFjZS5vbignZmlsZS1vcGVuJywgdGhpcy5oYW5kbGVGaWxlT3BlbikpO1xuICAgIHRoaXMucmVnaXN0ZXJFdmVudCh0aGlzLmFwcC52YXVsdC5vbignZGVsZXRlJywgdGhpcy5oYW5kbGVEZWxldGUpKTtcblxuICAgIC8vIHdhaXQgZm9yIGxheW91dCB0byBiZSByZWFkeSB0byBwZXJmb3JtIHRoZSByZXN0XG4gICAgdGhpcy5hcHAud29ya3NwYWNlLmxheW91dFJlYWR5ID8gdGhpcy5yZWFsbHlFbmFibGUoKSA6IHRoaXMuYXBwLndvcmtzcGFjZS5vbignbGF5b3V0LXJlYWR5JywgdGhpcy5yZWFsbHlFbmFibGUpO1xuICB9XG5cbiAgLy8gcmVhbGx5IGVuYWJsZSB0aGluZ3MgKG9uY2UgdGhlIGxheW91dCBpcyByZWFkeSlcbiAgcmVhbGx5RW5hYmxlID0gKCkgPT4ge1xuICAgIC8vIHdlIGRvbid0IG5lZWQgdGhlIGV2ZW50IGhhbmRsZXIgYW55bW9yZVxuICAgIHRoaXMuYXBwLndvcmtzcGFjZS5vZmYoJ2xheW91dC1yZWFkeScsIHRoaXMucmVhbGx5RW5hYmxlKTtcblxuICAgIC8vIGJhY2t1cCB0aGUgZnVuY3Rpb24gc28gSSBjYW4gcmVzdG9yZSBpdFxuICAgIHRoaXMucm9vdFNwbGl0QW55Lm9sZE9uQ2hpbGRSZXNpemVTdGFydCA9IHRoaXMucm9vdFNwbGl0QW55Lm9uQ2hpbGRSZXNpemVTdGFydDtcbiAgICB0aGlzLnJvb3RTcGxpdEFueS5vbkNoaWxkUmVzaXplU3RhcnQgPSB0aGlzLm9uQ2hpbGRSZXNpemVTdGFydDtcblxuICAgIC8vIGFkZCBzb21lIGV4dHJhIGNsYXNzZXMgdGhhdCBjYW4ndCBmaXQgaW4gdGhlIHN0eWxlcy5jc3NcbiAgICAvLyBiZWNhdXNlIHRoZXkgdXNlIHNldHRpbmdzXG4gICAgdGhpcy5hZGRTdHlsZSgpO1xuXG4gICAgLy8gZG8gYWxsIHRoZSBjYWx1Y2F0aW9ucyBuZWNlc3NhcnkgZm9yIHRoZSB3b3Jrc3BhY2UgbGVhdmVzXG4gICAgdGhpcy5yZWNhbGN1bGF0ZUxlYXZlcygpO1xuICB9XG5cbiAgLy8gc2h1dCBkb3duIGFuZHkgbW9kZVxuICBkaXNhYmxlID0gKCkgPT4ge1xuXG4gICAgLy8gZ2V0IHJpZCBvZiB0aGUgZXh0cmEgc3R5bGUgdGFnIHdlIGFkZGVkXG4gICAgdGhpcy5yZW1vdmVTdHlsZSgpO1xuXG4gICAgLy8gaXRlcmF0ZSB0aHJvdWdoIHRoZSByb290IGxlYXZlcyB0byByZW1vdmUgdGhlIHN0dWZmIHdlIGFkZGVkXG4gICAgdGhpcy5yb290TGVhdmVzLmZvckVhY2godGhpcy5jbGVhckxlYWYpO1xuXG4gICAgLy8gcmVzdG9yZSB0aGUgZGVmYXVsdCBmdW5jdGlvbmFsaXR5XG4gICAgdGhpcy5yb290U3BsaXRBbnkub25DaGlsZFJlc2l6ZVN0YXJ0ID0gdGhpcy5yb290U3BsaXRBbnkub2xkT25DaGlsZFJlc2l6ZVN0YXJ0O1xuICB9XG5cbiAgY2xlYXJMZWFmID0gKGxlYWY6IGFueSkgPT4ge1xuICAgIGxlYWYuY29udGFpbmVyRWwuc3R5bGUud2lkdGggPSBudWxsO1xuICAgIGxlYWYuY29udGFpbmVyRWwuc3R5bGUubGVmdCA9IG51bGw7XG4gICAgbGVhZi5jb250YWluZXJFbC5zdHlsZS5yaWdodCA9IG51bGw7XG4gICAgbGVhZi5jb250YWluZXJFbC5jbGFzc0xpc3QucmVtb3ZlKCdtb2QtYW0tbGVmdC1vZi1hY3RpdmUnKTtcbiAgICBsZWFmLmNvbnRhaW5lckVsLmNsYXNzTGlzdC5yZW1vdmUoJ21vZC1hbS1yaWdodC1vZi1hY3RpdmUnKTtcblxuICAgIGNvbnN0IGljb25FbCA9IChsZWFmLnZpZXcgYXMgYW55KS5pY29uRWw7XG4gICAgY29uc3QgaWNvblRleHQ6c3RyaW5nID0gaWNvbkVsLmdldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIik7XG4gICAgaWYgKGljb25UZXh0LmluY2x1ZGVzKFwiKFwiKSkge1xuICAgICAgaWNvbkVsLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgaWNvblRleHQuc3Vic3RyaW5nKGljb25UZXh0Lmxhc3RJbmRleE9mKCcoJykgKyAxLCBpY29uVGV4dC5sYXN0SW5kZXhPZignKScpKSk7XG4gICAgfVxuICB9XG5cbiAgLy8gcmVmcmVzaCBmdW5jaW9uIGZvciB3aGVuIHdlIGNoYW5nZSBzZXR0aW5nc1xuICByZWZyZXNoID0gKCkgPT4ge1xuICAgIC8vIHJlLWxvYWQgdGhlIHN0eWxlXG4gICAgdGhpcy51cGRhdGVTdHlsZSgpXG4gICAgLy8gcmVjYWxjdWxhdGUgbGVhZiBwb3NpdGlvbnNcbiAgICB0aGlzLnJlY2FsY3VsYXRlTGVhdmVzKCk7XG4gIH1cblxuICAvLyByZW1vdmUgdGhlIHN0bHlpbmcgZWxlbWVudHMgd2UndmUgY3JlYXRlZFxuICByZW1vdmVTdHlsZSA9ICgpID0+IHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbHVnaW4tc2xpZGluZy1wYW5lcycpO1xuICAgIGlmIChlbCkgZWwucmVtb3ZlKCk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdwbHVnaW4tc2xpZGluZy1wYW5lcycpO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncGx1Z2luLXNsaWRpbmctcGFuZXMtcm90YXRlLWhlYWRlcicpO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncGx1Z2luLXNsaWRpbmctcGFuZXMtaGVhZGVyLWFsdCcpO1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncGx1Z2luLXNsaWRpbmctcGFuZXMtc3RhY2tpbmcnKTtcbiAgfVxuXG4gIC8vIGFkZCB0aGUgc3R5bGluZyBlbGVtZW50cyB3ZSBuZWVkXG4gIGFkZFN0eWxlID0gKCkgPT4ge1xuICAgIC8vIGFkZCBhIGNzcyBibG9jayBmb3Igb3VyIHNldHRpbmdzLWRlcGVuZGVudCBzdHlsZXNcbiAgICBjb25zdCBjc3MgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgIGNzcy5pZCA9ICdwbHVnaW4tc2xpZGluZy1wYW5lcyc7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKGNzcyk7XG5cbiAgICAvLyBhZGQgdGhlIG1haW4gY2xhc3NcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3BsdWdpbi1zbGlkaW5nLXBhbmVzJyk7XG5cbiAgICAvLyB1cGRhdGUgdGhlIHN0eWxlIHdpdGggdGhlIHNldHRpbmdzLWRlcGVuZGVudCBzdHlsZXNcbiAgICB0aGlzLnVwZGF0ZVN0eWxlKCk7XG4gIH1cblxuICAvLyB1cGRhdGUgdGhlIHN0eWxlcyAoYXQgdGhlIHN0YXJ0LCBvciBhcyB0aGUgcmVzdWx0IG9mIGEgc2V0dGluZ3MgY2hhbmdlKVxuICB1cGRhdGVTdHlsZSA9ICgpID0+IHtcbiAgICAvLyBpZiB3ZSd2ZSBnb3Qgcm90YXRlIGhlYWRlcnMgb24sIGFkZCB0aGUgY2xhc3Mgd2hpY2ggZW5hYmxlcyBpdFxuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgncGx1Z2luLXNsaWRpbmctcGFuZXMtcm90YXRlLWhlYWRlcicsIHRoaXMuc2V0dGluZ3Mucm90YXRlSGVhZGVycyk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdwbHVnaW4tc2xpZGluZy1wYW5lcy1oZWFkZXItYWx0JywgdGhpcy5zZXR0aW5ncy5oZWFkZXJBbHQpXG4gICAgLy8gZG8gdGhlIHNhbWUgZm9yIHN0YWNraW5nXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdwbHVnaW4tc2xpZGluZy1wYW5lcy1zdGFja2luZycsIHRoaXMuc2V0dGluZ3Muc3RhY2tpbmdFbmFibGVkKTtcbiAgICBcbiAgICAvLyBnZXQgdGhlIGN1c3RvbSBjc3MgZWxlbWVudFxuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsdWdpbi1zbGlkaW5nLXBhbmVzJyk7XG4gICAgaWYgKCFlbCkgdGhyb3cgXCJwbHVnaW4tc2xpZGluZy1wYW5lcyBlbGVtZW50IG5vdCBmb3VuZCFcIjtcbiAgICBlbHNlIHtcbiAgICAgIC8vIHNldCB0aGUgc2V0dGluZ3MtZGVwZW5kZW50IGNzc1xuICAgICAgZWwuaW5uZXJUZXh0ID0gYGJvZHkucGx1Z2luLXNsaWRpbmctcGFuZXN7LS1oZWFkZXItd2lkdGg6JHt0aGlzLnNldHRpbmdzLmhlYWRlcldpZHRofXB4O31gO1xuICAgICAgaWYgKCF0aGlzLnNldHRpbmdzLmxlYWZBdXRvV2lkdGgpIHtcbiAgICAgICAgZWwuaW5uZXJUZXh0ICs9IGBib2R5LnBsdWdpbi1zbGlkaW5nLXBhbmVzIC5tb2Qtcm9vdD4ud29ya3NwYWNlLWxlYWZ7d2lkdGg6JHt0aGlzLnNldHRpbmdzLmxlYWZXaWR0aCArIHRoaXMuc2V0dGluZ3MuaGVhZGVyV2lkdGh9cHg7fWA7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIGlmICh0aGlzLnNldHRpbmdzLnJvdGF0ZUhlYWRlcnMpe1xuICAgICAgdGhpcy5zZWxlY3RPcmllbnRhdGlvbih0aGlzLnNldHRpbmdzLm9yaWVuYXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIHNlbGVjdE9yaWVudGF0aW9uKG9yaWVudDogT3JpZW50YXRpb24pIHtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ3BsdWdpbi1zbGlkaW5nLXNlbGVjdC1vcmllbnRhdGlvbi1taXhlZCcsIG9yaWVudCA9PSAnbWl4ZWQnKTtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC50b2dnbGUoJ3BsdWdpbi1zbGlkaW5nLXNlbGVjdC1vcmllbnRhdGlvbi11cHJpZ2h0Jywgb3JpZW50ID09ICd1cHJpZ2h0Jyk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QudG9nZ2xlKCdwbHVnaW4tc2xpZGluZy1zZWxlY3Qtb3JpZW50YXRpb24tc2lkZXdheScsIG9yaWVudCA9PSAnc2lkZXdheScpO1xuICB9XG5cbiAgaGFuZGxlUmVzaXplID0gKCkgPT4ge1xuICAgIGlmICh0aGlzLmFwcC53b3Jrc3BhY2UubGF5b3V0UmVhZHkpIHtcbiAgICAgIHRoaXMucmVjYWxjdWxhdGVMZWF2ZXMoKTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVMYXlvdXRDaGFuZ2UgPSAoKSA9PiB7XG4gICAgY29uc3Qgcm9vdExlYXZlcyA9IHRoaXMucm9vdExlYXZlcztcbiAgICBpZiAocm9vdExlYXZlcy5sZW5ndGggPCB0aGlzLnByZXZSb290TGVhdmVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5wcmV2Um9vdExlYXZlcy5mb3JFYWNoKChsZWFmOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKCFyb290TGVhdmVzLmNvbnRhaW5zKGxlYWYpKSB7XG4gICAgICAgICAgdGhpcy5jbGVhckxlYWYobGVhZik7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIHRoaXMucHJldlJvb3RMZWF2ZXMgPSB0aGlzLnJvb3RMZWF2ZXM7XG4gICAgLy90aGlzLnJlY2FsY3VsYXRlTGVhdmVzKCk7XG4gIH1cblxuICAvLyBSZWNhbGN1bGF0ZSB0aGUgbGVhZiBzaXppbmcgYW5kIHBvc2l0aW9uc1xuICByZWNhbGN1bGF0ZUxlYXZlcyA9ICgpID0+IHtcbiAgICAvLyByb290U3BsaXQuY2hpbGRyZW4gaXMgdW5kb2N1bWVudGVkIGZvciBub3csIGJ1dCBpdCdzIGVhc2llciB0byB1c2UgZm9yIHdoYXQgd2UncmUgZG9pbmcuXG4gICAgLy8gd2Ugb25seSB3YW50IGxlYXZlcyBhdCB0aGUgcm9vdCBvZiB0aGUgcm9vdCBzcGxpdFxuICAgIC8vICh0aGlzIGlzIHRvIGZpeCBjb21wYXRpYmlsaXR5IHdpdGggYmFja2xpbmtzIGluIGRvY3VtZW50IGFuZCBvdGhlciBzdWNoIHBsdWdpbnMpXG4gICAgY29uc3Qgcm9vdENvbnRhaW5lckVsID0gdGhpcy5yb290Q29udGFpbmVyRWw7XG4gICAgY29uc3Qgcm9vdExlYXZlcyA9IHRoaXMucm9vdExlYXZlcztcbiAgICBjb25zdCBsZWFmQ291bnQgPSByb290TGVhdmVzLmxlbmd0aDtcblxuICAgIGxldCB0b3RhbFdpZHRoID0gMDtcblxuICAgIC8vIGl0ZXJhdGUgdGhyb3VnaCBhbGwgdGhlIHJvb3QtbGV2ZWwgbGVhdmVzXG4gICAgbGV0IHdpZHRoQ2hhbmdlID0gZmFsc2U7XG4gICAgcm9vdExlYXZlcy5mb3JFYWNoKChsZWFmOiBXb3Jrc3BhY2VMZWFmLCBpOiBudW1iZXIpID0+IHtcblxuICAgICAgLy8gQHRzLWlnbm9yZSB0byBnZXQgdGhlIHVuZG9jdW1lbnRlZCBjb250YWluZXJFbFxuICAgICAgY29uc3QgY29udGFpbmVyRWwgPSBsZWFmLmNvbnRhaW5lckVsO1xuXG4gICAgICBjb250YWluZXJFbC5zdHlsZS5mbGV4ID0gbnVsbDtcbiAgICAgIGNvbnN0IG9sZFdpZHRoID0gY29udGFpbmVyRWwuY2xpZW50V2lkdGg7XG4gICAgICBpZiAodGhpcy5zZXR0aW5ncy5sZWFmQXV0b1dpZHRoKSB7XG4gICAgICAgIGNvbnRhaW5lckVsLnN0eWxlLndpZHRoID0gKHJvb3RDb250YWluZXJFbC5jbGllbnRXaWR0aCAtICgobGVhZkNvdW50IC0gMSkgKiB0aGlzLnNldHRpbmdzLmhlYWRlcldpZHRoKSkgKyBcInB4XCI7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29udGFpbmVyRWwuc3R5bGUud2lkdGggPSBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKG9sZFdpZHRoID09IGNvbnRhaW5lckVsLmNsaWVudFdpZHRoKSB3aWR0aENoYW5nZSA9IHRydWU7XG5cbiAgICAgIGNvbnRhaW5lckVsLnN0eWxlLmxlZnQgPSB0aGlzLnNldHRpbmdzLnN0YWNraW5nRW5hYmxlZFxuICAgICAgICA/IChpICogdGhpcy5zZXR0aW5ncy5oZWFkZXJXaWR0aCkgKyBcInB4XCJcbiAgICAgICAgOiBudWxsO1xuICAgICAgY29udGFpbmVyRWwuc3R5bGUucmlnaHQgPSB0aGlzLnNldHRpbmdzLnN0YWNraW5nRW5hYmxlZFxuICAgICAgICA/ICgoKGxlYWZDb3VudCAtIGkpICogdGhpcy5zZXR0aW5ncy5oZWFkZXJXaWR0aCkgLSBjb250YWluZXJFbC5jbGllbnRXaWR0aCkgKyBcInB4XCJcbiAgICAgICAgOiBudWxsO1xuICAgICAgLy8ga2VlcCB0cmFjayBvZiB0aGUgdG90YWwgd2lkdGggb2YgYWxsIGxlYXZlc1xuICAgICAgdG90YWxXaWR0aCArPSBjb250YWluZXJFbC5jbGllbnRXaWR0aDtcblxuICAgICAgY29uc3QgaWNvbkVsID0gKGxlYWYudmlldyBhcyBhbnkpLmljb25FbDtcbiAgICAgIGNvbnN0IGljb25UZXh0ID0gaWNvbkVsLmdldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIik7XG4gICAgICBpZiAoIWljb25UZXh0LmluY2x1ZGVzKFwiKFwiKSkge1xuICAgICAgICBpY29uRWwuc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCBgJHtsZWFmLmdldERpc3BsYXlUZXh0KCl9ICgke2ljb25UZXh0fSlgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIGlmIHRoZSB0b3RhbCB3aWR0aCBvZiBhbGwgbGVhdmVzIGlzIGxlc3MgdGhhbiB0aGUgd2lkdGggYXZhaWxhYmxlLFxuICAgIC8vIGFkZCBiYWNrIHRoZSBmbGV4IGNsYXNzIHNvIHRoZXkgZmlsbCB0aGUgc3BhY2VcbiAgICBpZiAodG90YWxXaWR0aCA8IHJvb3RDb250YWluZXJFbC5jbGllbnRXaWR0aCkge1xuICAgICAgcm9vdExlYXZlcy5mb3JFYWNoKChsZWFmOiBhbnkpID0+IHtcbiAgICAgICAgbGVhZi5jb250YWluZXJFbC5zdHlsZS5mbGV4ID0gJzEgMCAwJztcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmKHdpZHRoQ2hhbmdlKSB0aGlzLmZvY3VzQWN0aXZlTGVhZighdGhpcy5zZXR0aW5ncy5sZWFmQXV0b1dpZHRoKTtcbiAgfVxuXG4gIC8vIHRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkLCBub3Qgb25seSB3aGVuIGEgZmlsZSBvcGVucywgYnV0IHdoZW4gdGhlIGFjdGl2ZSBwYW5lIGlzIHN3aXRjaGVkXG4gIGhhbmRsZUZpbGVPcGVuID0gKGU6IGFueSk6IHZvaWQgPT4ge1xuICAgIC8vIHB1dCBhIHNtYWxsIHRpbWVvdXQgb24gaXQgYmVjYXVzZSB3aGVuIGEgZmlsZSBpcyBvcGVuZWQgb24gdGhlIGZhciByaWdodCBcbiAgICAvLyBpdCB3YXNuJ3QgZm9jdXNzaW5nIHByb3Blcmx5LiBUaGUgdGltZW91dCBmaXhlcyB0aGlzXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvLyBmb2N1cyBvbiB0aGUgbmV3bHkgc2VsZWN0ZWQgbGVhZlxuICAgICAgdGhpcy5mb2N1c0FjdGl2ZUxlYWYoKTtcbiAgICB9LCAxMCk7XG4gIH07XG5cbiAgZm9jdXNBY3RpdmVMZWFmKGFuaW1hdGVkOiBib29sZWFuID0gdHJ1ZSkge1xuICAgIC8vIGdldCBiYWNrIHRvIHRoZSBsZWFmIHdoaWNoIGhhcyBiZWVuIGFuZHknZCAoYGFueWAgYmVjYXVzZSBwYXJlbnRTcGxpdCBpcyB1bmRvY3VtZW50ZWQpXG4gICAgbGV0IGFjdGl2ZUxlYWY6IFdvcmtzcGFjZUl0ZW1FeHQgPSB0aGlzLmFwcC53b3Jrc3BhY2UuYWN0aXZlTGVhZiBhcyBXb3Jrc3BhY2VJdGVtIGFzIFdvcmtzcGFjZUl0ZW1FeHQ7XG4gICAgd2hpbGUgKGFjdGl2ZUxlYWYgIT0gbnVsbCAmJiBhY3RpdmVMZWFmLnBhcmVudFNwbGl0ICE9IG51bGwgJiYgYWN0aXZlTGVhZi5wYXJlbnRTcGxpdCAhPSB0aGlzLmFwcC53b3Jrc3BhY2Uucm9vdFNwbGl0KSB7XG4gICAgICBhY3RpdmVMZWFmID0gYWN0aXZlTGVhZi5wYXJlbnRTcGxpdCBhcyBXb3Jrc3BhY2VJdGVtRXh0O1xuICAgIH1cbiAgICBcbiAgICBpZiAoYWN0aXZlTGVhZiAhPSBudWxsICYmIHRoaXMucm9vdFNwbGl0KSB7XG5cbiAgICAgIGNvbnN0IHJvb3RDb250YWluZXJFbCA9IHRoaXMucm9vdENvbnRhaW5lckVsO1xuICAgICAgY29uc3Qgcm9vdExlYXZlcyA9IHRoaXMucm9vdExlYXZlcztcbiAgICAgIGNvbnN0IGxlYWZDb3VudCA9IHJvb3RMZWF2ZXMubGVuZ3RoO1xuXG4gICAgICAvLyBnZXQgdGhlIGluZGV4IG9mIHRoZSBhY3RpdmUgbGVhZlxuICAgICAgLy8gYWxzbywgZ2V0IHRoZSBwb3NpdGlvbiBvZiB0aGlzIGxlYWYsIHNvIHdlIGNhbiBzY3JvbGwgdG8gaXRcbiAgICAgIC8vIGFzIGxlYXZlcyBhcmUgcmVzaXphYmxlLCB3ZSBoYXZlIHRvIGl0ZXJhdGUgdGhyb3VnaCBhbGwgbGVhdmVzIHRvIHRoZVxuICAgICAgLy8gbGVmdCB1bnRpbCB3ZSBnZXQgdG8gdGhlIGFjdGl2ZSBvbmUgYW5kIGFkZCBhbGwgdGhlaXIgd2lkdGhzIHRvZ2V0aGVyXG4gICAgICBsZXQgcG9zaXRpb24gPSAwO1xuICAgICAgdGhpcy5hY3RpdmVMZWFmSW5kZXggPSAtMTtcbiAgICAgIHJvb3RMZWF2ZXMuZm9yRWFjaCgobGVhZjogV29ya3NwYWNlSXRlbSwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICAvLyBAdHMtaWdub3JlIHRvIGdldCB0aGUgdW5kb2N1bWVudGVkIGNvbnRhaW5lckVsXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lckVsID0gbGVhZi5jb250YWluZXJFbDtcblxuICAgICAgICAvLyB0aGlzIGlzIHRoZSBhY3RpdmUgb25lXG4gICAgICAgIGlmIChsZWFmID09IGFjdGl2ZUxlYWYpIHtcbiAgICAgICAgICB0aGlzLmFjdGl2ZUxlYWZJbmRleCA9IGluZGV4O1xuICAgICAgICAgIGNvbnRhaW5lckVsLmNsYXNzTGlzdC5yZW1vdmUoJ21vZC1hbS1sZWZ0LW9mLWFjdGl2ZScpO1xuICAgICAgICAgIGNvbnRhaW5lckVsLmNsYXNzTGlzdC5yZW1vdmUoJ21vZC1hbS1yaWdodC1vZi1hY3RpdmUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHRoaXMuYWN0aXZlTGVhZkluZGV4ID09IC0xIHx8IGluZGV4IDwgdGhpcy5hY3RpdmVMZWFmSW5kZXgpIHtcbiAgICAgICAgICAvLyB0aGlzIGlzIGJlZm9yZSB0aGUgYWN0aXZlIG9uZSwgYWRkIHRoZSB3aWR0aFxuICAgICAgICAgIHBvc2l0aW9uICs9IGNvbnRhaW5lckVsLmNsaWVudFdpZHRoO1xuICAgICAgICAgIGNvbnRhaW5lckVsLmNsYXNzTGlzdC5hZGQoJ21vZC1hbS1sZWZ0LW9mLWFjdGl2ZScpO1xuICAgICAgICAgIGNvbnRhaW5lckVsLmNsYXNzTGlzdC5yZW1vdmUoJ21vZC1hbS1yaWdodC1vZi1hY3RpdmUnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAvLyB0aGlzIGlzIHJpZ2h0IG9mIHRoZSBhY3RpdmUgb25lXG4gICAgICAgICAgY29udGFpbmVyRWwuY2xhc3NMaXN0LnJlbW92ZSgnbW9kLWFtLWxlZnQtb2YtYWN0aXZlJyk7XG4gICAgICAgICAgY29udGFpbmVyRWwuY2xhc3NMaXN0LmFkZCgnbW9kLWFtLXJpZ2h0LW9mLWFjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgLy8gZ2V0IHRoaXMgbGVhZidzIGxlZnQgdmFsdWUgKHRoZSBhbW91bnQgb2Ygc3BhY2UgdG8gdGhlIGxlZnQgZm9yIHN0aWNreSBoZWFkZXJzKVxuICAgICAgY29uc3QgbGVmdCA9IHBhcnNlSW50KGFjdGl2ZUxlYWYuY29udGFpbmVyRWwuc3R5bGUubGVmdCkgfHwgMDtcbiAgICAgIC8vIHRoZSBhbW91bnQgb2Ygc3BhY2UgdG8gdGhlIHJpZ2h0IHdlIG5lZWQgdG8gbGVhdmUgZm9yIHN0aWNreSBoZWFkZXJzXG4gICAgICBjb25zdCBoZWFkZXJzVG9SaWdodFdpZHRoID0gdGhpcy5zZXR0aW5ncy5zdGFja2luZ0VuYWJsZWQgPyAobGVhZkNvdW50IC0gdGhpcy5hY3RpdmVMZWFmSW5kZXggLSAxKSAqIHRoaXMuc2V0dGluZ3MuaGVhZGVyV2lkdGggOiAwO1xuXG4gICAgICAvLyBkZXRlcm1pbmUgd2hldGhlciB0byByZXF1ZXN0ICdzbW9vdGgnIGFuaW1hdGlvbnMgb3IgJ2F1dG8nIHNuYXBcbiAgICAgIGxldCBiZWhhdmlvcjogU2Nyb2xsQmVoYXZpb3IgPSBhbmltYXRlZCAmJiB0aGlzLnNldHRpbmdzLnNtb290aEFuaW1hdGlvbiA/ICdzbW9vdGgnIDogJ2F1dG8nO1xuXG4gICAgICAvLyBpdCdzIHRvbyBmYXIgbGVmdFxuICAgICAgaWYgKHJvb3RDb250YWluZXJFbC5zY3JvbGxMZWZ0ID4gcG9zaXRpb24gLSBsZWZ0KSB7XG4gICAgICAgIC8vIHNjcm9sbCB0aGUgbGVmdCBzaWRlIG9mIHRoZSBwYW5lIGludG8gdmlld1xuICAgICAgICByb290Q29udGFpbmVyRWwuc2Nyb2xsVG8oeyBsZWZ0OiBwb3NpdGlvbiAtIGxlZnQsIHRvcDogMCwgYmVoYXZpb3I6IGJlaGF2aW9yIH0pO1xuICAgICAgfVxuICAgICAgLy8gaXQncyB0b28gZmFyIHJpZ2h0XG4gICAgICBlbHNlIGlmIChyb290Q29udGFpbmVyRWwuc2Nyb2xsTGVmdCArIHJvb3RDb250YWluZXJFbC5jbGllbnRXaWR0aCA8IHBvc2l0aW9uICsgYWN0aXZlTGVhZi5jb250YWluZXJFbC5jbGllbnRXaWR0aCArIGhlYWRlcnNUb1JpZ2h0V2lkdGgpIHtcbiAgICAgICAgLy8gc2Nyb2xsIHRoZSByaWdodCBzaWRlIG9mIHRoZSBwYW5lIGludG8gdmlld1xuICAgICAgICByb290Q29udGFpbmVyRWwuc2Nyb2xsVG8oeyBsZWZ0OiBwb3NpdGlvbiArIGFjdGl2ZUxlYWYuY29udGFpbmVyRWwuY2xpZW50V2lkdGggKyBoZWFkZXJzVG9SaWdodFdpZHRoIC0gcm9vdENvbnRhaW5lckVsLmNsaWVudFdpZHRoLCB0b3A6IDAsIGJlaGF2aW9yOiBiZWhhdmlvciB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBoYW5kZSB3aGVuIGEgZmlsZSBpcyBkZWxldGVkXG4gIGhhbmRsZURlbGV0ZSA9IChmaWxlOiBUQWJzdHJhY3RGaWxlKSA9PiB7XG4gICAgLy8gY2xvc2UgYW55IGxlYXZlcyB3aXRoIHRoZSBkZWxldGVkIGZpbGUgb3BlblxuICAgIC8vIGRldGFjaGluZyBhIGxlYWYgd2hpbGUgaXRlcmF0aW5nIG1lc3NlcyB3aXRoIHRoZSBpdGVyYXRpb25cbiAgICBjb25zdCBsZWF2ZXNUb0RldGFjaDogV29ya3NwYWNlTGVhZltdID0gW107XG4gICAgdGhpcy5hcHAud29ya3NwYWNlLml0ZXJhdGVSb290TGVhdmVzKChsZWFmOiBXb3Jrc3BhY2VMZWFmKSA9PiB7XG4gICAgICBpZiAobGVhZi52aWV3IGluc3RhbmNlb2YgRmlsZVZpZXcgJiYgbGVhZi52aWV3LmZpbGUgPT0gZmlsZSkge1xuICAgICAgICBsZWF2ZXNUb0RldGFjaC5wdXNoKGxlYWYpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGxlYXZlc1RvRGV0YWNoLmZvckVhY2gobGVhZiA9PiBsZWFmLmRldGFjaCgpKTtcbiAgfTtcblxuICAvLyBvdmVycmlkZW4gZnVuY3Rpb24gZm9yIHJvb3RTcGxpdCBjaGlsZCByZXNpemVcbiAgb25DaGlsZFJlc2l6ZVN0YXJ0ID0gKGxlYWY6IGFueSwgZXZlbnQ6IGFueSkgPT4ge1xuXG4gICAgLy8gb25seSByZWFsbHkgYXBwbHkgdGhpcyB0byB2ZXJ0aWNhbCBzcGxpdHNcbiAgICBpZiAodGhpcy5yb290U3BsaXRBbnkuZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcbiAgICAgIC8vIHRoaXMgaXMgdGhlIHdpZHRoIHRoZSBsZWFmIHN0YXJ0ZWQgYXQgYmVmb3JlIHJlc2l6ZVxuICAgICAgY29uc3Qgc3RhcnRXaWR0aCA9IGxlYWYuY29udGFpbmVyRWwuY2xpZW50V2lkdGg7XG5cbiAgICAgIC8vIHRoZSBtb3VzZW1vdmUgZXZlbnQgdG8gdHJpZ2dlciB3aGlsZSByZXNpemluZ1xuICAgICAgY29uc3QgbW91c2Vtb3ZlID0gKGU6IGFueSkgPT4ge1xuICAgICAgICAvLyBnZXQgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgZmlyc3QgcG9zaXRpb24gYW5kIGN1cnJlbnRcbiAgICAgICAgY29uc3QgZGVsdGFYID0gZS5wYWdlWCAtIGV2ZW50LnBhZ2VYO1xuICAgICAgICAvLyBhZGp1c3QgdGhlIHN0YXJ0IHdpZHRoIGJ5IHRoZSBkZWx0YVxuICAgICAgICBsZWFmLmNvbnRhaW5lckVsLnN0eWxlLndpZHRoID0gYCR7c3RhcnRXaWR0aCArIGRlbHRhWH1weGA7XG4gICAgICB9XG5cbiAgICAgIC8vIHRoZSBtb3VzZXVwIGV2ZW50IHRvIHRyaWdnZXIgYXQgdGhlIGVuZCBvZiByZXNpemluZ1xuICAgICAgY29uc3QgbW91c2V1cCA9ICgpID0+IHtcbiAgICAgICAgLy8gaWYgc3RhY2tpbmcgaXMgZW5hYmxlZCwgd2UgbmVlZCB0byByZS1qaWcgdGhlIFwicmlnaHRcIiB2YWx1ZVxuICAgICAgICBpZiAodGhpcy5zZXR0aW5ncy5zdGFja2luZ0VuYWJsZWQpIHtcbiAgICAgICAgICAvLyB3ZSBuZWVkIHRoZSBsZWFmIGNvdW50IGFuZCBpbmRleCB0byBjYWxjdWxhdGUgdGhlIGNvcnJlY3QgdmFsdWVcbiAgICAgICAgICBjb25zdCByb290TGVhdmVzID0gdGhpcy5yb290TGVhdmVzO1xuICAgICAgICAgIGNvbnN0IGxlYWZDb3VudCA9IHJvb3RMZWF2ZXMubGVuZ3RoO1xuICAgICAgICAgIGNvbnN0IGxlYWZJbmRleCA9IHJvb3RMZWF2ZXMuZmluZEluZGV4KChsOiBhbnkpID0+IGwgPT0gbGVhZik7XG4gICAgICAgICAgbGVhZi5jb250YWluZXJFbC5zdHlsZS5yaWdodCA9ICgoKGxlYWZDb3VudCAtIGxlYWZJbmRleCAtIDEpICogdGhpcy5zZXR0aW5ncy5oZWFkZXJXaWR0aCkgLSBsZWFmLmNvbnRhaW5lckVsLmNsaWVudFdpZHRoKSArIFwicHhcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHJlbW92ZSB0aGVzZSBldmVudCBsaXN0ZW5lcnMuIFdlJ3JlIGRvbmUgd2l0aCB0aGVtXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgbW91c2Vtb3ZlKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgbW91c2V1cCk7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCB0aGUgYWJvdmUgdHdvIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCBtb3VzZW1vdmUpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNldXBcIiwgbW91c2V1cCk7XG4gICAgfVxuICB9XG59XG4iXSwibmFtZXMiOlsiU2V0dGluZyIsIlBsdWdpblNldHRpbmdUYWIiLCJGaWxlVmlldyIsIlBsdWdpbiJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxhQUFhLEdBQUcsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ25DLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxjQUFjO0FBQ3pDLFNBQVMsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFlBQVksS0FBSyxJQUFJLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUNwRixRQUFRLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUMxRyxJQUFJLE9BQU8sYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMvQixDQUFDLENBQUM7QUFDRjtBQUNPLFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDaEMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLFVBQVUsSUFBSSxDQUFDLEtBQUssSUFBSTtBQUM3QyxRQUFRLE1BQU0sSUFBSSxTQUFTLENBQUMsc0JBQXNCLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLCtCQUErQixDQUFDLENBQUM7QUFDbEcsSUFBSSxhQUFhLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3hCLElBQUksU0FBUyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQzNDLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEtBQUssSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN6RixDQUFDO0FBdUNEO0FBQ08sU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0FBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0FBQ2hILElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQy9ELFFBQVEsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUNuRyxRQUFRLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUN0RyxRQUFRLFNBQVMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsRUFBRTtBQUN0SCxRQUFRLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM5RSxLQUFLLENBQUMsQ0FBQztBQUNQLENBQUM7QUFDRDtBQUNPLFNBQVMsV0FBVyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUU7QUFDM0MsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3JILElBQUksT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sTUFBTSxLQUFLLFVBQVUsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFdBQVcsRUFBRSxPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDN0osSUFBSSxTQUFTLElBQUksQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLFVBQVUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUN0RSxJQUFJLFNBQVMsSUFBSSxDQUFDLEVBQUUsRUFBRTtBQUN0QixRQUFRLElBQUksQ0FBQyxFQUFFLE1BQU0sSUFBSSxTQUFTLENBQUMsaUNBQWlDLENBQUMsQ0FBQztBQUN0RSxRQUFRLE9BQU8sQ0FBQyxFQUFFLElBQUk7QUFDdEIsWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN6SyxZQUFZLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDcEQsWUFBWSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDekIsZ0JBQWdCLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU07QUFDOUMsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztBQUN4RSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztBQUNqRSxnQkFBZ0IsS0FBSyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsU0FBUztBQUNqRSxnQkFBZ0I7QUFDaEIsb0JBQW9CLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUU7QUFDaEksb0JBQW9CLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7QUFDMUcsb0JBQW9CLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRTtBQUN6RixvQkFBb0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO0FBQ3ZGLG9CQUFvQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsU0FBUztBQUMzQyxhQUFhO0FBQ2IsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDdkMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQ2xFLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQztBQUN6RixLQUFLO0FBQ0w7O0FDOUZBO0lBQUE7UUFDRSxnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixjQUFTLEdBQVcsR0FBRyxDQUFDO1FBQ3hCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBQy9CLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIsa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFDOUIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUMzQixlQUFVLEdBQWdCLE9BQU8sQ0FBQztRQUNsQyxvQkFBZSxHQUFZLElBQUksQ0FBQztRQUNoQyxvQkFBZSxHQUFZLElBQUksQ0FBQztLQUNqQztJQUFELDJCQUFDO0FBQUQsQ0FBQyxJQUFBO0FBRUQ7SUFBNEMsMENBQWdCO0lBRzFELGdDQUFZLEdBQVEsRUFBRSxNQUEwQjtRQUFoRCxZQUNFLGtCQUFNLEdBQUcsRUFBRSxNQUFNLENBQUMsU0FFbkI7UUFEQyxLQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7S0FDdEI7SUFFRCx3Q0FBTyxHQUFQO1FBQUEsaUJBeUdDO1FBeEdPLElBQUEsV0FBVyxHQUFLLElBQUksWUFBVCxDQUFVO1FBRTNCLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUVwQixJQUFJQSxnQkFBTyxDQUFDLFdBQVcsQ0FBQzthQUNyQixPQUFPLENBQUMsc0JBQXNCLENBQUM7YUFDL0IsT0FBTyxDQUFDLHdDQUF3QyxDQUFDO2FBQ2pELFNBQVMsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7YUFDakUsUUFBUSxDQUFDLFVBQUMsS0FBSztZQUNkLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUN2QyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLElBQUksS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO2dCQUNqQyxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3ZCO2lCQUNJO2dCQUNILEtBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDdEI7U0FDRixDQUFDLEdBQUEsQ0FBQyxDQUFDO1FBRVIsSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7YUFDckIsT0FBTyxDQUFDLGtCQUFrQixDQUFDO2FBQzNCLE9BQU8sQ0FBQyx3REFBd0QsQ0FBQzthQUNqRSxTQUFTLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQzthQUN2RSxRQUFRLENBQUMsVUFBQyxLQUFLO1lBQ2QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztZQUM3QyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDdkIsQ0FBQyxHQUFBLENBQUMsQ0FBQztRQUVSLElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQzthQUMxQixPQUFPLENBQUMsOERBQThELENBQUM7YUFDdkUsU0FBUyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7YUFDckUsUUFBUSxDQUFDLFVBQUMsS0FBSztZQUNkLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDM0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzQyxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3ZCLENBQUMsR0FBQSxDQUFDLENBQUM7UUFFUixJQUFJQSxnQkFBTyxDQUFDLFdBQVcsQ0FBQzthQUNyQixPQUFPLENBQUMsWUFBWSxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyx3REFBd0QsQ0FBQzthQUNqRSxPQUFPLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQzthQUNqRCxRQUFRLENBQUMsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQzthQUNyRCxRQUFRLENBQUMsVUFBQyxLQUFLO1lBQ2QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN4RCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDdkIsQ0FBQyxHQUFBLENBQUMsQ0FBQztRQUVSLElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQzthQUNqQyxPQUFPLENBQUMsa0NBQWtDLENBQUM7YUFDM0MsU0FBUyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7YUFDckUsUUFBUSxDQUFDLFVBQUMsS0FBSztZQUNkLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDM0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzQyxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3ZCLENBQUMsR0FBQSxDQUFDLENBQUM7UUFFUixJQUFJQSxnQkFBTyxDQUFDLFdBQVcsQ0FBQzthQUNyQixPQUFPLENBQUMsK0JBQStCLENBQUM7YUFDeEMsT0FBTyxDQUFDLHdDQUF3QyxDQUFDO2FBQ2pELFNBQVMsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO2FBQ2pFLFFBQVEsQ0FBQyxVQUFDLEtBQUs7WUFDZCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUN2QixDQUFDLEdBQUEsQ0FBQyxDQUFDO1FBRVIsSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7YUFDdkIsT0FBTyxDQUFDLHlCQUF5QixDQUFDO2FBQ2xDLE9BQU8sQ0FBQyxvQ0FBb0MsQ0FBQzthQUM3QyxXQUFXLENBQUMsVUFBQyxRQUFRO1lBQ3BCLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFBO1lBQ3hDLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1lBQ3BDLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFBO1lBQ3hDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDbEQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFDLEtBQWtCO2dCQUNuQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2dCQUN4QyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMzQyxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3ZCLENBQUMsQ0FBQTtTQUFDLENBQUMsQ0FBQztRQUVQLElBQUlBLGdCQUFPLENBQUMsV0FBVyxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQzthQUMxQixPQUFPLENBQUMsMkNBQTJDLENBQUM7YUFDcEQsU0FBUyxDQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUM7YUFDdkUsUUFBUSxDQUFDLFVBQUMsS0FBSztZQUNkLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7WUFDN0MsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUMzQyxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ3ZCLENBQUMsR0FBQSxDQUFDLENBQUM7UUFFUixJQUFJQSxnQkFBTyxDQUFDLFdBQVcsQ0FBQzthQUNyQixPQUFPLENBQUMsYUFBYSxDQUFDO2FBQ3RCLE9BQU8sQ0FBQyx1REFBdUQsQ0FBQzthQUNoRSxPQUFPLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQzthQUNoRCxRQUFRLENBQUMsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQzthQUN2RCxRQUFRLENBQUMsVUFBQyxLQUFLO1lBQ2QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUMxRCxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDdkIsQ0FBQyxHQUFBLENBQUMsQ0FBQztLQUNUO0lBQ0gsNkJBQUM7QUFBRCxDQWxIQSxDQUE0Q0MseUJBQWdCLEdBa0gzRDtBQUVEO0lBRUUsOEJBQVksTUFBMEI7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7S0FDdEI7SUFFRCxzREFBdUIsR0FBdkIsVUFBd0IsRUFBUyxFQUFFLElBQVcsRUFBRSxXQUFrQjtRQUFsRSxpQkFZQztRQVhDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO1lBQ3JCLEVBQUUsRUFBRSxFQUFFO1lBQ04sSUFBSSxFQUFFLElBQUk7WUFDVixRQUFRLEVBQUU7OztnQkFHUixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN2RSxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUMzQyxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ3ZCO1NBQ0YsQ0FBQyxDQUFDO0tBQ0o7SUFFRCwwQ0FBVyxHQUFYO1FBQUEsaUJBNkJDOztRQTNCQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztZQUNyQixFQUFFLEVBQUUsc0JBQXNCO1lBQzFCLElBQUksRUFBRSxzQkFBc0I7WUFDNUIsUUFBUSxFQUFFOztnQkFFUixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7Z0JBQy9ELEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7O2dCQUczQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQzlFO1NBQ0YsQ0FBQyxDQUFDOztRQUdILElBQUksQ0FBQyx1QkFBdUIsQ0FBQyx1Q0FBdUMsRUFBRSx5QkFBeUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDOztRQUdwSCxJQUFJLENBQUMsdUJBQXVCLENBQUMsc0NBQXNDLEVBQUUsd0JBQXdCLEVBQUUsZUFBZSxDQUFDLENBQUM7O1FBR2hILElBQUksQ0FBQyx1QkFBdUIsQ0FBQywrQkFBK0IsRUFBRSxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDOztRQUdwRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsc0NBQXNDLEVBQUUsd0JBQXdCLEVBQUUsZUFBZSxDQUFDLENBQUM7O1FBR2hILElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxpQ0FBaUMsRUFBRSwrQkFBK0IsRUFBRSxXQUFXLENBQUMsQ0FBQztLQUMvRztJQUNILDJCQUFDO0FBQUQsQ0FBQzs7O0lDdEwrQyxzQ0FBTTtJQUF0RDtRQUFBLHFFQW9XQzs7UUFoV1MscUJBQWUsR0FBVyxDQUFDLENBQUM7UUFnQjVCLG9CQUFjLEdBQW9CLEVBQUUsQ0FBQzs7UUFzQjdDLFlBQU0sR0FBRzs7WUFFUCxLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDdkUsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFDcEYsS0FBSSxDQUFDLGFBQWEsQ0FBQyxLQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLEtBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQzVFLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzs7WUFHbkUsS0FBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHLEtBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRyxLQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLEtBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNqSCxDQUFBOztRQUdELGtCQUFZLEdBQUc7O1lBRWIsS0FBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7O1lBRzFELEtBQUksQ0FBQyxZQUFZLENBQUMscUJBQXFCLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQztZQUMvRSxLQUFJLENBQUMsWUFBWSxDQUFDLGtCQUFrQixHQUFHLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQzs7O1lBSS9ELEtBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7WUFHaEIsS0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDMUIsQ0FBQTs7UUFHRCxhQUFPLEdBQUc7O1lBR1IsS0FBSSxDQUFDLFdBQVcsRUFBRSxDQUFDOztZQUduQixLQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7O1lBR3hDLEtBQUksQ0FBQyxZQUFZLENBQUMsa0JBQWtCLEdBQUcsS0FBSSxDQUFDLFlBQVksQ0FBQyxxQkFBcUIsQ0FBQztTQUNoRixDQUFBO1FBRUQsZUFBUyxHQUFHLFVBQUMsSUFBUztZQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztZQUNwQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUU1RCxJQUFNLE1BQU0sR0FBSSxJQUFJLENBQUMsSUFBWSxDQUFDLE1BQU0sQ0FBQztZQUN6QyxJQUFNLFFBQVEsR0FBVSxNQUFNLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzFELElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDMUIsTUFBTSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqSDtTQUNGLENBQUE7O1FBR0QsYUFBTyxHQUFHOztZQUVSLEtBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQTs7WUFFbEIsS0FBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7U0FDMUIsQ0FBQTs7UUFHRCxpQkFBVyxHQUFHO1lBQ1osSUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQzNELElBQUksRUFBRTtnQkFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDcEIsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDdkQsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLG9DQUFvQyxDQUFDLENBQUM7WUFDckUsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGlDQUFpQyxDQUFDLENBQUM7WUFDbEUsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLCtCQUErQixDQUFDLENBQUM7U0FDakUsQ0FBQTs7UUFHRCxjQUFRLEdBQUc7O1lBRVQsSUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1QyxHQUFHLENBQUMsRUFBRSxHQUFHLHNCQUFzQixDQUFDO1lBQ2hDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7O1lBRzFELFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDOztZQUdwRCxLQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDcEIsQ0FBQTs7UUFHRCxpQkFBVyxHQUFHOztZQUVaLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxvQ0FBb0MsRUFBRSxLQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ2xHLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxpQ0FBaUMsRUFBRSxLQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFBOztZQUUxRixRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsK0JBQStCLEVBQUUsS0FBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQzs7WUFHL0YsSUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxFQUFFO2dCQUFFLE1BQU0seUNBQXlDLENBQUM7aUJBQ3BEOztnQkFFSCxFQUFFLENBQUMsU0FBUyxHQUFHLDhDQUE0QyxLQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsU0FBTSxDQUFDO2dCQUMzRixJQUFJLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUU7b0JBQ2hDLEVBQUUsQ0FBQyxTQUFTLElBQUksZ0VBQTZELEtBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxVQUFNLENBQUM7aUJBQ3hJO2FBQ0Y7WUFFRCxJQUFJLEtBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFDO2dCQUM5QixLQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNsRDtTQUNGLENBQUE7UUFRRCxrQkFBWSxHQUFHO1lBQ2IsSUFBSSxLQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUU7Z0JBQ2xDLEtBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzFCO1NBQ0YsQ0FBQTtRQUVELHdCQUFrQixHQUFHO1lBQ25CLElBQU0sVUFBVSxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUM7WUFDbkMsSUFBSSxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFO2dCQUNsRCxLQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQVM7b0JBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUM5QixLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUN0QjtpQkFDRixDQUFDLENBQUE7YUFDSDtZQUNELEtBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQzs7U0FFdkMsQ0FBQTs7UUFHRCx1QkFBaUIsR0FBRzs7OztZQUlsQixJQUFNLGVBQWUsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDO1lBQzdDLElBQU0sVUFBVSxHQUFHLEtBQUksQ0FBQyxVQUFVLENBQUM7WUFDbkMsSUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztZQUVwQyxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7O1lBR25CLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN4QixVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBbUIsRUFBRSxDQUFTOztnQkFHaEQsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztnQkFFckMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUM5QixJQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDO2dCQUN6QyxJQUFJLEtBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFO29CQUMvQixXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLGVBQWUsQ0FBQyxXQUFXLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLEtBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDO2lCQUNoSDtxQkFDSTtvQkFDSCxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7aUJBQ2hDO2dCQUNELElBQUksUUFBUSxJQUFJLFdBQVcsQ0FBQyxXQUFXO29CQUFFLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBRTVELFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsZUFBZTtzQkFDbEQsQ0FBQyxDQUFDLEdBQUcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLElBQUksSUFBSTtzQkFDdEMsSUFBSSxDQUFDO2dCQUNULFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUksQ0FBQyxRQUFRLENBQUMsZUFBZTtzQkFDbkQsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxLQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsV0FBVyxJQUFJLElBQUk7c0JBQ2hGLElBQUksQ0FBQzs7Z0JBRVQsVUFBVSxJQUFJLFdBQVcsQ0FBQyxXQUFXLENBQUM7Z0JBRXRDLElBQU0sTUFBTSxHQUFJLElBQUksQ0FBQyxJQUFZLENBQUMsTUFBTSxDQUFDO2dCQUN6QyxJQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDM0IsTUFBTSxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUssSUFBSSxDQUFDLGNBQWMsRUFBRSxVQUFLLFFBQVEsTUFBRyxDQUFDLENBQUM7aUJBQzdFO2FBQ0YsQ0FBQyxDQUFDOzs7WUFJSCxJQUFJLFVBQVUsR0FBRyxlQUFlLENBQUMsV0FBVyxFQUFFO2dCQUM1QyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBUztvQkFDM0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztpQkFDdkMsQ0FBQyxDQUFDO2FBQ0o7WUFFRCxJQUFHLFdBQVc7Z0JBQUUsS0FBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7U0FDcEUsQ0FBQTs7UUFHRCxvQkFBYyxHQUFHLFVBQUMsQ0FBTTs7O1lBR3RCLFVBQVUsQ0FBQzs7Z0JBRVQsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2FBQ3hCLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDUixDQUFDOztRQWtFRixrQkFBWSxHQUFHLFVBQUMsSUFBbUI7OztZQUdqQyxJQUFNLGNBQWMsR0FBb0IsRUFBRSxDQUFDO1lBQzNDLEtBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFVBQUMsSUFBbUI7Z0JBQ3ZELElBQUksSUFBSSxDQUFDLElBQUksWUFBWUMsaUJBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUU7b0JBQzNELGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzNCO2FBQ0YsQ0FBQyxDQUFDO1lBQ0gsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQSxDQUFDLENBQUM7U0FDL0MsQ0FBQzs7UUFHRix3QkFBa0IsR0FBRyxVQUFDLElBQVMsRUFBRSxLQUFVOztZQUd6QyxJQUFJLEtBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxLQUFLLFVBQVUsRUFBRTs7Z0JBRTlDLElBQU0sWUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDOztnQkFHaEQsSUFBTSxXQUFTLEdBQUcsVUFBQyxDQUFNOztvQkFFdkIsSUFBTSxNQUFNLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDOztvQkFFckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFNLFlBQVUsR0FBRyxNQUFNLE9BQUksQ0FBQztpQkFDM0QsQ0FBQTs7Z0JBR0QsSUFBTSxTQUFPLEdBQUc7O29CQUVkLElBQUksS0FBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUU7O3dCQUVqQyxJQUFNLFVBQVUsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDO3dCQUNuQyxJQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO3dCQUNwQyxJQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQUMsQ0FBTSxJQUFLLE9BQUEsQ0FBQyxJQUFJLElBQUksR0FBQSxDQUFDLENBQUM7d0JBQzlELElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxHQUFHLENBQUMsSUFBSSxLQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUM7cUJBQ2xJOztvQkFHRCxRQUFRLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLFdBQVMsQ0FBQyxDQUFDO29CQUNyRCxRQUFRLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLFNBQU8sQ0FBQyxDQUFDO2lCQUNsRCxDQUFBOztnQkFHRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFdBQVMsQ0FBQyxDQUFDO2dCQUNsRCxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFNBQU8sQ0FBQyxDQUFDO2FBQy9DO1NBQ0YsQ0FBQTs7S0FDRjtJQTdWQyxzQkFBWSx5Q0FBUzs7YUFBckIsY0FBMEMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRTs7O09BQUE7SUFDaEYsc0JBQVksNENBQVk7YUFBeEIsY0FBa0MsT0FBTyxJQUFJLENBQUMsU0FBZ0IsQ0FBQyxFQUFFOzs7T0FBQTtJQUNqRSxzQkFBWSwrQ0FBZTthQUEzQixjQUE2QyxPQUFRLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFNBQStDLENBQUMsV0FBVyxDQUFDLEVBQUU7OztPQUFBO0lBQ3RJLHNCQUFZLDBDQUFVO2FBQXRCO1lBQ0UsSUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUM3QyxJQUFJLFVBQVUsR0FBb0IsRUFBRSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLFVBQUMsSUFBUztnQkFDN0MsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsS0FBSyxlQUFlLEVBQUU7b0JBQ3RELFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3ZCO2FBQ0YsQ0FBQyxDQUFBO1lBQ0YsT0FBTyxVQUFVLENBQUM7U0FDbkI7OztPQUFBOztJQUlLLG1DQUFNLEdBQVo7Ozs7Ozs7d0JBRUUsS0FBQSxJQUFJLENBQUE7d0JBQVksS0FBQSxDQUFBLEtBQUEsTUFBTSxFQUFDLE1BQU0sQ0FBQTs4QkFBQyxJQUFJLG9CQUFvQixFQUFFO3dCQUFFLHFCQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBQTs7O3dCQUEvRSxHQUFLLFFBQVEsR0FBRyx3QkFBMEMsU0FBcUIsR0FBQyxDQUFDOzt3QkFHakYsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUTs0QkFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7O3dCQUczQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksc0JBQXNCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDOzt3QkFFL0QsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQzs7Ozs7S0FDOUM7O0lBR0QscUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUNoQjtJQWtIRCw4Q0FBaUIsR0FBakIsVUFBa0IsTUFBbUI7UUFDbkMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHlDQUF5QyxFQUFFLE1BQU0sSUFBSSxPQUFPLENBQUMsQ0FBQztRQUM3RixRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsMkNBQTJDLEVBQUUsTUFBTSxJQUFJLFNBQVMsQ0FBQyxDQUFDO1FBQ2pHLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQywyQ0FBMkMsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLENBQUM7S0FDbEc7SUFzRkQsNENBQWUsR0FBZixVQUFnQixRQUF3QjtRQUF4QyxpQkE2REM7UUE3RGUseUJBQUEsRUFBQSxlQUF3Qjs7UUFFdEMsSUFBSSxVQUFVLEdBQXFCLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLFVBQStDLENBQUM7UUFDdEcsT0FBTyxVQUFVLElBQUksSUFBSSxJQUFJLFVBQVUsQ0FBQyxXQUFXLElBQUksSUFBSSxJQUFJLFVBQVUsQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFO1lBQ3JILFVBQVUsR0FBRyxVQUFVLENBQUMsV0FBK0IsQ0FBQztTQUN6RDtRQUVELElBQUksVUFBVSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBRXhDLElBQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7WUFDN0MsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUNuQyxJQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDOzs7OztZQU1wQyxJQUFJLFVBQVEsR0FBRyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUMxQixVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBbUIsRUFBRSxLQUFhOztnQkFFcEQsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7Z0JBR3JDLElBQUksSUFBSSxJQUFJLFVBQVUsRUFBRTtvQkFDdEIsS0FBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7b0JBQzdCLFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDLENBQUM7b0JBQ3RELFdBQVcsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUM7aUJBQ3hEO3FCQUNJLElBQUcsS0FBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsS0FBSSxDQUFDLGVBQWUsRUFBRTs7b0JBRWxFLFVBQVEsSUFBSSxXQUFXLENBQUMsV0FBVyxDQUFDO29CQUNwQyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO29CQUNuRCxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2lCQUN4RDtxQkFDSTs7b0JBRUgsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQztvQkFDdEQsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztpQkFDckQ7YUFDRixDQUFDLENBQUM7O1lBR0gsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7WUFFOUQsSUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsR0FBRyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7O1lBR25JLElBQUksUUFBUSxHQUFtQixRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEdBQUcsUUFBUSxHQUFHLE1BQU0sQ0FBQzs7WUFHN0YsSUFBSSxlQUFlLENBQUMsVUFBVSxHQUFHLFVBQVEsR0FBRyxJQUFJLEVBQUU7O2dCQUVoRCxlQUFlLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVEsR0FBRyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQzthQUNqRjs7aUJBRUksSUFBSSxlQUFlLENBQUMsVUFBVSxHQUFHLGVBQWUsQ0FBQyxXQUFXLEdBQUcsVUFBUSxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsV0FBVyxHQUFHLG1CQUFtQixFQUFFOztnQkFFdkksZUFBZSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFRLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEdBQUcsbUJBQW1CLEdBQUcsZUFBZSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO2FBQ25LO1NBQ0Y7S0FDRjtJQW9ESCx5QkFBQztBQUFELENBcFdBLENBQWdEQyxlQUFNOzs7OyJ9

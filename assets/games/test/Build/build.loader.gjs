function createUnityInstance(canvas, config, progressCallback) {
    function s(e, t) {
        if (!s.aborted && config.showBanner) return "error" == t && (s.aborted = !0), config.showBanner(e, t);
        switch (t) {
            case "error":
                console.error(e);
                break;
            case "warning":
                console.warn(e);
                break;
            default:
                console.log(e)
        }
    }

    function r(e) {
        var t = e.reason || e.error,
            n = t ? t.toString() : e.message || e.reason || "",
            r = t && t.stack ? t.stack.toString() : "";
        (n += "\n" + (r = r.startsWith(n) ? r.substring(n.length) : r).trim()) && l.stackTraceRegExp && l.stackTraceRegExp.test(n) && C(n, e.filename || t && (t.fileName || t.sourceURL) || "", e.lineno || t && (t.lineNumber || t.line) || 0)
    }

    function e(e, t, n) {
        var r = e[t];
        void 0 !== r && r || (console.warn('Config option "' + t + '" is missing or empty. Falling back to default value: "' + n + '". Consider updating your WebGL template to include the missing config option.'), e[t] = n)
    }
    progressCallback = progressCallback || function() {};
    var o, l = {
        canvas: canvas,
        webglContextAttributes: {
            preserveDrawingBuffer: !1,
            powerPreference: 2
        },
        cacheControl: function(e) {
            return e == l.dataUrl || e.match(/\.bundle/) ? "must-revalidate" : "no-store"
        },
        streamingAssetsUrl: "StreamingAssets",
        downloadProgress: {},
        deinitializers: [],
        intervals: {},
        setInterval: function(e, t) {
            e = window.setInterval(e, t);
            return this.intervals[e] = !0, e
        },
        clearInterval: function(e) {
            delete this.intervals[e], window.clearInterval(e)
        },
        preRun: [],
        postRun: [],
        print: function(e) {
            console.log(e)
        },
        printErr: function(e) {
            console.error(e), "string" == typeof e && -1 != e.indexOf("wasm streaming compile failed") && (-1 != e.toLowerCase().indexOf("mime") ? s('HTTP Response Header "Content-Type" configured incorrectly on the server for file ' + l.codeUrl + ' , should be "application/wasm". Startup time performance will suffer.', "warning") : s('WebAssembly streaming compilation failed! This can happen for example if "Content-Encoding" HTTP header is incorrectly enabled on the server for file ' + l.codeUrl + ", but the file is not pre-compressed on disk (or vice versa). Check the Network tab in browser Devtools to debug server header configuration.", "warning"))
        },
        locateFile: function(e) {
            return "build.wasm" == e ? this.codeUrl : e
        },
        disabledCanvasEvents: ["contextmenu", "dragstart"]
    };
    for (o in e(config, "companyName", "Unity"), e(config, "productName", "WebGL Player"), e(config, "productVersion", "1.0"), config) l[o] = config[o];
    l.streamingAssetsUrl = new URL(l.streamingAssetsUrl, document.URL).href;
    var a = l.disabledCanvasEvents.slice();

    function i(e) {
        e.preventDefault()
    }
    a.forEach(function(e) {
        canvas.addEventListener(e, i)
    }), window.addEventListener("error", r), window.addEventListener("unhandledrejection", r);
    var d, u, h, f, p, m, g, b, v, w = "",
        y = "",
        S = (document.addEventListener("webkitfullscreenchange", function(e) {
            document.webkitCurrentFullScreenElement === canvas ? canvas.style.width && (w = canvas.style.width, y = canvas.style.height, canvas.style.width = "100%", canvas.style.height = "100%") : w && (canvas.style.width = w, canvas.style.height = y, y = w = "")
        }), l.deinitializers.push(function() {
            for (var e in l.disableAccessToMediaDevices(), a.forEach(function(e) {
                    canvas.removeEventListener(e, i)
                }), window.removeEventListener("error", r), window.removeEventListener("unhandledrejection", r), l.intervals) window.clearInterval(e);
            l.intervals = {}
        }), l.QuitCleanup = function() {
            for (var e = 0; e < l.deinitializers.length; e++) l.deinitializers[e]();
            l.deinitializers = [], "function" == typeof l.onQuit && l.onQuit()
        }, {
            Module: l,
            SetFullscreen: function() {
                if (l.SetFullscreen) return l.SetFullscreen.apply(l, arguments);
                l.print("Failed to set Fullscreen mode: Player not loaded yet.")
            },
            SendMessage: function() {
                if (l.SendMessage) return l.SendMessage.apply(l, arguments);
                l.print("Failed to execute SendMessage: Player not loaded yet.")
            },
            Quit: function() {
                return new Promise(function(e, t) {
                    l.shouldQuit = !0, l.onQuit = e
                })
            },
            GetMemoryInfo: function() {
                var e = l._getMemInfo();
                return {
                    totalWASMHeapSize: l.HEAPU32[e >> 2],
                    usedWASMHeapSize: l.HEAPU32[1 + (e >> 2)],
                    totalJSHeapSize: l.HEAPF64[1 + (e >> 3)],
                    usedJSHeapSize: l.HEAPF64[2 + (e >> 3)]
                }
            }
        });

    function C(e, t, n) {
        -1 == e.indexOf("fullscreen error") && (l.startupErrorHandler ? l.startupErrorHandler(e, t, n) : l.errorHandler && l.errorHandler(e, t, n) || (console.log("Invoking error handler due to\n" + e), "function" == typeof dump && dump("Invoking error handler due to\n" + e), C.didShowErrorMessage || (-1 != (e = "An error occurred running the Unity content on this page. See your browser JavaScript console for more info. The error was:\n" + e).indexOf("DISABLE_EXCEPTION_CATCHING") ? e = "An exception has occurred, but exception handling has been disabled in this build. If you are the developer of this content, enable exceptions in your project WebGL player settings to be able to catch the exception or see the stack trace." : -1 != e.indexOf("Cannot enlarge memory arrays") ? e = "Out of memory. If you are the developer of this content, try allocating more memory to your WebGL build in the WebGL player settings." : -1 == e.indexOf("Invalid array buffer length") && -1 == e.indexOf("Invalid typed array length") && -1 == e.indexOf("out of memory") && -1 == e.indexOf("could not allocate memory") || (e = "The browser could not allocate enough memory for the WebGL content. If you are the developer of this content, try allocating less memory to your WebGL build in the WebGL player settings."), alert(e), C.didShowErrorMessage = !0)))
    }

    function D(e, t) {
        if ("symbolsUrl" != e) {
            var n = l.downloadProgress[e],
                r = (n = n || (l.downloadProgress[e] = {
                    started: !1,
                    finished: !1,
                    lengthComputable: !1,
                    total: 0,
                    loaded: 0
                }), "object" != typeof t || "progress" != t.type && "load" != t.type || (n.started || (n.started = !0, n.lengthComputable = t.lengthComputable), n.total = t.total, n.loaded = t.loaded, "load" == t.type && (n.finished = !0)), 0),
                o = 0,
                a = 0,
                i = 0,
                s = 0;
            for (e in l.downloadProgress) {
                if (!(n = l.downloadProgress[e]).started) return;
                a++, n.lengthComputable ? (r += n.loaded, o += n.total, i++) : n.finished || s++
            }
            progressCallback(.9 * (a ? (a - s - (o ? i * (o - r) / o : 0)) / a : 0))
        }
    }

    function P() {
        var e = this;
        this.isConnected = this.connect().then(function() {
            return e.cleanUpCache()
        }), this.isConnected.catch(function(e) {
            e = "Error when initializing cache: " + e, console.log("[UnityCache] " + e)
        })
    }

    function x(e) {
        console.log("[UnityCache] " + e)
    }

    function E(e) {
        return E.link = E.link || document.createElement("a"), E.link.href = e, E.link.href
    }

    function U() {
        new Promise(function(a, e) {
            var o = unityFramework;
            a(o)
        }).then(function(e) {
            e(l)
        });
        D(n = "dataUrl"), e = l.cacheControl(l[n]), t = l.companyName && l.productName ? l.cachedFetch : l.fetchWithProgress, r = l[n], r = /file:\/\//.exec(r) ? "same-origin" : void 0;
        var n, e, t, r, o = t(l[n], {
            method: "GET",
            companyName: l.companyName,
            productName: l.productName,
            productVersion: l.productVersion,
            control: e,
            mode: r,
            onProgress: function(e) {
                D(n, e)
            }
        }).then(function(e) {
            return e.parsedBody
        }).catch(function(e) {
            var t = "Failed to download file " + l[n];
            "file:" == location.protocol ? s(t + ". Loading web pages via a file:// URL without a web server is not supported by this browser. Please use a local development web server to host Unity content, or use the Unity Build and Run option.", "error") : console.error(t)
        });
        l.preRun.push(function() {
            l.addRunDependency("dataUrl"), o.then(function(e) {
                var t = new DataView(e.buffer, e.byteOffset, e.byteLength),
                    n = 0,
                    r = "UnityWebData1.0\0";
                if (!String.fromCharCode.apply(null, e.subarray(n, n + r.length)) == r) throw "unknown data format";
                var o = t.getUint32(n += r.length, !0);
                for (n += 4; n < o;) {
                    var a = t.getUint32(n, !0),
                        i = (n += 4, t.getUint32(n, !0)),
                        s = (n += 4, t.getUint32(n, !0)),
                        c = (n += 4, String.fromCharCode.apply(null, e.subarray(n, n + s)));
                    n += s;
                    for (var d = 0, u = c.indexOf("/", d) + 1; 0 < u; d = u, u = c.indexOf("/", d) + 1) l.FS_createPath(c.substring(0, d), c.substring(d, u - 1), !0, !0);
                    l.FS_createDataFile(c, null, e.subarray(a, a + i), !0, !0, !0)
                }
                l.removeRunDependency("dataUrl")
            })
        })
    }
    return l.SystemInfo = function() {
        var e, t, n, r, o = navigator.userAgent + " ",
            a = [
                ["Firefox", "Firefox"],
                ["OPR", "Opera"],
                ["Edg", "Edge"],
                ["SamsungBrowser", "Samsung Browser"],
                ["Trident", "Internet Explorer"],
                ["MSIE", "Internet Explorer"],
                ["Chrome", "Chrome"],
                ["CriOS", "Chrome on iOS Safari"],
                ["FxiOS", "Firefox on iOS Safari"],
                ["Safari", "Safari"]
            ];

        function i(e, t, n) {
            return (e = RegExp(e, "i").exec(t)) && e[n]
        }
        for (var s = 0; s < a.length; ++s)
            if (t = i(a[s][0] + "[/ ](.*?)[ \\)]", o, 1)) {
                e = a[s][1];
                break
            }
        "Safari" == e && (t = i("Version/(.*?) ", o, 1)), "Internet Explorer" == e && (t = i("rv:(.*?)\\)? ", o, 1) || t);
        for (var c = [
                ["Windows (.*?)[;)]", "Windows"],
                ["Android ([0-9_.]+)", "Android"],
                ["iPhone OS ([0-9_.]+)", "iPhoneOS"],
                ["iPad.*? OS ([0-9_.]+)", "iPadOS"],
                ["FreeBSD( )", "FreeBSD"],
                ["OpenBSD( )", "OpenBSD"],
                ["Linux|X11()", "Linux"],
                ["Mac OS X ([0-9_.]+)", "MacOS"],
                ["bot|google|baidu|bing|msn|teoma|slurp|yandex", "Search Bot"]
            ], d = 0; d < c.length; ++d)
            if (u = i(c[d][0], o, 1)) {
                n = c[d][1], u = u.replace(/_/g, ".");
                break
            } var u = {
                "NT 5.0": "2000",
                "NT 5.1": "XP",
                "NT 5.2": "Server 2003",
                "NT 6.0": "Vista",
                "NT 6.1": "7",
                "NT 6.2": "8",
                "NT 6.3": "8.1",
                "NT 10.0": "10"
            } [u] || u,
            l = ((l = document.createElement("canvas")) && (gl = l.getContext("webgl2"), glVersion = gl ? 2 : 0, gl || (gl = l && l.getContext("webgl")) && (glVersion = 1), gl && (r = gl.getExtension("WEBGL_debug_renderer_info") && gl.getParameter(37446) || gl.getParameter(7937))), "undefined" != typeof SharedArrayBuffer),
            h = "object" == typeof WebAssembly && "function" == typeof WebAssembly.compile;
        return {
            width: screen.width,
            height: screen.height,
            userAgent: o.trim(),
            browser: e || "Unknown browser",
            browserVersion: t || "Unknown version",
            mobile: /Mobile|Android|iP(ad|hone)/.test(navigator.appVersion),
            os: n || "Unknown OS",
            osVersion: u || "Unknown OS Version",
            gpu: r || "Unknown GPU",
            language: navigator.userLanguage || navigator.language,
            hasWebGL: glVersion,
            hasCursorLock: !!document.body.requestPointerLock,
            hasFullscreen: !!document.body.requestFullscreen || !!document.body.webkitRequestFullscreen,
            hasThreads: l,
            hasWasm: h,
            hasWasmThreads: !1
        }
    }(), l.abortHandler = function(e) {
        return C(e, "", 0), !0
    }, Error.stackTraceLimit = Math.max(Error.stackTraceLimit || 0, 50), l.readBodyWithProgress = function(a, i, s) {
        var e = a.body ? a.body.getReader() : void 0,
            c = void 0 !== a.headers.get("Content-Length"),
            d = function(e, t) {
                if (!t) return 0;
                var t = e.headers.get("Content-Encoding"),
                    n = parseInt(e.headers.get("Content-Length"));
                switch (t) {
                    case "br":
                        return Math.round(5 * n);
                    case "gzip":
                        return Math.round(4 * n);
                    default:
                        return n
                }
            }(a, c),
            u = new Uint8Array(d),
            l = [],
            h = 0,
            f = 0;
        return c || console.warn("[UnityCache] Response is served without Content-Length header. Please reconfigure server to include valid Content-Length for better download performance."),
            function o() {
                return void 0 === e ? a.arrayBuffer().then(function(e) {
                    var t = new Uint8Array(e);
                    return i({
                        type: "progress",
                        response: a,
                        total: e.length,
                        loaded: 0,
                        lengthComputable: c,
                        chunk: s ? t : null
                    }), t
                }) : e.read().then(function(e) {
                    if (e.done) {
                        if (h === d) return u;
                        if (h < d) return u.slice(0, h);
                        for (var t = new Uint8Array(h), n = (t.set(u, 0), f), r = 0; r < l.length; ++r) t.set(l[r], n), n += l[r].length;
                        return t
                    }
                    return h + e.value.length <= u.length ? (u.set(e.value, h), f = h + e.value.length) : l.push(e.value), h += e.value.length, i({
                        type: "progress",
                        response: a,
                        total: Math.max(d, h),
                        loaded: h,
                        lengthComputable: c,
                        chunk: s ? e.value : null
                    }), o()
                })
            }().then(function(e) {
                return i({
                    type: "load",
                    response: a,
                    total: e.length,
                    loaded: e.length,
                    lengthComputable: c,
                    chunk: null
                }), a.parsedBody = e, a
            })
    }, l.fetchWithProgress = function(e, t) {
        var n = function() {};
        return t && t.onProgress && (n = t.onProgress), fetch(e, t).then(function(e) {
            return l.readBodyWithProgress(e, n, t.enableStreamingDownload)
        })
    }, l.UnityCache = (d = {
        name: "UnityCache",
        version: 4
    }, u = {
        name: "RequestMetaDataStore",
        version: 1
    }, h = "RequestStore", f = "WebAssembly", p = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB, m = null, P.getInstance = function() {
        return m = m || new P
    }, P.destroyInstance = function() {
        return m ? m.close().then(function() {
            m = null
        }) : Promise.resolve()
    }, P.prototype.clearCache = function() {
        var r = this;
        return this.isConnected.then(function() {
            return r.execute(u.name, "clear", [])
        }).then(function() {
            return r.cache.keys()
        }).then(function e(t) {
            var n;
            return 0 === t.length ? Promise.resolve() : (n = t.pop(), r.cache.delete(n).then(function() {
                return e(t)
            }))
        })
    }, P.UnityCacheDatabase = d, P.RequestMetaDataStore = u, P.MaximumCacheSize = 1073741824, P.prototype.loadRequest = function(e) {
        var t = this;
        return t.isConnected.then(function() {
            return Promise.all([t.cache.match(e), t.loadRequestMetaData(e)])
        }).then(function(e) {
            if (void 0 !== e[0] && void 0 !== e[1]) return {
                response: e[0],
                metaData: e[1]
            }
        })
    }, P.prototype.loadRequestMetaData = function(e) {
        e = "string" == typeof e ? e : e.url;
        return this.execute(u.name, "get", [e])
    }, P.prototype.updateRequestMetaData = function(e) {
        return this.execute(u.name, "put", [e])
    }, P.prototype.storeRequest = function(e, t) {
        var n = this;
        return n.isConnected.then(function() {
            return n.cache.put(e, t)
        })
    }, P.prototype.close = function() {
        return this.isConnected.then(function() {
            this.database && (this.database.close(), this.database = null), this.cache && (this.cache = null)
        }.bind(this))
    }, P.prototype.connect = function() {
        var o = this;
        return void 0 === p ? Promise.reject(new Error("Could not connect to cache: IndexedDB is not supported.")) : void 0 === window.caches ? Promise.reject(new Error("Could not connect to cache: Cache API is not supported.")) : new Promise(function(t, n) {
            try {
                function r() {
                    o.openDBTimeout && (clearTimeout(o.openDBTimeout), o.openDBTimeout = null)
                }
                o.openDBTimeout = setTimeout(function() {
                    void 0 === o.database && n(new Error("Could not connect to cache: Database timeout."))
                }, 2e4);
                var e = p.open(d.name, d.version);
                e.onupgradeneeded = o.upgradeDatabase.bind(o), e.onsuccess = function(e) {
                    r(), o.database = e.target.result, t()
                }, e.onerror = function(e) {
                    r(), o.database = null, n(new Error("Could not connect to database."))
                }
            } catch (e) {
                r(), o.database = null, o.cache = null, n(new Error("Could not connect to cache: Could not connect to database."))
            }
        }).then(function() {
            var e = d.name + "_" + l.companyName + "_" + l.productName;
            return caches.open(e)
        }).then(function(e) {
            o.cache = e
        })
    }, P.prototype.upgradeDatabase = function(e) {
        var t, e = e.target.result;
        e.objectStoreNames.contains(u.name) || (t = e.createObjectStore(u.name, {
            keyPath: "url"
        }), ["accessedAt", "updatedAt"].forEach(function(e) {
            t.createIndex(e, e)
        })), e.objectStoreNames.contains(h) && e.deleteObjectStore(h), e.objectStoreNames.contains(f) && e.deleteObjectStore(f)
    }, P.prototype.execute = function(a, i, s) {
        return this.isConnected.then(function() {
            return new Promise(function(t, n) {
                try {
                    var e, r, o;
                    null === this.database ? n(new Error("indexedDB access denied")) : (e = -1 != ["put", "delete", "clear"].indexOf(i) ? "readwrite" : "readonly", r = this.database.transaction([a], e).objectStore(a), "openKeyCursor" == i && (r = r.index(s[0]), s = s.slice(1)), (o = r[i].apply(r, s)).onsuccess = function(e) {
                        t(e.target.result)
                    }, o.onerror = function(e) {
                        n(e)
                    })
                } catch (e) {
                    n(e)
                }
            }.bind(this))
        }.bind(this))
    }, P.prototype.getMetaDataEntries = function() {
        var r = this,
            o = 0,
            a = [];
        return new Promise(function(t, n) {
            var e = r.database.transaction([u.name], "readonly").objectStore(u.name).openCursor();
            e.onsuccess = function(e) {
                e = e.target.result;
                e ? (o += e.value.size, a.push(e.value), e.continue()) : t({
                    metaDataEntries: a,
                    cacheSize: o
                })
            }, e.onerror = function(e) {
                n(e)
            }
        })
    }, P.prototype.cleanUpCache = function() {
        var i = this;
        return this.getMetaDataEntries().then(function(e) {
            for (var t = e.metaDataEntries, n = e.cacheSize, r = [], o = [], a = 0; a < t.length; ++a) t[a].version == l.productVersion ? o.push(t[a]) : (r.push(t[a]), n -= t[a].size);
            o.sort(function(e, t) {
                return e.accessedAt - t.accessedAt
            });
            for (a = 0; a < o.length && !(n < P.MaximumCacheSize); ++a) r.push(o[a]), n -= o[a].size;
            return function e() {
                var t;
                return 0 === r.length ? Promise.resolve() : (t = r.pop(), i.cache.delete(t.url).then(function(e) {
                    if (e) return r = t.url, new Promise(function(e, t) {
                        var n = i.database.transaction([u.name], "readwrite");
                        n.objectStore(u.name).delete(r), n.oncomplete = e, n.onerror = t
                    });
                    var r
                }).then(e))
            }()
        })
    }, P), l.cachedFetch = (g = l.UnityCache, b = l.fetchWithProgress, v = l.readBodyWithProgress, function(o, a) {
        var e, t, i = g.getInstance(),
            s = E("string" == typeof o ? o : o.url),
            c = {
                enabled: (e = s, (!(t = a) || !t.method || "GET" === t.method) && ((!t || -1 != ["must-revalidate", "immutable"].indexOf(t.control)) && !!e.match("^https?://")))
            };

        function d(n, r) {
            return fetch(n, r).then(function(e) {
                var t;
                return !c.enabled || c.revalidated ? e : 304 === e.status ? (c.revalidated = !0, i.updateRequestMetaData(c.metaData).then(function() {
                    x("'" + c.metaData.url + "' successfully revalidated and served from the indexedDB cache")
                }).catch(function(e) {
                    x("'" + c.metaData.url + "' successfully revalidated but not stored in the indexedDB cache due to the error: " + e)
                }), v(c.response, r.onProgress, r.enableStreamingDownload)) : 200 == e.status ? (c.response = e, c.metaData.updatedAt = c.metaData.accessedAt, c.revalidated = !0, t = e.clone(), v(e, r.onProgress, r.enableStreamingDownload).then(function(e) {
                    return c.metaData.size = e.parsedBody.length, Promise.all([i.storeRequest(n, t), i.updateRequestMetaData(c.metaData)]).then(function() {
                        x("'" + s + "' successfully downloaded and stored in the indexedDB cache")
                    }).catch(function(e) {
                        x("'" + s + "' successfully downloaded but not stored in the indexedDB cache due to the error: " + e)
                    }), e
                })) : (x("'" + s + "' request failed with status: " + e.status + " " + e.statusText), v(e, r.onProgress, r.enableStreamingDownload))
            })
        }
        return a && (c.control = a.control, c.companyName = a.companyName, c.productName = a.productName, c.productVersion = a.productVersion), c.revalidated = !1, c.metaData = {
            url: s,
            accessedAt: Date.now(),
            version: c.productVersion
        }, c.response = null, c.enabled ? i.loadRequest(s).then(function(e) {
            var n, r, t;
            return e ? (n = e.response, r = e.metaData, c.response = n, c.metaData.size = r.size, c.metaData.updatedAt = r.updatedAt, "immutable" == c.control ? (c.revalidated = !0, i.updateRequestMetaData(r).then(function() {
                x("'" + c.metaData.url + "' served from the indexedDB cache without revalidation")
            }), v(n, a.onProgress, a.enableStreamingDownload)) : (e = s, (t = window.location.href.match(/^[a-z]+:\/\/[^\/]+/)) && !e.lastIndexOf(t[0], 0) || !n.headers.get("Last-Modified") && !n.headers.get("ETag") ? (e = (a = a || {}).headers || {}, a.headers = e, n.headers.get("Last-Modified") ? (e["If-Modified-Since"] = n.headers.get("Last-Modified"), e["Cache-Control"] = "no-cache") : n.headers.get("ETag") && (e["If-None-Match"] = n.headers.get("ETag"), e["Cache-Control"] = "no-cache"), d(o, a)) : fetch(s, {
                method: "HEAD"
            }).then(function(t) {
                return c.revalidated = ["Last-Modified", "ETag"].every(function(e) {
                    return !n.headers.get(e) || n.headers.get(e) == t.headers.get(e)
                }), c.revalidated ? (i.updateRequestMetaData(r).then(function() {
                    x("'" + c.metaData.url + "' successfully revalidated and served from the indexedDB cache")
                }), v(c.response, a.onProgress, a.enableStreamingDownload)) : d(o, a)
            }))) : d(o, a)
        }).catch(function(e) {
            return x("Failed to load '" + c.metaData.url + "' from indexedDB cache due to the error: " + e), b(o, a)
        }) : b(o, a)
    }), new Promise(function(e, t) {
        var n;
        l.SystemInfo.hasWebGL ? 1 == l.SystemInfo.hasWebGL ? (n = 'Your browser does not support graphics API "WebGL 2" which is required for this content.', "Safari" == l.SystemInfo.browser && parseInt(l.SystemInfo.browserVersion) < 15 && (l.SystemInfo.mobile || 1 < navigator.maxTouchPoints ? n += "\nUpgrade to iOS 15 or later." : n += "\nUpgrade to Safari 15 or later."), t(n)) : l.SystemInfo.hasWasm ? (l.startupErrorHandler = t, progressCallback(0), l.postRun.push(function() {
            progressCallback(1), delete l.startupErrorHandler, e(S)
        }), U()) : t("Your browser does not support WebAssembly.") : t("Your browser does not support WebGL.")
    })
}
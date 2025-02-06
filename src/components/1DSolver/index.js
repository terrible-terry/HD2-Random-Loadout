var FullResult = "";
var Genetic = "";
var Genetic =
  Genetic ||
  (function () {
    "use strict";
    function Genetic() {
      (this.fitness = null),
        (this.seed = null),
        (this.mutate = null),
        (this.crossover = null),
        (this.select1 = null),
        (this.select2 = null),
        (this.optimize = null),
        (this.generation = null),
        (this.notification = null),
        (this.configuration = {
          size: 250,
          crossover: 0.8,
          mutation: 0.2,
          random: 0.1,
          iterations: 100,
          fittestAlwaysSurvives: !0,
          maxResults: 100,
          webWorkers: !0,
          skip: 0,
        }),
        (this.userData = {}),
        (this.internalGenState = {}),
        (this.entities = []),
        (this.usingWebWorker = !1),
        (this.start = function (t) {
          function e(t) {
            return Math.random() <= r.configuration.mutation && r.mutate
              ? r.mutate(Clone(t))
              : t;
          }
          var n,
            i,
            r = this;
          for (
            t &&
            t.data &&
            (this.entities = Serialization.parse(t.data).entities);
            this.entities.length < this.configuration.size;

          )
            this.entities.push(this.seed());
          for (var s = 0; s < this.configuration.iterations; ++s) {
            this.internalGenState = {};
            var o = this.entities
                .map(function (t) {
                  return { fitness: r.fitness(t), entity: t };
                })
                .sort(function (t, e) {
                  return r.optimize(t.fitness, e.fitness) ? -1 : 1;
                }),
              a =
                o.reduce(function (t, e) {
                  return t + e.fitness;
                }, 0) / o.length,
              l = Math.sqrt(
                o
                  .map(function (t) {
                    return (t.fitness - a) * (t.fitness - a);
                  })
                  .reduce(function (t, e) {
                    return t + e;
                  }, 0) / o.length
              ),
              c = {
                maximum: o[0].fitness,
                minimum: o[o.length - 1].fitness,
                mean: a,
                stdev: l,
              },
              h = !this.generation || this.generation(o, s, c),
              u =
                (void 0 !== h && !h) || s == this.configuration.iterations - 1;
            if (
              (this.notification &&
                (u ||
                  0 == this.configuration.skip ||
                  s % this.configuration.skip == 0) &&
                this.sendNotification(o.slice(0, this.maxResults), s, c, u),
              u)
            )
              break;
            var f = [];
            for (
              this.configuration.fittestAlwaysSurvives &&
              (f.push(Clone(o[0].entity)),
              f.push(Clone(o[1].entity)),
              this.crossover &&
                ((i = this.crossover(f[0], this.select1(o))),
                f.push(i[0], i[1]),
                (i = this.crossover(f[1], this.select1(o))),
                f.push(i[0], i[1])),
              f.push(this.mutate(Clone(f[0]))));
              f.length < r.configuration.size;

            )
              Math.random() <= this.configuration.random
                ? f.push(this.seed())
                : this.crossover &&
                  Math.random() <= this.configuration.crossover &&
                  f.length + 1 < r.configuration.size
                ? ((n = this.select2(o)),
                  (i = this.crossover(n[0], n[1]).map(e)),
                  f.push(i[0], i[1]))
                : f.push(e(r.select1(o)));
            this.entities = f;
          }
        }),
        (this.sendNotification = function (t, e, n, i) {
          var r = {
            pop: t.map(Serialization.stringify),
            generation: e,
            stats: n,
            isFinished: i,
          };
          this.usingWebWorker
            ? postMessage(r)
            : self.notification(
                r.pop.map(Serialization.parse),
                r.generation,
                r.stats,
                r.isFinished
              );
        });
    }
    var Serialization = {
        stringify: function (t) {
          var temp = JSON.stringify(t, function (t, e) {
            var temp2 = "";
            var res = "";
            if (e instanceof Function || "function" == typeof e) {
              temp2 = "__func__:" + e.toString();
              res = "1";
            } else if (e instanceof RegExp) {
              temp2 = "__regex__:" + e;
              res = "2";
            } else if (
              "object" == typeof e &&
              "function" == typeof e.constructor.from
            ) {
              res = e;

              if (e.length > 0) {
                if (e[0].length == 4) {
                } else {
                  temp2 = "__" + e.constructor.name + "__:" + e.join();
                }
              } else {
                temp2 = "__" + e.constructor.name + "__:" + e.join();
              }
            } else {
              res = "4";
              temp2 = e;
            }

            return temp2;
          });

          return temp;
        },
        parse: function (str) {
          return JSON.parse(str, function (key, value) {
            if ("string" != typeof value) return value;
            if (0 === value.lastIndexOf("__func__:", 0))
              return eval("(" + value.slice(9) + ")");
            if (0 === value.lastIndexOf("__regex__:", 0))
              return eval("(" + value.slice(10) + ")");
            if (-1 != value.indexOf("Array__:")) {
              var akey = value.split("__:");
              return eval(akey[0].substr(2) + ".from([" + akey[1] + "])");
            }
            return value;
          });
        },
      },
      Clone = function (t) {
        return null == t || "object" != typeof t
          ? t
          : "function" == typeof t.constructor.from
          ? t.constructor.from(t)
          : JSON.parse(JSON.stringify(t));
      },
      Optimize = {
        Maximize: function (t, e) {
          return t >= e;
        },
        Minimize: function (t, e) {
          return t < e;
        },
      },
      Select1 = {
        Tournament2: function (t) {
          var e = t.length,
            n = t[Math.floor(Math.random() * e)],
            i = t[Math.floor(Math.random() * e)];
          return this.optimize(n.fitness, i.fitness) ? n.entity : i.entity;
        },
        Tournament3: function (t) {
          var e = t.length,
            n = t[Math.floor(Math.random() * e)],
            i = t[Math.floor(Math.random() * e)],
            r = t[Math.floor(Math.random() * e)],
            s = this.optimize(n.fitness, i.fitness) ? n : i;
          return (s = this.optimize(s.fitness, r.fitness) ? s : r).entity;
        },
        Fittest: function (t) {
          return t[0].entity;
        },
        Random: function (t) {
          return t[Math.floor(Math.random() * t.length)].entity;
        },
        RandomLinearRank: function (t) {
          return (
            (this.internalGenState.rlr = this.internalGenState.rlr || 0),
            t[
              Math.floor(
                Math.random() * Math.min(t.length, this.internalGenState.rlr++)
              )
            ].entity
          );
        },
        Sequential: function (t) {
          return (
            (this.internalGenState.seq = this.internalGenState.seq || 0),
            t[this.internalGenState.seq++ % t.length].entity
          );
        },
      },
      Select2 = {
        Tournament2: function (t) {
          return [
            Select1.Tournament2.call(this, t),
            Select1.Tournament2.call(this, t),
          ];
        },
        Tournament3: function (t) {
          return [
            Select1.Tournament3.call(this, t),
            Select1.Tournament3.call(this, t),
          ];
        },
        Random: function (t) {
          return [Select1.Random.call(this, t), Select1.Random.call(this, t)];
        },
        RandomLinearRank: function (t) {
          return [
            Select1.RandomLinearRank.call(this, t),
            Select1.RandomLinearRank.call(this, t),
          ];
        },
        Sequential: function (t) {
          return [
            Select1.Sequential.call(this, t),
            Select1.Sequential.call(this, t),
          ];
        },
        FittestRandom: function (t) {
          return [Select1.Fittest.call(this, t), Select1.Random.call(this, t)];
        },
      };
    return (
      (Genetic.prototype.evolve = function (config, userData) {
     
        function addslashes(t) {
          return t.replace(/[\\"']/g, "\\$&").replace(/\u0000/g, "\\0");
        }
        var k;
        for (k in config) this.configuration[k] = config[k];
        for (k in userData) this.userData[k] = userData[k];
        debugger;
        this.usingWebWorker =
          this.configuration.webWorkers &&
          "undefined" != typeof Blob &&
          "undefined" != typeof Worker &&
          void 0 !== window.URL &&
          void 0 !== window.URL.createObjectURL;
        var blobScript = "'use strict'\n";
        (blobScript +=
          "var Serialization = {'stringify': " +
          Serialization.stringify.toString() +
          ", 'parse': " +
          Serialization.parse.toString() +
          "};\n"),
          (blobScript += "var Clone = " + Clone.toString() + ";\n"),
          (blobScript +=
            'var Optimize = Serialization.parse("' +
            addslashes(Serialization.stringify(Optimize)) +
            '");\n'),
          (blobScript +=
            'var Select1 = Serialization.parse("' +
            addslashes(Serialization.stringify(Select1)) +
            '");\n'),
          (blobScript +=
            'var Select2 = Serialization.parse("' +
            addslashes(Serialization.stringify(Select2)) +
            '");\n'),
          (blobScript +=
            'var genetic = Serialization.parse("' +
            addslashes(Serialization.stringify(this)) +
            '");\n'),
          (blobScript += "onmessage = function(e) { genetic.start(e); }\n");
        var self = this;
        if (this.usingWebWorker) {
          var blob = new Blob([blobScript]),
            worker = new Worker(window.URL.createObjectURL(blob));
          (worker.onmessage = function (t) {
            var e = t.data;
            self.notification(
              e.pop.map(Serialization.parse),
              e.generation,
              e.stats,
              e.isFinished
            );

            if (e.isFinished) {
              worker.terminate();
              
              document.getElementById("SawLoading").classList.add("hidden");//start opt

           

              var yieldhold = FullResult.OptYield;

              FullResult.OptYield = yieldhold;
           
              Swal.fire({
                position: "center",
                icon: "success",
                html: `<input type="hidden" id="outyieldswal" value="${(yieldhold*100).toFixed(2)}"><p>Optimization Complete </p><p style="font-weight:bold">${(yieldhold*100).toFixed(2)}% Yield</p><p style="font-weight:bold">${FullResult.Sticks} Stocks Used </p>`,
                title: "",
                footer: "",
                backdrop: `rgba(169,169,169,.75)`,
                showConfirmButton: true,
                
              });

              FullResult = JSON.stringify(
                FullResult,
                function replacer(key, value) {
                  if (Array.isArray(value) && value.length === 0) {
                    return { ...value }; // Converts empty array with string properties into a POJO
                  }
                  return value;
                }
              );
            
               
              $("#Opt_Results").val(FullResult);
              WC.CurrentCutList.Update();
              WC.CurrentCutList.DisplayResultTable();
            }
          }),
            (worker.onerror = function (t) {
              alert(
                "ERROR: Line " +
                  t.lineno +
                  " in " +
                  t.filename +
                  ": " +
                  t.message
              );
            }),
            worker.postMessage("");
        } else
          !(function () {
            var onmessage;
            eval(blobScript), onmessage(null);
          })();
      }),
      {
        create: function () {
          return new Genetic();
        },
        Select1: Select1,
        Select2: Select2,
        Optimize: Optimize,
        Clone: Clone,
      }
    );
  })();
"undefined" != typeof module && (module.exports = Genetic),
  (function () {
    function t(e) {
      (this.engine = new t[e]()),
        (this.genetic = Genetic.create()),
        (this.genetic.optimize = Genetic.Optimize.Minimize),
        (this.genetic.select1 = Genetic.Select1.Tournament2),
        (this.genetic.select2 = Genetic.Select2.Tournament2),
        (this.genetic.seed = this.engine.seed),
        (this.genetic.mutate = this.engine.mutate),
        (this.genetic.crossover = this.engine.crossover),
        (this.genetic.fitness = this.engine.fitness),
        (this.genetic.generation = this.engine.generation);
    }
    (t["1D"] = function () {
      (this.seed = function () {
        if (!Int16Array.prototype.fill)
          throw new Error(
            "Unsupported browser. Use Chrome, FireFox or MS EDGE"
          );
        for (
          var t,
            e,
            n = this.userData.products.length,
            i = new Int16Array(n).fill(-1),
            r = 0;
          r < n;
          r++
        ) {
          for (
            t = Math.floor(Math.random() * (n - r)), e = 0;
            e < t || i[t] >= 0;

          )
            i[e] >= 0 && t++, e++;
          i[t] = r;
        }
        return i;
      }),
        (this.mutate = function (t) {
          for (
            var e = t.length,
              n = Math.floor(Math.random() * e),
              i = Math.floor(Math.random() * e);
            n == i && e > 1;

          )
            i = Math.floor(Math.random() * t.length);
          var r = t[i];
          return (t[i] = t[n]), (t[n] = r), t;
        }),
        (this.crossover = function (t, e) {
          var n,
            i,
            r = t.length,
            s = Math.floor(Math.random() * r),
            o = new Int16Array(r).fill(-1),
            a = new Int16Array(r).fill(-1),
            l = new Int16Array(r);
          for (l.fill(-1), n = 0, i = 0; i < s; i++)
            (o[i] = e[i]), (l[n] = t.indexOf(o[i])), n++;
          for (n = s, i = 0; i < r; i++)
            -1 == l.indexOf(i) && ((o[n] = t[i]), n++);
          for (l.fill(-1), n = 0, i = 0; i < s; i++)
            (a[i] = t[i]), (l[n] = e.indexOf(a[i])), n++;
          for (n = s, i = 0; i < r; i++)
            -1 == l.indexOf(i) && ((a[n] = e[i]), n++);
          return [o, a];
        }),
        (this.fitness = function (t, e) {
          var n,
            i,
            r,
            s,
            o,
            a = 0,
            l = t.length,
            c = this.userData,
            h = Array.from(c.workpieces),
            u = h.length;
          for (e && (n = new Int16Array(l)), o = 0; o < t.length; ++o)
            (s = 1 / 0),
              (i = -1),
              h.some(function (e, n) {
                if (
                  ((r = e - c.products[t[o]] - c.knifewidth * 10000),
                  n < u &&
                    c.workpieces[n] == e &&
                    c.overmeasure &&
                    (r -= c.overmeasure),
                  r >= 0 && r < s)
                ) {
                  if (
                    r > c.wrongsnipmin &&
                    c.wrongsnipmax &&
                    r < c.wrongsnipmax
                  )
                    return;
                  if (((s = r), (i = n), 0 == s)) return !0;
                }
              }),
              i >= 0
                ? ((h[i] = s), e && (n[t[o]] = i))
                : (h.push(
                    c.sticklength * 10000 - c.products[t[o]] - c.overmeasure
                  ),
                  e && (n[t[o]] = h.length -1));
          return (
            e
              ? ((a = {
                  workpieces: h,
                  res: n,
                  workpieces_len: 0,
                  products_len: c.products.reduce(function (t, e) {
                    return t + e;
                  }, 0),
                  scraps_len: 0,
                }),
                h.forEach(function (t, e) {
                  (a.workpieces_len +=
                    e < u ? c.workpieces[e] : c.sticklength * 10000),
                    t >= c.usefulscrap && (a.scraps_len += t);
                }),
                (a.scraps_percent =
                  (100 *
                    (a.workpieces_len -
                      a.products_len -
                      a.scraps_len -
                      c.products.length * (c.knifewidth * 10000))) /
                  a.workpieces_len))
              : h.forEach(function (t, e) {
                  (a += 1e13), (a -= t * t);
                }),
            a
          );
        }),
        (this.generation = function (t, e, n) {
          if (e < this.configuration.skip || e % this.configuration.skip != 0)
            return !0;
          var i = this.fitness(t[0].entity, !0),
            r = this.userData.usefulscrap;
          return (
            !(
              (i.scraps_percent < 0.5 &&
                e > this.configuration.iterations / 3) ||
              (i.scraps_percent < 1 &&
                i.workpieces.every(function (t) {
                  return t < r;
                }))
            ) && void 0
          );
        });
    }),
      (t["15D"] = function () {}),
      (t["2D"] = function () {}),
      (t.Pyramid = function () {}),
      (Genetic.Cutting = t);
  })(),
  (window.testagain = function testfunction() {
    function t(e, n) {
      (this.canvas = document.createElement("canvas")),
        (this.canvas.style.width = "100%"),
        (this.canvas.getContext("2d").willReadFrequently = true),
        (this.canvas.style.height = "1rem"),
        (this.canvas.style.backgroundColor = "whitesmoke"),
        n.appendChild(this.canvas),
        (this.scope = new paper.constructor()),
        (this.scheme = new paper.Project(this.canvas)),
        (this.engine = new t[e](this)),
        (this.scheme.resize_canvas = function () {
          (this.view.viewSize.width = 1200),
            (this.view.viewSize.height = $("canvas").height());
          this.zoom_fit();
        }),
        (this.scheme.zoom_fit = function () {
          var t = this.activeLayer && this.activeLayer.strokeBounds;
          t &&
            t.height &&
            t.width &&
            ((this.view.zoom = 100 / $("#Stock_Length").val()),
            (this.view.center = t.center));
        }),
        (this.draw = function (t, e) {
          this.engine.draw(t, e);
        });
    }
    (t["1D"] = function (t) {
   
      this.draw = function (t, e) {
        FullResult = { Results: [], OptYield: 0, Stock: 0, Sticks: 0 };

        for (var n, i, r = 88, s = 0; s < e.workpieces.length; s++) {
          (i =
            s < t.workpieces.length ? t.workpieces[s] : t.sticklength * 10000),
            (n = Math.round(114.4) * s);

          var o = [];
          var obj = [];
          var Stockwaste = 0;
          W = [];

          e.res.forEach(function (e, n) {
            e == s && W.push(Z.fullproducts[n]);
            e == s && o.push(t.products[n]);
          });

          o.sort(function (t, e) {
            return e - t;
          });

          W.sort(
            (function (t, e) {
              return function (a, b) {
                return a[1] === b[1] ? 0 : a[1] > b[1] ? -1 : 1;
              };
            })(1)
          );
          ///FullResult.Results["'S"+StockInd+"'"]=obj;

          StockInd++;

          obj["Part"] = [];
          obj["StockLength"] = i;
          obj["StockUsed"] = 0;
          partcount = 0;

          o.reduce(function (e, i, index) {
            partcount++;
            obj["test"] = partcount*t.knifewidth;
            obj["StockUsed"] += W[index][1];
            obj["StockYield"] = ((partcount*t.knifewidth)+obj["StockUsed"]) / obj["StockLength"];
            Stockwaste = obj["StockYield"];
            obj["Part"]["Part-" + partcount] = W[index];
            W[index][0] = "1";
            obj["StockInd"] = StockInd;
            FullResult.Results["'S" + StockInd + "'"] = obj;
            return;
          }, 0),
            yield.push(Stockwaste);
        }
        var arrp = [];
        for (const element in FullResult.Results) {
          for (const element1 in FullResult.Results[element]) {
            if (element1 == "Part") {
              for (const element2 in FullResult.Results[element][element1]) {
                if (
                  !arrp.includes(
                    FullResult.Results[element][element1][element2][2]
                  )
                ) {
                  arrp.push(FullResult.Results[element][element1][element2][2]);
                  var help =
                    FullResult.Results[element][element1][element2][1] / 10000;
                  FullResult.Results[element][element1][element2][1] = help;
                }
              }
            }
          }
        }

        FullResult.Sticks = s;
        FullResult.Stock = t.sticklength;
        FullResult.OptYield = getAvg(yield);
        var sum = t.products.reduce((accumulator, currentValue) => {
          return accumulator + currentValue
        },0);
        FullResult.OptYield =((((t.knifewidth*(t.products.length))*10000)+sum)/(t.sticklength*s))/10000;
       
        /////////////////////////////////////
        const stocks = Object.keys(FullResult.Results);
        let stockLength = FullResult.Stock;

        const partsByStock = {};
        stocks.forEach((stock) => {
          partsByStock[stock] = Object.entries(FullResult.Results[stock].Part);
        });

        Object.values(partsByStock).forEach((parts) => {
          parts.sort((a, b) => b[1][1] - a[1][1]);
        });

        const cuttingOrder = [];
        const mergedCuttingOrder = [];

        stocks.forEach((stock) => {
          const parts = partsByStock[stock];
          let remainingStock = 0;
          let pickupStock = 0;
          if(t.sticklength == stockLength){
          pickupStock = (stockLength * 1);
       remainingStock =  (stockLength * 1);
          }else{
            remainingStock = (stockLength * 1)-t.knifewidth;
            pickupStock = (stockLength * 1)-t.knifewidth;
          }
          

          parts.forEach((part) => {
           
            let [qty, cutLength, partName, specialAction] = part[1];
            qty = qty * 1;

            // Check if there is enough remaining stock length for the part

            if (parseFloat(cutLength) <= remainingStock) {
                let cutl = parseFloat(cutLength);
              remainingStock -= ((cutl+parseFloat(t.knifewidth))*qty);

              cuttingOrder.push({
                stock,
                part: partName,
                qty,
                cutLength,
                specialAction,
                remainingStock,
                pickupStock,
              });

              pickupStock = remainingStock;
            }
          });
        });
        
        cuttingOrder.forEach((item) => {
          const existingItem = mergedCuttingOrder.find(
            (mergedItem) =>
              mergedItem.cutLength === item.cutLength &&
              mergedItem.part === item.part &&
              mergedItem.stock === item.stock &&
              mergedItem.specialAction === item.specialAction
          );

          if (existingItem) {
            existingItem.qty += parseInt(item.qty, 10);
            existingItem.remainingStock -= parseFloat((item.cutLength+t.knifewidth));
          } else {
            mergedCuttingOrder.push(item);
          }
        });

        mergedCuttingOrder.sort((a, b) => {
            // Compare by cut length first
            const cutLengthComparison = b.cutLength - a.cutLength;
          
            // If cut lengths are the same, compare by part name
            return cutLengthComparison !== 0 ? cutLengthComparison : a.part.localeCompare(b.part);
          });
        mergedCuttingOrder.forEach((item) => {
          item.cutLength = decimalToFraction(item.cutLength);
          item.remainingStock = decimalToFraction(item.remainingStock);
          item.pickupStock = decimalToFraction(item.pickupStock);
        });
       
          
          // Rest of your code...
          
        FullResult.Results = mergedCuttingOrder;

        /////////////////////////////////////////////////
      };
    }),
      (t["2D"] = function () {
        // this.draw = function (t, e) { };
      }),
      (t.Pyramid = function () {
        //this.draw = function (t, e) { };
      }),
      (Genetic.Visualization = t);
  })(),
  $(document).ready(function () {
    var i =0;
 
    function t() {
      $("#linear-solver-results tbody").html(""),
        $("#linear-solver-solve").prop("disabled", !0);
      var t = {
          iterations: 3e3,
          size: 200,
          crossover: 0.8,
          mutation: 0.3,
          random: 0.1,
          skip: 60,
          webWorkers: 1,
        },
        e = {
          products: [],
          workpieces: [],
          knifewidth: 188,
          overmeasure: 0,
          sticklength: 6e3,
          wrongsnipmin: 0,
          wrongsnipmax: 0,
          usefulscrap: 600,
        };
      Z = { fullproducts: [] };
      Znew = { fullproducts: [] };

      yield = [];
      yieldOut = 0;
      W = [];
      StockInd = 0;
      Stock = [];
      O = [];

      partsNew = $("#Part_table tr"); ///qty,length,tag,Special
      let longestpart = 0;
      $.each(partsNew, function (key, value) {
        sub = [];
    
        sub.push(value.children[1].children[0].value); //qty
        sub.push(value.children[2].children[0].value); //lent
        sub.push(value.children[0].children[0].value); //tag
        sub.push(value.children[3].children[0].value); //special
        if(value.children[2].children[0].value>longestpart){
          longestpart=value.children[2].children[0].value;
        }
        switch (sub[3]) {
          case "Single Miter": //1
            sub[1] = sub[1] * 1 + 1;
            break;
          case "Double Miter": //2
            sub[1] = sub[1] * 1 + 2;
            break;
          case "Notching": //3
            sub[1] = sub[1] * 1 + 0;
            break;
          case "Sqaure": //0
            sub[1] = sub[1] * 1 + 0;
            break;

          default:
            break;
        }
        sub[1] = sub[1] * 10000;

        for (let i = 0; i < sub[0]; i++) {
          (sub[1] = parseInt(sub[1])),
            !isNaN(sub[1]) && sub[1] > 0 && e.products.push(sub[1]);
          (sub[1] = parseInt(sub[1])),
            !isNaN(sub[1]) && sub[1] > 0 && Z.fullproducts.push(sub);
        }
      });

      e.knifewidth = parseFloat($("#SawKerf").val());
      e.sticklength =
        parseFloat($("#Stock_Length").val()) -
        parseFloat($("#Over_Measure").val());
      e.usefulscrap = 0.125 * 10000;
      t.iterations = parseFloat($("#Iterations").val());
      t.size = 150;///generation
      t.crossover = 0.8;
    
      t.mutation = 0.03;
      t.random = 0.8;
      t.webWorkers = parseFloat(3);

/*
      e.knifewidth = parseFloat($("#SawKerf").val());
      e.sticklength =
        parseFloat($("#Stock_Length").val()) -
        parseFloat($("#Over_Measure").val());
      e.usefulscrap = parseFloat($("#Useful_Scrap").val() * 10000);
      t.iterations = parseFloat($("#Iterations").val());
      t.size = parseFloat($("#Gen_Size").val());
      t.crossover = parseFloat($("#Crossover").val());
    
      t.mutation = parseFloat($("#Mutation").val());
      t.random = parseFloat($("#Random").val());
      t.webWorkers = parseFloat(1);*/

      t.skip < 40 && (t.skip = 10);
      t.size < 80 && (t.size = 80);
      n.genetic.evolve(t, e);
   
      
    }
    var e,
      n = new Genetic.Cutting("1D");
    n.genetic.notification = function (t, n, i, r) {
      if (0 != n) {
        var s,
          o = this.fitness(t[0].entity, !0);

        if (
          (r &&
            ($("#linear-solver-solve").prop("disabled", !1),
            this.progressbar &&
              (setTimeout(
                function () {
                  this.destroy();
                }.bind(this.progressbar),
                1e3
              ),
              delete this.progressbar)),
          this.progressbar &&
            this.progressbar.animate(n / this.configuration.iterations),
          this.last == o.scraps_percent)
        )
          return (
            (s = $("#linear-solver-results tbody tr")[0]),
            void (s.cells[1].innerHTML = n)
          );
        (this.last = o.scraps_percent), e.draw(this.userData, o);
        var a = "";

        (a += "<tr><td></td>"),
          (a += "<td align='center'>" + n + "</td>"),
          (a +=
            "<td align='center'>" +
            (t[0].fitness / 1e14).toFixed(5) +
            " Stocks Used:" +
            o.workpieces.length +
            "</td>"),
          (a += "<td align='center'>" + o.scraps_percent.toFixed(3) + "</td>"),
          (a += "</tr>"),
          $("#linear-solver-results tbody").prepend(a),
          r ||
            ((s = $("#linear-solver-results tbody tr")[0]),
            this.progressbar
              ? this.progressbar._container.parentElement != s.cells[0] &&
                (this.progressbar._container.parentElement.removeChild(
                  this.progressbar._container
                ),
                s.cells[0].appendChild(this.progressbar._container))
              : ((s.cells[0].innerHTML =
                  "<div style='margin: 0px; width: " +
                  s.cells[0].offsetWidth +
                  "px; height: 20px; position: relative;'></div>"),
                (this.progressbar = new ProgressBar.Line(
                  s.cells[0].firstChild,
                  {
                    strokeWidth: 1,
                    easing: "easeInOut",
                    duration: 200,
                    color: "#ddd",
                    trailColor: "#eee",
                    trailWidth: 1,
                    svgStyle: { width: "100%", height: "100%" },
                    text: {
                      style: {
                        color: "#333",
                        position: "absolute",
                        left: "50%",
                        top: "0px",
                        padding: 0,
                        margin: 0,
                        transform: null,
                      },
                      autoStyleContainer: !1,
                    },
                    from: { color: "#FFEA82" },
                    to: { color: "#ED6A5A" },
                    step: function (t, e) {
                      e.setText(Math.round(100 * e.value()) + " %");
                    },
                  }
                ))));
      }
    };
    var i = {
      settings: { showPopoutIcon: !1, showCloseIcon: !1 },
      content: [
        {
          type: "column",
          content: [
            {
              type: "row",
              content: [
                //   { type: "component", componentName: "input", title: "Source data", tooltip: "Dimensions of products and workpieces", componentState: { label: "A" }, width: 20 },
                //{ type: "component", componentName: "results", title: "Optimization", tooltip: "Launch and progress of optimization", componentState: { label: "B" }, width: 30 },
              ],
              height: 40,
            },
            {
              type: "row",
              content: [
                {
                  type: "component",
                  componentName: "visualization",
                  title: "",
                  tooltip: "",
                  componentState: { label: "C" },
                },
              ],
            },
          ],
        },
      ],
    };
    $("#genetic-opt").click(t);
    r = new GoldenLayout(i, document.querySelector("#linear-solver-layout"));

    r.registerComponent("visualization", function (t, n) {
      e = new Genetic.Visualization("1D", t.getElement()[0]);
    }),
      r.init();
  });
function getf(n) {
  hold = n % 1;
  hold = hold / 0.03125;
  hold = Math.round(hold);
  if (n % 1 == 0) {
    return n;
  }
  if (hold == 32) {
    real = n - (n % 1);
    return `${real + 1}`;
  }
  if ((hold / 2) % 1 == 0) {
    hold /= 2;
    if ((hold / 2) % 1 == 0) {
      hold /= 2;
      if ((hold / 2) % 1 == 0) {
        hold /= 2;
        if ((hold / 2) % 1 == 0) {
          hold /= 2;
          if ((hold / 2) % 1 == 0) {
            hold /= 2;
          } else {
            real = n - (n % 1);
            return `${real} ${hold}/2`;
          }
        } else {
          //is 16ths
          real = n - (n % 1);
          return `${real} ${hold}/4`;
        }
      } else {
        //is 16ths
        real = n - (n % 1);
        return `${real} ${hold}/8`;
      }
    } else {
      //is 16ths
      real = n - (n % 1);
      return `${real} ${hold}/16`;
    }
  } else {
    //is 32nds
    real = n - (n % 1);
    return `${real} ${hold}/32`;
  }
}
function getAvg(array) {
  var a = array.filter(function (val) {
    return val !== 0;
  });
  const total = a.reduce((acc, c) => acc + c, 0);
  return total / a.length;
}



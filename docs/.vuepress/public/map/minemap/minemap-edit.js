!(function (e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = e())
    : 'function' == typeof define && define.amd
    ? define([], e)
    : (('undefined' != typeof window
        ? window
        : 'undefined' != typeof global
        ? global
        : 'undefined' != typeof self
        ? self
        : this
      ).edit = e());
})(function () {
  return (function o(n, i, s) {
    function a(t, e) {
      if (!i[t]) {
        if (!n[t]) {
          var r = 'function' == typeof require && require;
          if (!e && r) return r(t, !0);
          if (c) return c(t, !0);
          throw (((r = new Error("Cannot find module '" + t + "'")).code = 'MODULE_NOT_FOUND'), r);
        }
        (r = i[t] = { exports: {} }),
          n[t][0].call(
            r.exports,
            function (e) {
              return a(n[t][1][e] || e);
            },
            r,
            r.exports,
            o,
            n,
            i,
            s,
          );
      }
      return i[t].exports;
    }
    for (var c = 'function' == typeof require && require, e = 0; e < s.length; e++) a(s[e]);
    return a;
  })(
    {
      1: [
        function (e, t, r) {
          function o(e) {
            if (!(this instanceof o)) return new o(e);
            (this._bbox = e || [1 / 0, 1 / 0, -1 / 0, -1 / 0]), (this._valid = !!e);
          }
          ((t.exports = o).prototype.include = function (e) {
            return (
              (this._valid = !0),
              (this._bbox[0] = Math.min(this._bbox[0], e[0])),
              (this._bbox[1] = Math.min(this._bbox[1], e[1])),
              (this._bbox[2] = Math.max(this._bbox[2], e[0])),
              (this._bbox[3] = Math.max(this._bbox[3], e[1])),
              this
            );
          }),
            (o.prototype.equals = function (e) {
              e = e instanceof o ? e.bbox() : e;
              return (
                this._bbox[0] == e[0] &&
                this._bbox[1] == e[1] &&
                this._bbox[2] == e[2] &&
                this._bbox[3] == e[3]
              );
            }),
            (o.prototype.center = function (e) {
              return this._valid
                ? [(this._bbox[0] + this._bbox[2]) / 2, (this._bbox[1] + this._bbox[3]) / 2]
                : null;
            }),
            (o.prototype.union = function (e) {
              return (
                (this._valid = !0),
                (e = e instanceof o ? e.bbox() : e),
                (this._bbox[0] = Math.min(this._bbox[0], e[0])),
                (this._bbox[1] = Math.min(this._bbox[1], e[1])),
                (this._bbox[2] = Math.max(this._bbox[2], e[2])),
                (this._bbox[3] = Math.max(this._bbox[3], e[3])),
                this
              );
            }),
            (o.prototype.bbox = function () {
              return this._valid ? this._bbox : null;
            }),
            (o.prototype.contains = function (e) {
              if (!e) return this._fastContains();
              if (!this._valid) return null;
              var t = e[0],
                e = e[1];
              return (
                this._bbox[0] <= t && this._bbox[1] <= e && this._bbox[2] >= t && this._bbox[3] >= e
              );
            }),
            (o.prototype.intersect = function (e) {
              if (!this._valid) return null;
              e = e instanceof o ? e.bbox() : e;
              return !(
                this._bbox[0] > e[2] ||
                this._bbox[2] < e[0] ||
                this._bbox[3] < e[1] ||
                this._bbox[1] > e[3]
              );
            }),
            (o.prototype._fastContains = function () {
              if (!this._valid) return new Function('return null;');
              var e =
                'return ' +
                this._bbox[0] +
                '<= ll[0] &&' +
                this._bbox[1] +
                '<= ll[1] &&' +
                this._bbox[2] +
                '>= ll[0] &&' +
                this._bbox[3] +
                '>= ll[1]';
              return new Function('ll', e);
            }),
            (o.prototype.polygon = function () {
              return this._valid
                ? {
                    type: 'Polygon',
                    coordinates: [
                      [
                        [this._bbox[0], this._bbox[1]],
                        [this._bbox[2], this._bbox[1]],
                        [this._bbox[2], this._bbox[3]],
                        [this._bbox[0], this._bbox[3]],
                        [this._bbox[0], this._bbox[1]],
                      ],
                    ],
                  }
                : null;
            });
        },
        {},
      ],
      2: [
        function (e, t, r) {
          var u = e('wgs84');
          function n(e) {
            var t = 0;
            if (e && 0 < e.length) {
              t += Math.abs(o(e[0]));
              for (var r = 1; r < e.length; r++) t -= Math.abs(o(e[r]));
            }
            return t;
          }
          function o(e) {
            var t,
              r,
              o,
              n,
              i,
              s,
              a = 0,
              c = e.length;
            if (2 < c) {
              for (s = 0; s < c; s++)
                (i =
                  s === c - 2
                    ? ((o = c - 2), (n = c - 1), 0)
                    : s === c - 1
                    ? ((o = c - 1), (n = 0), 1)
                    : ((n = (o = s) + 1), s + 2)),
                  (t = e[o]),
                  (r = e[n]),
                  (a += (l(e[i][0]) - l(t[0])) * Math.sin(l(r[1])));
              a = (a * u.RADIUS * u.RADIUS) / 2;
            }
            return a;
          }
          function l(e) {
            return (e * Math.PI) / 180;
          }
          (t.exports.geometry = function e(t) {
            var r,
              o = 0;
            switch (t.type) {
              case 'Polygon':
                return n(t.coordinates);
              case 'MultiPolygon':
                for (r = 0; r < t.coordinates.length; r++) o += n(t.coordinates[r]);
                return o;
              case 'Point':
              case 'MultiPoint':
              case 'LineString':
              case 'MultiLineString':
                return 0;
              case 'GeometryCollection':
                for (r = 0; r < t.geometries.length; r++) o += e(t.geometries[r]);
                return o;
            }
          }),
            (t.exports.ring = o);
        },
        { wgs84: 169 },
      ],
      3: [
        function (e, t, r) {
          t.exports = function (e) {
            return (function r(e) {
              if (Array.isArray(e) && e.length && 'number' == typeof e[0]) return [e];
              return e.reduce(function (e, t) {
                return Array.isArray(t) && Array.isArray(t[0]) ? e.concat(r(t)) : (e.push(t), e);
              }, []);
            })(e);
          };
        },
        {},
      ],
      4: [
        function (e, t, r) {
          var o = e('@mapbox/geojson-normalize'),
            n = e('geojson-flatten'),
            i = e('./flatten');
          t.exports = function (e) {
            if (!e) return [];
            var e = n(o(e)),
              t = [];
            return (
              e.features.forEach(function (e) {
                e.geometry && (t = t.concat(i(e.geometry.coordinates)));
              }),
              t
            );
          };
        },
        { './flatten': 3, '@mapbox/geojson-normalize': 6, 'geojson-flatten': 47 },
      ],
      5: [
        function (e, t, r) {
          var n = e('@mapbox/geojson-coords'),
            o = e('traverse'),
            i = e('@mapbox/extent'),
            s = {
              features: ['FeatureCollection'],
              coordinates: [
                'Point',
                'MultiPoint',
                'LineString',
                'MultiLineString',
                'Polygon',
                'MultiPolygon',
              ],
              geometry: ['Feature'],
              geometries: ['GeometryCollection'],
            },
            a = Object.keys(s);
          function c(e) {
            for (var t = i(), r = n(e), o = 0; o < r.length; o++) t.include(r[o]);
            return t;
          }
          (t.exports = function (e) {
            return c(e).bbox();
          }),
            (t.exports.polygon = function (e) {
              return c(e).polygon();
            }),
            (t.exports.bboxify = function (e) {
              return o(e).map(function (t) {
                t &&
                  a.some(function (e) {
                    return !!t[e] && -1 !== s[e].indexOf(t.type);
                  }) &&
                  ((t.bbox = c(t).bbox()), this.update(t));
              });
            });
        },
        { '@mapbox/extent': 1, '@mapbox/geojson-coords': 4, traverse: 168 },
      ],
      6: [
        function (e, t, r) {
          t.exports = function (e) {
            if (!e || !e.type) return null;
            var t = o[e.type];
            if (!t) return null;
            return 'geometry' === t
              ? {
                  type: 'FeatureCollection',
                  features: [{ type: 'Feature', properties: {}, geometry: e }],
                }
              : 'feature' === t
              ? { type: 'FeatureCollection', features: [e] }
              : 'featurecollection' === t
              ? e
              : void 0;
          };
          var o = {
            Point: 'geometry',
            MultiPoint: 'geometry',
            LineString: 'geometry',
            MultiLineString: 'geometry',
            Polygon: 'geometry',
            MultiPolygon: 'geometry',
            GeometryCollection: 'geometry',
            Feature: 'feature',
            FeatureCollection: 'featurecollection',
          };
        },
        {},
      ],
      7: [
        function (e, t, r) {
          var i = e('jsonlint-lines'),
            s = e('./object');
          t.exports.hint = function (e, t) {
            var r,
              o = [];
            if ('object' == typeof e) r = e;
            else {
              if ('string' != typeof e)
                return [{ message: 'Expected string or object as input', line: 0 }];
              try {
                r = i.parse(e);
              } catch (e) {
                var n = e.message.match(/line (\d+)/);
                return [{ line: parseInt(n[1], 10) - 1, message: e.message, error: e }];
              }
            }
            return (o = o.concat(s.hint(r, t)));
          };
        },
        { './object': 8, 'jsonlint-lines': 49 },
      ],
      8: [
        function (e, t, r) {
          var g = e('./rhr');
          t.exports.hint = function (e, n) {
            var i = [],
              s = 0,
              t = 10,
              a = 6;
            function r(e) {
              var t;
              (n && !1 === n.noDuplicateMembers) ||
                !e.__duplicateProperties__ ||
                i.push({
                  message:
                    'An object contained duplicate members, making parsing ambigous: ' +
                    e.__duplicateProperties__.join(', '),
                  line: e.__line__,
                }),
                o(e, 'type', 'string') ||
                  (f[e.type]
                    ? e && f[e.type](e)
                    : void 0 !== (t = y[e.type.toLowerCase()])
                    ? i.push({
                        message: 'Expected ' + t + ' but got ' + e.type + ' (case sensitive)',
                        line: e.__line__,
                      })
                    : i.push({ message: 'The type ' + e.type + ' is unknown', line: e.__line__ }));
            }
            function c(e, t) {
              return e.every(function (e) {
                return null !== e && typeof e === t;
              });
            }
            function o(e, t, r) {
              return void 0 === e[t]
                ? i.push({ message: '"' + t + '" member required', line: e.__line__ })
                : 'array' === r
                ? !Array.isArray(e[t]) &&
                  i.push({
                    message:
                      '"' +
                      t +
                      '" member should be an array, but is an ' +
                      typeof e[t] +
                      ' instead',
                    line: e.__line__,
                  })
                : 'object' === r && e[t] && e[t].constructor !== Object
                ? i.push({
                    message:
                      '"' +
                      t +
                      '" member should be ' +
                      r +
                      ', but is an ' +
                      e[t].constructor.name +
                      ' instead',
                    line: e.__line__,
                  })
                : r &&
                  typeof e[t] !== r &&
                  i.push({
                    message:
                      '"' +
                      t +
                      '" member should be ' +
                      r +
                      ', but is an ' +
                      typeof e[t] +
                      ' instead',
                    line: e.__line__,
                  });
            }
            function u(r, o) {
              if (!Array.isArray(r))
                return i.push({
                  message: 'position should be an array, is a ' + typeof r + ' instead',
                  line: r.__line__ || o,
                });
              if (r.length < 2)
                return i.push({
                  message: 'position must have 2 or more elements',
                  line: r.__line__ || o,
                });
              if (3 < r.length)
                return i.push({
                  message: 'position should not have more than 3 elements',
                  level: 'message',
                  line: r.__line__ || o,
                });
              if (!c(r, 'number'))
                return i.push({
                  message: 'each element in a position must be a number',
                  line: r.__line__ || o,
                });
              if (n && n.precisionWarning) {
                if (s === t)
                  return (
                    (s += 1),
                    i.push({
                      message:
                        "truncated warnings: we've encountered coordinate precision warning " +
                        t +
                        ' times, no more warnings will be reported',
                      level: 'message',
                      line: r.__line__ || o,
                    })
                  );
                s < t &&
                  r.forEach(function (e) {
                    var t = 0,
                      e = String(e).split('.')[1];
                    if ((void 0 !== e && (t = e.length), a < t))
                      return (
                        (s += 1),
                        i.push({
                          message: 'precision of coordinates should be reduced',
                          level: 'message',
                          line: r.__line__ || o,
                        })
                      );
                  });
              }
            }
            function l(r, t, o, n) {
              if ((void 0 === n && void 0 !== r.__line__ && (n = r.__line__), 0 === o))
                return u(r, n);
              if (1 === o && t)
                if ('LinearRing' === t) {
                  if (!Array.isArray(r[r.length - 1]))
                    return (
                      i.push({
                        message:
                          'a number was found where a coordinate array should have been found: this needs to be nested more deeply',
                        line: n,
                      }),
                      !0
                    );
                  if (
                    (r.length < 4 &&
                      i.push({
                        message: 'a LinearRing of coordinates needs to have four or more positions',
                        line: n,
                      }),
                    r.length &&
                      (r[r.length - 1].length !== r[0].length ||
                        !r[r.length - 1].every(function (e, t) {
                          return r[0][t] === e;
                        })))
                  )
                    return (
                      i.push({
                        message:
                          'the first and last positions in a LinearRing of coordinates must be the same',
                        line: n,
                      }),
                      !0
                    );
                } else if ('Line' === t && r.length < 2)
                  return i.push({
                    message: 'a line needs to have two or more coordinates to be valid',
                    line: n,
                  });
              if (Array.isArray(r))
                return r
                  .map(function (e) {
                    return l(e, t, o - 1, e.__line__ || n);
                  })
                  .some(function (e) {
                    return e;
                  });
              i.push({
                message:
                  'a number was found where a coordinate array should have been found: this needs to be nested more deeply',
                line: n,
              });
            }
            function p(e) {
              e.crs &&
                ('object' == typeof e.crs &&
                e.crs.properties &&
                'urn:ogc:def:crs:OGC:1.3:CRS84' === e.crs.properties.name
                  ? i.push({
                      message:
                        'old-style crs member is not recommended, this object is equivalent to the default and should be removed',
                      line: e.__line__,
                    })
                  : i.push({
                      message: 'old-style crs member is not recommended',
                      line: e.__line__,
                    }));
            }
            function d(e) {
              return (
                e.bbox &&
                (Array.isArray(e.bbox)
                  ? (c(e.bbox, 'number') ||
                      i.push({
                        message: 'each element in a bbox member must be a number',
                        line: e.bbox.__line__,
                      }),
                    4 !== e.bbox.length &&
                      6 !== e.bbox.length &&
                      i.push({
                        message: 'bbox must contain 4 elements (for 2D) or 6 elements (for 3D)',
                        line: e.bbox.__line__,
                      }),
                    i.length)
                  : void i.push({
                      message: 'bbox member must be an array of numbers, but is a ' + typeof e.bbox,
                      line: e.__line__,
                    }))
              );
            }
            function h(e) {
              p(e),
                d(e),
                void 0 !== e.id &&
                  'string' != typeof e.id &&
                  'number' != typeof e.id &&
                  i.push({
                    message: 'Feature "id" member must have a string or number value',
                    line: e.__line__,
                  }),
                void 0 !== e.features &&
                  i.push({
                    message: 'Feature object cannot contain a "features" member',
                    line: e.__line__,
                  }),
                void 0 !== e.coordinates &&
                  i.push({
                    message: 'Feature object cannot contain a "coordinates" member',
                    line: e.__line__,
                  }),
                'Feature' !== e.type &&
                  i.push({
                    message: 'GeoJSON features must have a type=feature member',
                    line: e.__line__,
                  }),
                o(e, 'properties', 'object'),
                o(e, 'geometry', 'object') || (e.geometry && r(e.geometry));
            }
            var f = {
                Point: function (e) {
                  var t;
                  p(e),
                    d(e),
                    void 0 !== (t = e).properties &&
                      i.push({
                        message: 'geometry object cannot contain a "properties" member',
                        line: t.__line__,
                      }),
                    void 0 !== t.geometry &&
                      i.push({
                        message: 'geometry object cannot contain a "geometry" member',
                        line: t.__line__,
                      }),
                    void 0 !== t.features &&
                      i.push({
                        message: 'geometry object cannot contain a "features" member',
                        line: t.__line__,
                      }),
                    o(e, 'coordinates', 'array') || u(e.coordinates);
                },
                Feature: h,
                MultiPoint: function (e) {
                  p(e), d(e), o(e, 'coordinates', 'array') || l(e.coordinates, '', 1);
                },
                LineString: function (e) {
                  p(e), d(e), o(e, 'coordinates', 'array') || l(e.coordinates, 'Line', 1);
                },
                MultiLineString: function (e) {
                  p(e), d(e), o(e, 'coordinates', 'array') || l(e.coordinates, 'Line', 2);
                },
                FeatureCollection: function (e) {
                  if (
                    (p(e),
                    d(e),
                    void 0 !== e.properties &&
                      i.push({
                        message: 'FeatureCollection object cannot contain a "properties" member',
                        line: e.__line__,
                      }),
                    void 0 !== e.coordinates &&
                      i.push({
                        message: 'FeatureCollection object cannot contain a "coordinates" member',
                        line: e.__line__,
                      }),
                    !o(e, 'features', 'array'))
                  ) {
                    if (!c(e.features, 'object'))
                      return i.push({
                        message: 'Every feature must be an object',
                        line: e.__line__,
                      });
                    e.features.forEach(h);
                  }
                },
                GeometryCollection: function (t) {
                  p(t),
                    d(t),
                    o(t, 'geometries', 'array') ||
                      (c(t.geometries, 'object') ||
                        i.push({
                          message:
                            'The geometries array in a GeometryCollection must contain only geometry objects',
                          line: t.__line__,
                        }),
                      1 === t.geometries.length &&
                        i.push({
                          message:
                            'GeometryCollection with a single geometry should be avoided in favor of single part or a single object of multi-part type',
                          line: t.geometries.__line__,
                        }),
                      t.geometries.forEach(function (e) {
                        e &&
                          ('GeometryCollection' === e.type &&
                            i.push({
                              message:
                                'GeometryCollection should avoid nested geometry collections',
                              line: t.geometries.__line__,
                            }),
                          r(e));
                      }));
                },
                Polygon: function (e) {
                  p(e),
                    d(e),
                    o(e, 'coordinates', 'array') || l(e.coordinates, 'LinearRing', 2) || g(e, i);
                },
                MultiPolygon: function (e) {
                  p(e),
                    d(e),
                    o(e, 'coordinates', 'array') || l(e.coordinates, 'LinearRing', 3) || g(e, i);
                },
              },
              y = Object.keys(f).reduce(function (e, t) {
                return (e[t.toLowerCase()] = t), e;
              }, {});
            return (
              'object' != typeof e || null == e
                ? i.push({ message: 'The root of a GeoJSON object must be an object.', line: 0 })
                : (r(e),
                  i.forEach(function (e) {
                    !{}.hasOwnProperty.call(e, 'line') || void 0 !== e.line || delete e.line;
                  })),
              i
            );
          };
        },
        { './rhr': 9 },
      ],
      9: [
        function (e, t, r) {
          function i(e) {
            return (e * Math.PI) / 180;
          }
          function o(e) {
            var t = 0;
            if (2 < e.length)
              for (var r, o, n = 0; n < e.length - 1; n++)
                (r = e[n]),
                  (t += i((o = e[n + 1])[0] - r[0]) * (2 + Math.sin(i(r[1])) + Math.sin(i(o[1]))));
            return 0 <= t;
          }
          function n(e) {
            if (e && 0 < e.length) {
              if (o(e[0])) return !1;
              if (!e.slice(1, e.length).every(o)) return !1;
            }
            return !0;
          }
          t.exports = function (e, t) {
            var r;
            ('Polygon' === (r = e).type
              ? n(r.coordinates)
              : 'MultiPolygon' === r.type && r.coordinates.every(n)) ||
              t.push({
                message: 'Polygons and MultiPolygons should follow the right-hand rule',
                level: 'message',
                line: e.__line__,
              });
          };
        },
        {},
      ],
      10: [
        function (e, t, r) {
          'use strict';
          function o(e, t) {
            (this.x = e), (this.y = t);
          }
          ((t.exports = o).prototype = {
            clone: function () {
              return new o(this.x, this.y);
            },
            add: function (e) {
              return this.clone()._add(e);
            },
            sub: function (e) {
              return this.clone()._sub(e);
            },
            multByPoint: function (e) {
              return this.clone()._multByPoint(e);
            },
            divByPoint: function (e) {
              return this.clone()._divByPoint(e);
            },
            mult: function (e) {
              return this.clone()._mult(e);
            },
            div: function (e) {
              return this.clone()._div(e);
            },
            rotate: function (e) {
              return this.clone()._rotate(e);
            },
            rotateAround: function (e, t) {
              return this.clone()._rotateAround(e, t);
            },
            matMult: function (e) {
              return this.clone()._matMult(e);
            },
            unit: function () {
              return this.clone()._unit();
            },
            perp: function () {
              return this.clone()._perp();
            },
            round: function () {
              return this.clone()._round();
            },
            mag: function () {
              return Math.sqrt(this.x * this.x + this.y * this.y);
            },
            equals: function (e) {
              return this.x === e.x && this.y === e.y;
            },
            dist: function (e) {
              return Math.sqrt(this.distSqr(e));
            },
            distSqr: function (e) {
              var t = e.x - this.x,
                e = e.y - this.y;
              return t * t + e * e;
            },
            angle: function () {
              return Math.atan2(this.y, this.x);
            },
            angleTo: function (e) {
              return Math.atan2(this.y - e.y, this.x - e.x);
            },
            angleWith: function (e) {
              return this.angleWithSep(e.x, e.y);
            },
            angleWithSep: function (e, t) {
              return Math.atan2(this.x * t - this.y * e, this.x * e + this.y * t);
            },
            _matMult: function (e) {
              var t = e[0] * this.x + e[1] * this.y,
                e = e[2] * this.x + e[3] * this.y;
              return (this.x = t), (this.y = e), this;
            },
            _add: function (e) {
              return (this.x += e.x), (this.y += e.y), this;
            },
            _sub: function (e) {
              return (this.x -= e.x), (this.y -= e.y), this;
            },
            _mult: function (e) {
              return (this.x *= e), (this.y *= e), this;
            },
            _div: function (e) {
              return (this.x /= e), (this.y /= e), this;
            },
            _multByPoint: function (e) {
              return (this.x *= e.x), (this.y *= e.y), this;
            },
            _divByPoint: function (e) {
              return (this.x /= e.x), (this.y /= e.y), this;
            },
            _unit: function () {
              return this._div(this.mag()), this;
            },
            _perp: function () {
              var e = this.y;
              return (this.y = this.x), (this.x = -e), this;
            },
            _rotate: function (e) {
              var t = Math.cos(e),
                r = Math.sin(e),
                e = t * this.x - r * this.y,
                t = r * this.x + t * this.y;
              return (this.x = e), (this.y = t), this;
            },
            _rotateAround: function (e, t) {
              var r = Math.cos(e),
                o = Math.sin(e),
                e = t.x + r * (this.x - t.x) - o * (this.y - t.y),
                t = t.y + o * (this.x - t.x) + r * (this.y - t.y);
              return (this.x = e), (this.y = t), this;
            },
            _round: function () {
              return (this.x = Math.round(this.x)), (this.y = Math.round(this.y)), this;
            },
          }),
            (o.convert = function (e) {
              return !(e instanceof o) && Array.isArray(e) ? new o(e[0], e[1]) : e;
            });
        },
        {},
      ],
      11: [
        function (e, t, r) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 });
          var o = e('@turf/meta');
          function n(e) {
            var t = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
            return (
              o.coordEach(e, function (e) {
                t[0] > e[0] && (t[0] = e[0]),
                  t[1] > e[1] && (t[1] = e[1]),
                  t[2] < e[0] && (t[2] = e[0]),
                  t[3] < e[1] && (t[3] = e[1]);
              }),
              t
            );
          }
          (n.default = n), (r.default = n);
        },
        { '@turf/meta': 31 },
      ],
      12: [
        function (e, t, r) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 });
          var i = e('@turf/helpers'),
            s = e('@turf/invariant');
          function a(e, t, r) {
            if ((void 0 === r && (r = {}), !0 === r.final))
              return (function (e, t) {
                e = a(t, e);
                return (e = (e + 180) % 360);
              })(e, t);
            var o = s.getCoord(e),
              n = s.getCoord(t),
              r = i.degreesToRadians(o[0]),
              e = i.degreesToRadians(n[0]),
              t = i.degreesToRadians(o[1]),
              o = i.degreesToRadians(n[1]),
              n = Math.sin(e - r) * Math.cos(o),
              r = Math.cos(t) * Math.sin(o) - Math.sin(t) * Math.cos(o) * Math.cos(e - r);
            return i.radiansToDegrees(Math.atan2(n, r));
          }
          r.default = a;
        },
        { '@turf/helpers': 21, '@turf/invariant': 23 },
      ],
      13: [
        function (e, t, r) {
          'use strict';
          var o =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
          Object.defineProperty(r, '__esModule', { value: !0 });
          var c = e('@turf/helpers'),
            u = e('@turf/invariant'),
            l = o(e('./lib/spline'));
          r.default = function (e, t) {
            void 0 === t && (t = {});
            for (
              var r = t.resolution || 1e4,
                o = t.sharpness || 0.85,
                n = [],
                e = u.getGeom(e).coordinates.map(function (e) {
                  return { x: e[0], y: e[1] };
                }),
                i = new l.default({ duration: r, points: e, sharpness: o }),
                s = function (e) {
                  var t = i.pos(e);
                  Math.floor(e / 100) % 2 == 0 && n.push([t.x, t.y]);
                },
                a = 0;
              a < i.duration;
              a += 10
            )
              s(a);
            return s(i.duration), c.lineString(n, t.properties);
          };
        },
        { './lib/spline': 14, '@turf/helpers': 21, '@turf/invariant': 23 },
      ],
      14: [
        function (e, t, r) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 });
          var o =
            ((n.prototype.cacheSteps = function (e) {
              var t = [],
                r = this.pos(0);
              t.push(0);
              for (var o = 0; o < this.duration; o += 10) {
                var n = this.pos(o);
                e <
                  Math.sqrt(
                    (n.x - r.x) * (n.x - r.x) +
                      (n.y - r.y) * (n.y - r.y) +
                      (n.z - r.z) * (n.z - r.z),
                  ) && (t.push(o), (r = n));
              }
              return t;
            }),
            (n.prototype.vector = function (e) {
              var t = this.pos(e + 10),
                e = this.pos(e - 10);
              return {
                angle: (180 * Math.atan2(t.y - e.y, t.x - e.x)) / 3.14,
                speed: Math.sqrt(
                  (e.x - t.x) * (e.x - t.x) + (e.y - t.y) * (e.y - t.y) + (e.z - t.z) * (e.z - t.z),
                ),
              };
            }),
            (n.prototype.pos = function (e) {
              var t = e - this.delay;
              t < 0 && (t = 0), t > this.duration && (t = this.duration - 1);
              e = t / this.duration;
              if (1 <= e) return this.points[this.length - 1];
              t = Math.floor((this.points.length - 1) * e);
              return (function (e, t, r, o, n) {
                e = (function (e) {
                  var t = e * e;
                  return [
                    t * e,
                    3 * t * (1 - e),
                    3 * e * (1 - e) * (1 - e),
                    (1 - e) * (1 - e) * (1 - e),
                  ];
                })(e);
                return {
                  x: n.x * e[0] + o.x * e[1] + r.x * e[2] + t.x * e[3],
                  y: n.y * e[0] + o.y * e[1] + r.y * e[2] + t.y * e[3],
                  z: n.z * e[0] + o.z * e[1] + r.z * e[2] + t.z * e[3],
                };
              })(
                (this.length - 1) * e - t,
                this.points[t],
                this.controls[t][1],
                this.controls[t + 1][0],
                this.points[t + 1],
              );
            }),
            n);
          function n(e) {
            (this.points = e.points || []),
              (this.duration = e.duration || 1e4),
              (this.sharpness = e.sharpness || 0.85),
              (this.centers = []),
              (this.controls = []),
              (this.stepLength = e.stepLength || 60),
              (this.length = this.points.length);
            for (var t = (this.delay = 0); t < this.length; t++)
              this.points[t].z = this.points[t].z || 0;
            for (t = 0; t < this.length - 1; t++) {
              var r = this.points[t],
                o = this.points[t + 1];
              this.centers.push({ x: (r.x + o.x) / 2, y: (r.y + o.y) / 2, z: (r.z + o.z) / 2 });
            }
            this.controls.push([this.points[0], this.points[0]]);
            for (t = 0; t < this.centers.length - 1; t++) {
              var n = this.points[t + 1].x - (this.centers[t].x + this.centers[t + 1].x) / 2,
                i = this.points[t + 1].y - (this.centers[t].y + this.centers[t + 1].y) / 2,
                s = this.points[t + 1].z - (this.centers[t].y + this.centers[t + 1].z) / 2;
              this.controls.push([
                {
                  x:
                    (1 - this.sharpness) * this.points[t + 1].x +
                    this.sharpness * (this.centers[t].x + n),
                  y:
                    (1 - this.sharpness) * this.points[t + 1].y +
                    this.sharpness * (this.centers[t].y + i),
                  z:
                    (1 - this.sharpness) * this.points[t + 1].z +
                    this.sharpness * (this.centers[t].z + s),
                },
                {
                  x:
                    (1 - this.sharpness) * this.points[t + 1].x +
                    this.sharpness * (this.centers[t + 1].x + n),
                  y:
                    (1 - this.sharpness) * this.points[t + 1].y +
                    this.sharpness * (this.centers[t + 1].y + i),
                  z:
                    (1 - this.sharpness) * this.points[t + 1].z +
                    this.sharpness * (this.centers[t + 1].z + s),
                },
              ]);
            }
            return (
              this.controls.push([this.points[this.length - 1], this.points[this.length - 1]]),
              (this.steps = this.cacheSteps(this.stepLength)),
              this
            );
          }
          r.default = o;
        },
        {},
      ],
      15: [
        function (e, t, r) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 });
          var i = e('@turf/meta'),
            s = e('@turf/helpers');
          r.default = function (e, t) {
            void 0 === t && (t = {});
            var r = 0,
              o = 0,
              n = 0;
            return (
              i.coordEach(
                e,
                function (e) {
                  (r += e[0]), (o += e[1]), n++;
                },
                !0,
              ),
              s.point([r / n, o / n], t.properties)
            );
          };
        },
        { '@turf/helpers': 21, '@turf/meta': 31 },
      ],
      16: [
        function (e, t, r) {
          'use strict';
          var o =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
          Object.defineProperty(r, '__esModule', { value: !0 });
          var a = o(e('@turf/destination')),
            c = e('@turf/helpers');
          r.default = function (e, t, r) {
            void 0 === r && (r = {});
            for (
              var o = r.steps || 64,
                n =
                  r.properties ||
                  (!Array.isArray(e) && 'Feature' === e.type && e.properties ? e.properties : {}),
                i = [],
                s = 0;
              s < o;
              s++
            )
              i.push(a.default(e, t, (-360 * s) / o, r).geometry.coordinates);
            return i.push(i[0]), c.polygon([i], n);
          };
        },
        { '@turf/destination': 19, '@turf/helpers': 21 },
      ],
      17: [
        function (e, t, r) {
          'use strict';
          function o(t) {
            var r = { type: 'Feature' };
            return (
              Object.keys(t).forEach(function (e) {
                switch (e) {
                  case 'type':
                  case 'properties':
                  case 'geometry':
                    return;
                  default:
                    r[e] = t[e];
                }
              }),
              (r.properties = (function r(o) {
                var n = {};
                if (!o) return n;
                Object.keys(o).forEach(function (e) {
                  var t = o[e];
                  'object' == typeof t
                    ? null === t
                      ? (n[e] = null)
                      : Array.isArray(t)
                      ? (n[e] = t.map(function (e) {
                          return e;
                        }))
                      : (n[e] = r(t))
                    : (n[e] = t);
                });
                return n;
              })(t.properties)),
              (r.geometry = n(t.geometry)),
              r
            );
          }
          function n(e) {
            var t = { type: e.type };
            return (
              e.bbox && (t.bbox = e.bbox),
              'GeometryCollection' === e.type
                ? (t.geometries = e.geometries.map(n))
                : (t.coordinates = (function t(e) {
                    var e = e;
                    if ('object' != typeof e[0]) return e.slice();
                    return e.map(function (e) {
                      return t(e);
                    });
                  })(e.coordinates)),
              t
            );
          }
          Object.defineProperty(r, '__esModule', { value: !0 }),
            (r.default = function (e) {
              if (!e) throw new Error('geojson is required');
              switch (e.type) {
                case 'Feature':
                  return o(e);
                case 'FeatureCollection':
                  return (
                    (t = e),
                    (r = { type: 'FeatureCollection' }),
                    Object.keys(t).forEach(function (e) {
                      switch (e) {
                        case 'type':
                        case 'features':
                          return;
                        default:
                          r[e] = t[e];
                      }
                    }),
                    (r.features = t.features.map(o)),
                    r
                  );
                case 'Point':
                case 'LineString':
                case 'Polygon':
                case 'MultiPoint':
                case 'MultiLineString':
                case 'MultiPolygon':
                case 'GeometryCollection':
                  return n(e);
                default:
                  throw new Error('unknown GeoJSON type');
              }
              var t, r;
            });
        },
        {},
      ],
      18: [
        function (e, t, r) {
          'use strict';
          var o =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
          Object.defineProperty(r, '__esModule', { value: !0 });
          var n = e('@turf/helpers'),
            i = e('@turf/meta'),
            s = o(e('concaveman'));
          r.default = function (e, t) {
            void 0 === t && (t = {}), (t.concavity = t.concavity || 1 / 0);
            var r = [];
            return (
              i.coordEach(e, function (e) {
                r.push([e[0], e[1]]);
              }),
              r.length && 3 < (t = s.default(r, t.concavity)).length ? n.polygon([t]) : null
            );
          };
        },
        { '@turf/helpers': 21, '@turf/meta': 31, concaveman: 46 },
      ],
      19: [
        function (e, t, r) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 });
          var s = e('@turf/helpers'),
            a = e('@turf/invariant');
          r.default = function (e, t, r, o) {
            void 0 === o && (o = {});
            var n = a.getCoord(e),
              i = s.degreesToRadians(n[0]),
              e = s.degreesToRadians(n[1]),
              n = s.degreesToRadians(r),
              r = s.lengthToRadians(t, o.units),
              t = Math.asin(Math.sin(e) * Math.cos(r) + Math.cos(e) * Math.sin(r) * Math.cos(n)),
              e =
                i +
                Math.atan2(
                  Math.sin(n) * Math.sin(r) * Math.cos(e),
                  Math.cos(r) - Math.sin(e) * Math.sin(t),
                ),
              e = s.radiansToDegrees(e),
              t = s.radiansToDegrees(t);
            return s.point([e, t], o.properties);
          };
        },
        { '@turf/helpers': 21, '@turf/invariant': 23 },
      ],
      20: [
        function (e, t, r) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 });
          var i = e('@turf/invariant'),
            s = e('@turf/helpers');
          r.default = function (e, t, r) {
            void 0 === r && (r = {});
            var o = i.getCoord(e),
              n = i.getCoord(t),
              e = s.degreesToRadians(n[1] - o[1]),
              t = s.degreesToRadians(n[0] - o[0]),
              o = s.degreesToRadians(o[1]),
              n = s.degreesToRadians(n[1]),
              n =
                Math.pow(Math.sin(e / 2), 2) +
                Math.pow(Math.sin(t / 2), 2) * Math.cos(o) * Math.cos(n);
            return s.radiansToLength(2 * Math.atan2(Math.sqrt(n), Math.sqrt(1 - n)), r.units);
          };
        },
        { '@turf/helpers': 21, '@turf/invariant': 23 },
      ],
      21: [
        function (e, t, o) {
          'use strict';
          function a(e, t, r) {
            void 0 === r && (r = {});
            var o = { type: 'Feature' };
            return (
              (0 !== r.id && !r.id) || (o.id = r.id),
              r.bbox && (o.bbox = r.bbox),
              (o.properties = t || {}),
              (o.geometry = e),
              o
            );
          }
          function n(e, t, r) {
            if ((void 0 === r && (r = {}), !e)) throw new Error('coordinates is required');
            if (!Array.isArray(e)) throw new Error('coordinates must be an Array');
            if (e.length < 2) throw new Error('coordinates must be at least 2 numbers long');
            if (!f(e[0]) || !f(e[1])) throw new Error('coordinates must contain numbers');
            return a({ type: 'Point', coordinates: e }, t, r);
          }
          function i(e, t, r) {
            void 0 === r && (r = {});
            for (var o = 0, n = e; o < n.length; o++) {
              var i = n[o];
              if (i.length < 4)
                throw new Error('Each LinearRing of a Polygon must have 4 or more Positions.');
              for (var s = 0; s < i[i.length - 1].length; s++)
                if (i[i.length - 1][s] !== i[0][s])
                  throw new Error('First and last Position are not equivalent.');
            }
            return a({ type: 'Polygon', coordinates: e }, t, r);
          }
          function s(e, t, r) {
            if ((void 0 === r && (r = {}), e.length < 2))
              throw new Error('coordinates must be an array of two or more positions');
            return a({ type: 'LineString', coordinates: e }, t, r);
          }
          function c(e, t) {
            void 0 === t && (t = {});
            var r = { type: 'FeatureCollection' };
            return t.id && (r.id = t.id), t.bbox && (r.bbox = t.bbox), (r.features = e), r;
          }
          function u(e, t, r) {
            return void 0 === r && (r = {}), a({ type: 'MultiLineString', coordinates: e }, t, r);
          }
          function l(e, t, r) {
            return void 0 === r && (r = {}), a({ type: 'MultiPoint', coordinates: e }, t, r);
          }
          function p(e, t, r) {
            return void 0 === r && (r = {}), a({ type: 'MultiPolygon', coordinates: e }, t, r);
          }
          function d(e, t) {
            void 0 === t && (t = 'kilometers');
            var r = o.factors[t];
            if (!r) throw new Error(t + ' units is invalid');
            return e * r;
          }
          function h(e, t) {
            void 0 === t && (t = 'kilometers');
            var r = o.factors[t];
            if (!r) throw new Error(t + ' units is invalid');
            return e / r;
          }
          function r(e) {
            return (180 * (e % (2 * Math.PI))) / Math.PI;
          }
          function f(e) {
            return !isNaN(e) && null !== e && !Array.isArray(e);
          }
          Object.defineProperty(o, '__esModule', { value: !0 }),
            (o.earthRadius = 6371008.8),
            (o.factors = {
              centimeters: 100 * o.earthRadius,
              centimetres: 100 * o.earthRadius,
              degrees: o.earthRadius / 111325,
              feet: 3.28084 * o.earthRadius,
              inches: 39.37 * o.earthRadius,
              kilometers: o.earthRadius / 1e3,
              kilometres: o.earthRadius / 1e3,
              meters: o.earthRadius,
              metres: o.earthRadius,
              miles: o.earthRadius / 1609.344,
              millimeters: 1e3 * o.earthRadius,
              millimetres: 1e3 * o.earthRadius,
              nauticalmiles: o.earthRadius / 1852,
              radians: 1,
              yards: 1.0936 * o.earthRadius,
            }),
            (o.unitsFactors = {
              centimeters: 100,
              centimetres: 100,
              degrees: 1 / 111325,
              feet: 3.28084,
              inches: 39.37,
              kilometers: 0.001,
              kilometres: 0.001,
              meters: 1,
              metres: 1,
              miles: 1 / 1609.344,
              millimeters: 1e3,
              millimetres: 1e3,
              nauticalmiles: 1 / 1852,
              radians: 1 / o.earthRadius,
              yards: 1.0936133,
            }),
            (o.areaFactors = {
              acres: 247105e-9,
              centimeters: 1e4,
              centimetres: 1e4,
              feet: 10.763910417,
              hectares: 1e-4,
              inches: 1550.003100006,
              kilometers: 1e-6,
              kilometres: 1e-6,
              meters: 1,
              metres: 1,
              miles: 386e-9,
              millimeters: 1e6,
              millimetres: 1e6,
              yards: 1.195990046,
            }),
            (o.feature = a),
            (o.geometry = function (e, t, r) {
              switch ((void 0 === r && (r = {}), e)) {
                case 'Point':
                  return n(t).geometry;
                case 'LineString':
                  return s(t).geometry;
                case 'Polygon':
                  return i(t).geometry;
                case 'MultiPoint':
                  return l(t).geometry;
                case 'MultiLineString':
                  return u(t).geometry;
                case 'MultiPolygon':
                  return p(t).geometry;
                default:
                  throw new Error(e + ' is invalid');
              }
            }),
            (o.point = n),
            (o.points = function (e, t, r) {
              return (
                void 0 === r && (r = {}),
                c(
                  e.map(function (e) {
                    return n(e, t);
                  }),
                  r,
                )
              );
            }),
            (o.polygon = i),
            (o.polygons = function (e, t, r) {
              return (
                void 0 === r && (r = {}),
                c(
                  e.map(function (e) {
                    return i(e, t);
                  }),
                  r,
                )
              );
            }),
            (o.lineString = s),
            (o.lineStrings = function (e, t, r) {
              return (
                void 0 === r && (r = {}),
                c(
                  e.map(function (e) {
                    return s(e, t);
                  }),
                  r,
                )
              );
            }),
            (o.featureCollection = c),
            (o.multiLineString = u),
            (o.multiPoint = l),
            (o.multiPolygon = p),
            (o.geometryCollection = function (e, t, r) {
              return (
                void 0 === r && (r = {}), a({ type: 'GeometryCollection', geometries: e }, t, r)
              );
            }),
            (o.round = function (e, t) {
              if ((void 0 === t && (t = 0), t && !(0 <= t)))
                throw new Error('precision must be a positive number');
              return (t = Math.pow(10, t || 0)), Math.round(e * t) / t;
            }),
            (o.radiansToLength = d),
            (o.lengthToRadians = h),
            (o.lengthToDegrees = function (e, t) {
              return r(h(e, t));
            }),
            (o.bearingToAzimuth = function (e) {
              return (e %= 360) < 0 && (e += 360), e;
            }),
            (o.radiansToDegrees = r),
            (o.degreesToRadians = function (e) {
              return ((e % 360) * Math.PI) / 180;
            }),
            (o.convertLength = function (e, t, r) {
              if (
                (void 0 === t && (t = 'kilometers'), void 0 === r && (r = 'kilometers'), !(0 <= e))
              )
                throw new Error('length must be a positive number');
              return d(h(e, t), r);
            }),
            (o.convertArea = function (e, t, r) {
              if ((void 0 === t && (t = 'meters'), void 0 === r && (r = 'kilometers'), !(0 <= e)))
                throw new Error('area must be a positive number');
              if (!(t = o.areaFactors[t])) throw new Error('invalid original units');
              if (!(r = o.areaFactors[r])) throw new Error('invalid final units');
              return (e / t) * r;
            }),
            (o.isNumber = f),
            (o.isObject = function (e) {
              return !!e && e.constructor === Object;
            }),
            (o.validateBBox = function (e) {
              if (!e) throw new Error('bbox is required');
              if (!Array.isArray(e)) throw new Error('bbox must be an Array');
              if (4 !== e.length && 6 !== e.length)
                throw new Error('bbox must be an Array of 4 or 6 numbers');
              e.forEach(function (e) {
                if (!f(e)) throw new Error('bbox must only contain numbers');
              });
            }),
            (o.validateId = function (e) {
              if (!e) throw new Error('id is required');
              if (-1 === ['string', 'number'].indexOf(typeof e))
                throw new Error('id must be a number or a string');
            });
        },
        {},
      ],
      22: [
        function (e, t, r) {
          'use strict';
          var o =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
          Object.defineProperty(r, '__esModule', { value: !0 });
          var n = e('@turf/helpers'),
            i = e('@turf/invariant'),
            s = o(e('polygon-clipping'));
          r.default = function (e, t, r) {
            return (
              void 0 === r && (r = {}),
              (e = i.getGeom(e)),
              (t = i.getGeom(t)),
              0 === (t = s.default.intersection(e.coordinates, t.coordinates)).length
                ? null
                : 1 === t.length
                ? n.polygon(t[0], r.properties)
                : n.multiPolygon(t, r.properties)
            );
          };
        },
        { '@turf/helpers': 21, '@turf/invariant': 23, 'polygon-clipping': 163 },
      ],
      23: [
        function (e, t, r) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 });
          var o = e('@turf/helpers');
          (r.getCoord = function (e) {
            if (!e) throw new Error('coord is required');
            if (!Array.isArray(e)) {
              if ('Feature' === e.type && null !== e.geometry && 'Point' === e.geometry.type)
                return e.geometry.coordinates;
              if ('Point' === e.type) return e.coordinates;
            }
            if (Array.isArray(e) && 2 <= e.length && !Array.isArray(e[0]) && !Array.isArray(e[1]))
              return e;
            throw new Error('coord must be GeoJSON Point or an Array of numbers');
          }),
            (r.getCoords = function (e) {
              if (Array.isArray(e)) return e;
              if ('Feature' === e.type) {
                if (null !== e.geometry) return e.geometry.coordinates;
              } else if (e.coordinates) return e.coordinates;
              throw new Error('coords must be GeoJSON Feature, Geometry Object or an Array');
            }),
            (r.containsNumber = function e(t) {
              if (1 < t.length && o.isNumber(t[0]) && o.isNumber(t[1])) return !0;
              if (Array.isArray(t[0]) && t[0].length) return e(t[0]);
              throw new Error('coordinates must only contain numbers');
            }),
            (r.geojsonType = function (e, t, r) {
              if (!t || !r) throw new Error('type and name required');
              if (!e || e.type !== t)
                throw new Error('Invalid input to ' + r + ': must be a ' + t + ', given ' + e.type);
            }),
            (r.featureOf = function (e, t, r) {
              if (!e) throw new Error('No feature passed');
              if (!r) throw new Error('.featureOf() requires a name');
              if (!e || 'Feature' !== e.type || !e.geometry)
                throw new Error('Invalid input to ' + r + ', Feature with geometry required');
              if (!e.geometry || e.geometry.type !== t)
                throw new Error(
                  'Invalid input to ' + r + ': must be a ' + t + ', given ' + e.geometry.type,
                );
            }),
            (r.collectionOf = function (e, t, r) {
              if (!e) throw new Error('No featureCollection passed');
              if (!r) throw new Error('.collectionOf() requires a name');
              if (!e || 'FeatureCollection' !== e.type)
                throw new Error('Invalid input to ' + r + ', FeatureCollection required');
              for (var o = 0, n = e.features; o < n.length; o++) {
                var i = n[o];
                if (!i || 'Feature' !== i.type || !i.geometry)
                  throw new Error('Invalid input to ' + r + ', Feature with geometry required');
                if (!i.geometry || i.geometry.type !== t)
                  throw new Error(
                    'Invalid input to ' + r + ': must be a ' + t + ', given ' + i.geometry.type,
                  );
              }
            }),
            (r.getGeom = function (e) {
              return 'Feature' === e.type ? e.geometry : e;
            }),
            (r.getType = function (e, t) {
              return 'FeatureCollection' === e.type
                ? 'FeatureCollection'
                : 'GeometryCollection' === e.type
                ? 'GeometryCollection'
                : ('Feature' === e.type && null !== e.geometry ? e.geometry : e).type;
            });
        },
        { '@turf/helpers': 21 },
      ],
      24: [
        function (e, t, r) {
          'use strict';
          var o =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
          Object.defineProperty(r, '__esModule', { value: !0 });
          var n = o(e('@turf/distance')),
            i = e('@turf/meta');
          r.default = function (e, r) {
            return (
              void 0 === r && (r = {}),
              i.segmentReduce(
                e,
                function (e, t) {
                  t = t.geometry.coordinates;
                  return e + n.default(t[0], t[1], r);
                },
                0,
              )
            );
          };
        },
        { '@turf/distance': 20, '@turf/meta': 31 },
      ],
      25: [
        function (e, t, r) {
          'use strict';
          var o =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
          Object.defineProperty(r, '__esModule', { value: !0 });
          var d = o(e('@turf/circle')),
            h = o(e('@turf/destination')),
            f = e('@turf/helpers');
          function y(e) {
            e %= 360;
            return e < 0 && (e += 360), e;
          }
          r.default = function (e, t, r, o, n) {
            void 0 === n && (n = {});
            var i = n.steps || 64,
              s = y(r),
              r = y(o),
              o = Array.isArray(e) || 'Feature' !== e.type ? {} : e.properties;
            if (s === r) return f.lineString(d.default(e, t, n).geometry.coordinates[0], o);
            for (var a = s, c = s < r ? r : r + 360, u = a, l = [], p = 0; u < c; )
              l.push(h.default(e, t, u, n).geometry.coordinates), (u = a + (360 * ++p) / i);
            return c < u && l.push(h.default(e, t, c, n).geometry.coordinates), f.lineString(l, o);
          };
        },
        { '@turf/circle': 16, '@turf/destination': 19, '@turf/helpers': 21 },
      ],
      26: [
        function (e, t, r) {
          'use strict';
          var o =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
          Object.defineProperty(r, '__esModule', { value: !0 });
          var u = e('@turf/helpers'),
            l = e('@turf/invariant'),
            s = o(e('@turf/line-segment')),
            a = e('@turf/meta'),
            c = o(e('geojson-rbush'));
          function p(e, t) {
            var r = l.getCoords(e),
              o = l.getCoords(t);
            if (2 !== r.length)
              throw new Error('<intersects> line1 must only contain 2 coordinates');
            if (2 !== o.length)
              throw new Error('<intersects> line2 must only contain 2 coordinates');
            var n = r[0][0],
              i = r[0][1],
              s = r[1][0],
              a = r[1][1],
              c = o[0][0],
              e = o[0][1],
              t = o[1][0],
              r = o[1][1],
              o = (r - e) * (s - n) - (t - c) * (a - i),
              r = (t - c) * (i - e) - (r - e) * (n - c),
              c = (s - n) * (i - e) - (a - i) * (n - c);
            if (0 == o) return null;
            (r /= o), (o = c / o);
            if (0 <= r && r <= 1 && 0 <= o && o <= 1) {
              (n = n + r * (s - n)), (i = i + r * (a - i));
              return u.point([n, i]);
            }
            return null;
          }
          r.default = function (e, t) {
            var o = {},
              n = [];
            if (
              ('LineString' === e.type && (e = u.feature(e)),
              'LineString' === t.type && (t = u.feature(t)),
              'Feature' === e.type &&
                'Feature' === t.type &&
                null !== e.geometry &&
                null !== t.geometry &&
                'LineString' === e.geometry.type &&
                'LineString' === t.geometry.type &&
                2 === e.geometry.coordinates.length &&
                2 === t.geometry.coordinates.length)
            ) {
              var r = p(e, t);
              return r && n.push(r), u.featureCollection(n);
            }
            var i = c.default();
            return (
              i.load(s.default(t)),
              a.featureEach(s.default(e), function (r) {
                a.featureEach(i.search(r), function (e) {
                  var t = p(r, e);
                  t && ((e = l.getCoords(t).join(',')), o[e] || ((o[e] = !0), n.push(t)));
                });
              }),
              u.featureCollection(n)
            );
          };
        },
        {
          '@turf/helpers': 21,
          '@turf/invariant': 23,
          '@turf/line-segment': 27,
          '@turf/meta': 31,
          'geojson-rbush': 48,
        },
      ],
      27: [
        function (e, t, r) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 });
          var c = e('@turf/helpers'),
            n = e('@turf/invariant'),
            o = e('@turf/meta');
          r.default = function (e) {
            if (!e) throw new Error('geojson is required');
            var t = [];
            return (
              o.flattenEach(e, function (e) {
                !(function (t, r) {
                  var e = [],
                    o = t.geometry;
                  if (null !== o) {
                    switch (o.type) {
                      case 'Polygon':
                        e = n.getCoords(o);
                        break;
                      case 'LineString':
                        e = [n.getCoords(o)];
                    }
                    e.forEach(function (e) {
                      var s, a;
                      ((e = e),
                      (s = t.properties),
                      (a = []),
                      e.reduce(function (e, t) {
                        var r,
                          o,
                          n,
                          i = c.lineString([e, t], s);
                        return (
                          (i.bbox =
                            ((o = t),
                            (n = (r = e)[0]),
                            (e = r[1]),
                            (r = o[0]),
                            (o = o[1]),
                            [n < r ? n : r, e < o ? e : o, r < n ? n : r, o < e ? e : o])),
                          a.push(i),
                          t
                        );
                      }),
                      a).forEach(function (e) {
                        (e.id = r.length), r.push(e);
                      });
                    });
                  }
                })(e, t);
              }),
              c.featureCollection(t)
            );
          };
        },
        { '@turf/helpers': 21, '@turf/invariant': 23, '@turf/meta': 31 },
      ],
      28: [
        function (e, t, r) {
          'use strict';
          var o = e('@turf/bearing'),
            n = e('@turf/distance'),
            i = e('@turf/destination'),
            p = e('@turf/helpers');
          function s(e) {
            return e && 'object' == typeof e && 'default' in e ? e : { default: e };
          }
          var d = s(o),
            h = s(n),
            f = s(i);
          function a(e, t, r, o) {
            if (((o = o || {}), !p.isObject(o))) throw new Error('options is invalid');
            var n,
              i = [];
            if ('Feature' === e.type) n = e.geometry.coordinates;
            else {
              if ('LineString' !== e.type)
                throw new Error('input must be a LineString Feature or Geometry');
              n = e.coordinates;
            }
            for (
              var s, a, c, e = n.length, u = 0, l = 0;
              l < n.length && !(u <= t && l === n.length - 1);
              l++
            ) {
              if (t < u && 0 === i.length) {
                if (!(s = t - u)) return i.push(n[l]), p.lineString(i);
                (a = d.default(n[l], n[l - 1]) - 180),
                  (c = f.default(n[l], s, a, o)),
                  i.push(c.geometry.coordinates);
              }
              if (r <= u)
                return (
                  (s = r - u)
                    ? ((a = d.default(n[l], n[l - 1]) - 180),
                      (c = f.default(n[l], s, a, o)),
                      i.push(c.geometry.coordinates))
                    : i.push(n[l]),
                  p.lineString(i)
                );
              if ((t <= u && i.push(n[l]), l === n.length - 1)) return p.lineString(i);
              u += h.default(n[l], n[l + 1], o);
            }
            if (u < t && n.length === e) throw new Error('Start position is beyond line');
            e = n[n.length - 1];
            return p.lineString([e, e]);
          }
          (t.exports = a), (t.exports.default = a);
        },
        { '@turf/bearing': 12, '@turf/destination': 19, '@turf/distance': 20, '@turf/helpers': 21 },
      ],
      29: [
        function (e, t, r) {
          'use strict';
          var o = e('geojson-rbush'),
            n = e('@turf/square'),
            i = e('@turf/bbox'),
            s = e('@turf/truncate'),
            a = e('@turf/line-segment'),
            c = e('@turf/line-intersect'),
            u = e('@turf/nearest-point-on-line'),
            l = e('@turf/invariant'),
            p = e('@turf/meta'),
            d = e('@turf/helpers');
          function h(e) {
            return e && 'object' == typeof e && 'default' in e ? e : { default: e };
          }
          var f = h(o),
            y = h(n),
            g = h(i),
            m = h(s),
            _ = h(a),
            v = h(c),
            b = h(u);
          function E(e, t) {
            if (!e) throw new Error('line is required');
            if (!t) throw new Error('splitter is required');
            var r = l.getType(e),
              o = l.getType(t);
            if ('LineString' !== r) throw new Error('line must be LineString');
            if ('FeatureCollection' === o)
              throw new Error('splitter cannot be a FeatureCollection');
            if ('GeometryCollection' === o)
              throw new Error('splitter cannot be a GeometryCollection');
            var n = m.default(t, { precision: 7 });
            switch (o) {
              case 'Point':
                return S(e, n);
              case 'MultiPoint':
                return x(e, n);
              case 'LineString':
              case 'MultiLineString':
              case 'Polygon':
              case 'MultiPolygon':
                return x(e, v.default(e, n));
            }
          }
          function x(o, e) {
            var n = [],
              i = f.default();
            return (
              p.flattenEach(e, function (e) {
                var t, r;
                n.forEach(function (e, t) {
                  e.id = t;
                }),
                  n.length
                    ? (t = i.search(e)).features.length &&
                      ((r = w(e, t)),
                      (n = n.filter(function (e) {
                        return e.id !== r.id;
                      })),
                      i.remove(r),
                      p.featureEach(S(r, e), function (e) {
                        n.push(e), i.insert(e);
                      }))
                    : ((n = S(o, e).features).forEach(function (e) {
                        e.bbox || (e.bbox = y.default(g.default(e)));
                      }),
                      i.load(d.featureCollection(n)));
              }),
              d.featureCollection(n)
            );
          }
          function S(e, n) {
            var i = [],
              t = l.getCoords(e)[0],
              r = l.getCoords(e)[e.geometry.coordinates.length - 1];
            if (I(t, l.getCoord(n)) || I(r, l.getCoord(n))) return d.featureCollection([e]);
            var o = f.default(),
              r = _.default(e);
            o.load(r);
            o = o.search(n);
            if (!o.features.length) return d.featureCollection([e]);
            var s = w(n, o),
              t = [t],
              t = p.featureReduce(
                r,
                function (e, t, r) {
                  var o = l.getCoords(t)[1],
                    t = l.getCoord(n);
                  return r === s.id
                    ? (e.push(t), i.push(d.lineString(e)), I(t, o) ? [t] : [t, o])
                    : (e.push(o), e);
                },
                t,
              );
            return 1 < t.length && i.push(d.lineString(t)), d.featureCollection(i);
          }
          function w(r, e) {
            if (!e.features.length) throw new Error('lines must contain features');
            if (1 === e.features.length) return e.features[0];
            var o,
              n = 1 / 0;
            return (
              p.featureEach(e, function (e) {
                var t = b.default(e, r).properties.dist;
                t < n && ((o = e), (n = t));
              }),
              o
            );
          }
          function I(e, t) {
            return e[0] === t[0] && e[1] === t[1];
          }
          (t.exports = E), (t.exports.default = E);
        },
        {
          '@turf/bbox': 11,
          '@turf/helpers': 21,
          '@turf/invariant': 23,
          '@turf/line-intersect': 26,
          '@turf/line-segment': 27,
          '@turf/meta': 31,
          '@turf/nearest-point-on-line': 32,
          '@turf/square': 38,
          '@turf/truncate': 41,
          'geojson-rbush': 48,
        },
      ],
      30: [
        function (e, t, r) {
          'use strict';
          var o =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
          Object.defineProperty(r, '__esModule', { value: !0 });
          var u = o(e('@turf/bbox')),
            l = e('@turf/invariant'),
            p = e('@turf/helpers'),
            a = o(e('@turf/clone'));
          function c(e, t, i, s) {
            t = t || ('Feature' === e.type ? e.properties : {});
            var e = l.getGeom(e),
              r = e.coordinates,
              o = e.type;
            if (!r.length) throw new Error('line must contain coordinates');
            switch (o) {
              case 'LineString':
                return i && (r = d(r)), p.polygon([r], t);
              case 'MultiLineString':
                var a = [],
                  c = 0;
                return (
                  r.forEach(function (e) {
                    var t, r, o, n;
                    i && (e = d(e)),
                      s
                        ? ((t = u.default(p.lineString(e))),
                          (r = t[0]),
                          (o = t[1]),
                          (n = t[2]),
                          (t = t[3]),
                          (t = Math.abs(r - n) * Math.abs(o - t)),
                          c < t ? (a.unshift(e), (c = t)) : a.push(e))
                        : a.push(e);
                  }),
                  p.polygon(a, t)
                );
              default:
                throw new Error('geometry type ' + o + ' is not supported');
            }
          }
          function d(e) {
            var t = e[0],
              r = t[0],
              o = t[1],
              n = e[e.length - 1],
              i = n[0],
              n = n[1];
            return (r === i && o === n) || e.push(t), e;
          }
          r.default = function (e, t) {
            var r;
            void 0 === t && (t = {});
            var o = t.properties,
              n = null === (r = t.autoComplete) || void 0 === r || r,
              i = null === (r = t.orderCoords) || void 0 === r || r,
              t = null !== (t = t.mutate) && void 0 !== t && t;
            if ((t || (e = a.default(e)), 'FeatureCollection' !== e.type)) return c(e, o, n, i);
            var s = [];
            return (
              e.features.forEach(function (e) {
                s.push(l.getCoords(c(e, {}, n, i)));
              }),
              p.multiPolygon(s, o)
            );
          };
        },
        { '@turf/bbox': 11, '@turf/clone': 17, '@turf/helpers': 21, '@turf/invariant': 23 },
      ],
      31: [
        function (e, t, r) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 });
          var f = e('@turf/helpers');
          function x(e, t, r) {
            if (null !== e)
              for (
                var o,
                  n,
                  i,
                  s,
                  a,
                  c,
                  u,
                  l = 0,
                  p = e.type,
                  d = 'FeatureCollection' === p,
                  h = 'Feature' === p,
                  f = d ? e.features.length : 1,
                  y = 0;
                y < f;
                y++
              ) {
                s = (u =
                  !!(c = d ? e.features[y].geometry : h ? e.geometry : e) &&
                  'GeometryCollection' === c.type)
                  ? c.geometries.length
                  : 1;
                for (var g = 0; g < s; g++) {
                  var m,
                    _ = 0,
                    v = 0;
                  if (null !== (m = u ? c.geometries[g] : c)) {
                    a = m.coordinates;
                    var b = m.type,
                      E = !r || ('Polygon' !== b && 'MultiPolygon' !== b) ? 0 : 1;
                    switch (b) {
                      case null:
                        break;
                      case 'Point':
                        if (!1 === t(a, l, y, _, v)) return !1;
                        l++, _++;
                        break;
                      case 'LineString':
                      case 'MultiPoint':
                        for (o = 0; o < a.length; o++) {
                          if (!1 === t(a[o], l, y, _, v)) return !1;
                          l++, 'MultiPoint' === b && _++;
                        }
                        'LineString' === b && _++;
                        break;
                      case 'Polygon':
                      case 'MultiLineString':
                        for (o = 0; o < a.length; o++) {
                          for (n = 0; n < a[o].length - E; n++) {
                            if (!1 === t(a[o][n], l, y, _, v)) return !1;
                            l++;
                          }
                          'MultiLineString' === b && _++, 'Polygon' === b && v++;
                        }
                        'Polygon' === b && _++;
                        break;
                      case 'MultiPolygon':
                        for (o = 0; o < a.length; o++) {
                          for (n = v = 0; n < a[o].length; n++) {
                            for (i = 0; i < a[o][n].length - E; i++) {
                              if (!1 === t(a[o][n][i], l, y, _, v)) return !1;
                              l++;
                            }
                            v++;
                          }
                          _++;
                        }
                        break;
                      case 'GeometryCollection':
                        for (o = 0; o < m.geometries.length; o++)
                          if (!1 === x(m.geometries[o], t, r)) return !1;
                        break;
                      default:
                        throw new Error('Unknown Geometry Type');
                    }
                  }
                }
              }
          }
          function i(e, t) {
            var r;
            switch (e.type) {
              case 'FeatureCollection':
                for (r = 0; r < e.features.length && !1 !== t(e.features[r].properties, r); r++);
                break;
              case 'Feature':
                t(e.properties, 0);
            }
          }
          function s(e, t) {
            if ('Feature' === e.type) t(e, 0);
            else if ('FeatureCollection' === e.type)
              for (var r = 0; r < e.features.length && !1 !== t(e.features[r], r); r++);
          }
          function o(e, t) {
            for (
              var r,
                o,
                n,
                i,
                s,
                a,
                c,
                u,
                l,
                p = 0,
                d = 'FeatureCollection' === e.type,
                h = 'Feature' === e.type,
                f = d ? e.features.length : 1,
                y = 0;
              y < f;
              y++
            ) {
              for (
                s = d ? e.features[y].geometry : h ? e.geometry : e,
                  c = d ? e.features[y].properties : h ? e.properties : {},
                  u = d ? e.features[y].bbox : h ? e.bbox : void 0,
                  l = d ? e.features[y].id : h ? e.id : void 0,
                  i = (a = !!s && 'GeometryCollection' === s.type) ? s.geometries.length : 1,
                  o = 0;
                o < i;
                o++
              )
                if (null !== (n = a ? s.geometries[o] : s))
                  switch (n.type) {
                    case 'Point':
                    case 'LineString':
                    case 'MultiPoint':
                    case 'Polygon':
                    case 'MultiLineString':
                    case 'MultiPolygon':
                      if (!1 === t(n, p, c, u, l)) return !1;
                      break;
                    case 'GeometryCollection':
                      for (r = 0; r < n.geometries.length; r++)
                        if (!1 === t(n.geometries[r], p, c, u, l)) return !1;
                      break;
                    default:
                      throw new Error('Unknown Geometry Type');
                  }
                else if (!1 === t(null, p, c, u, l)) return !1;
              p++;
            }
          }
          function a(e, u) {
            o(e, function (e, t, r, o, n) {
              var i,
                s = null === e ? null : e.type;
              switch (s) {
                case null:
                case 'Point':
                case 'LineString':
                case 'Polygon':
                  return !1 === u(f.feature(e, r, { bbox: o, id: n }), t, 0) ? !1 : void 0;
              }
              switch (s) {
                case 'MultiPoint':
                  i = 'Point';
                  break;
                case 'MultiLineString':
                  i = 'LineString';
                  break;
                case 'MultiPolygon':
                  i = 'Polygon';
              }
              for (var a = 0; a < e.coordinates.length; a++) {
                var c = { type: i, coordinates: e.coordinates[a] };
                if (!1 === u(f.feature(c, r), t, a)) return !1;
              }
            });
          }
          function n(e, h) {
            a(e, function (i, s, a) {
              var c = 0;
              if (i.geometry) {
                var e = i.geometry.type;
                if ('Point' !== e && 'MultiPoint' !== e) {
                  var u,
                    l = 0,
                    p = 0,
                    d = 0;
                  return (
                    !1 !==
                      x(i, function (e, t, r, o, n) {
                        if (void 0 === u || l < s || p < o || d < n)
                          return (u = e), (l = s), (p = o), (d = n), void (c = 0);
                        o = f.lineString([u, e], i.properties);
                        if (!1 === h(o, s, a, n, c)) return !1;
                        c++, (u = e);
                      }) && void 0
                  );
                }
              }
            });
          }
          function c(e, s) {
            if (!e) throw new Error('geojson is required');
            a(e, function (e, t, r) {
              if (null !== e.geometry) {
                var o = e.geometry.type,
                  n = e.geometry.coordinates;
                switch (o) {
                  case 'LineString':
                    if (!1 === s(e, t, r, 0, 0)) return !1;
                    break;
                  case 'Polygon':
                    for (var i = 0; i < n.length; i++)
                      if (!1 === s(f.lineString(n[i], e.properties), t, r, i)) return !1;
                }
              }
            });
          }
          (r.coordAll = function (e) {
            var t = [];
            return (
              x(e, function (e) {
                t.push(e);
              }),
              t
            );
          }),
            (r.coordEach = x),
            (r.coordReduce = function (e, i, s, t) {
              var a = s;
              return (
                x(
                  e,
                  function (e, t, r, o, n) {
                    a = 0 === t && void 0 === s ? e : i(a, e, t, r, o, n);
                  },
                  t,
                ),
                a
              );
            }),
            (r.featureEach = s),
            (r.featureReduce = function (e, r, o) {
              var n = o;
              return (
                s(e, function (e, t) {
                  n = 0 === t && void 0 === o ? e : r(n, e, t);
                }),
                n
              );
            }),
            (r.findPoint = function (e, t) {
              if (((t = t || {}), !f.isObject(t))) throw new Error('options is invalid');
              var r,
                o = t.featureIndex || 0,
                n = t.multiFeatureIndex || 0,
                i = t.geometryIndex || 0,
                s = t.coordIndex || 0,
                a = t.properties;
              switch (e.type) {
                case 'FeatureCollection':
                  o < 0 && (o = e.features.length + o),
                    (a = a || e.features[o].properties),
                    (r = e.features[o].geometry);
                  break;
                case 'Feature':
                  (a = a || e.properties), (r = e.geometry);
                  break;
                case 'Point':
                case 'MultiPoint':
                  return null;
                case 'LineString':
                case 'Polygon':
                case 'MultiLineString':
                case 'MultiPolygon':
                  r = e;
                  break;
                default:
                  throw new Error('geojson is invalid');
              }
              if (null === r) return null;
              var c = r.coordinates;
              switch (r.type) {
                case 'Point':
                  return f.point(c, a, t);
                case 'MultiPoint':
                  return n < 0 && (n = c.length + n), f.point(c[n], a, t);
                case 'LineString':
                  return s < 0 && (s = c.length + s), f.point(c[s], a, t);
                case 'Polygon':
                  return (
                    i < 0 && (i = c.length + i),
                    s < 0 && (s = c[i].length + s),
                    f.point(c[i][s], a, t)
                  );
                case 'MultiLineString':
                  return (
                    n < 0 && (n = c.length + n),
                    s < 0 && (s = c[n].length + s),
                    f.point(c[n][s], a, t)
                  );
                case 'MultiPolygon':
                  return (
                    n < 0 && (n = c.length + n),
                    i < 0 && (i = c[n].length + i),
                    s < 0 && (s = c[n][i].length - s),
                    f.point(c[n][i][s], a, t)
                  );
              }
              throw new Error('geojson is invalid');
            }),
            (r.findSegment = function (e, t) {
              if (((t = t || {}), !f.isObject(t))) throw new Error('options is invalid');
              var r,
                o = t.featureIndex || 0,
                n = t.multiFeatureIndex || 0,
                i = t.geometryIndex || 0,
                s = t.segmentIndex || 0,
                a = t.properties;
              switch (e.type) {
                case 'FeatureCollection':
                  o < 0 && (o = e.features.length + o),
                    (a = a || e.features[o].properties),
                    (r = e.features[o].geometry);
                  break;
                case 'Feature':
                  (a = a || e.properties), (r = e.geometry);
                  break;
                case 'Point':
                case 'MultiPoint':
                  return null;
                case 'LineString':
                case 'Polygon':
                case 'MultiLineString':
                case 'MultiPolygon':
                  r = e;
                  break;
                default:
                  throw new Error('geojson is invalid');
              }
              if (null === r) return null;
              var c = r.coordinates;
              switch (r.type) {
                case 'Point':
                case 'MultiPoint':
                  return null;
                case 'LineString':
                  return s < 0 && (s = c.length + s - 1), f.lineString([c[s], c[s + 1]], a, t);
                case 'Polygon':
                  return (
                    i < 0 && (i = c.length + i),
                    s < 0 && (s = c[i].length + s - 1),
                    f.lineString([c[i][s], c[i][s + 1]], a, t)
                  );
                case 'MultiLineString':
                  return (
                    n < 0 && (n = c.length + n),
                    s < 0 && (s = c[n].length + s - 1),
                    f.lineString([c[n][s], c[n][s + 1]], a, t)
                  );
                case 'MultiPolygon':
                  return (
                    n < 0 && (n = c.length + n),
                    i < 0 && (i = c[n].length + i),
                    s < 0 && (s = c[n][i].length - s - 1),
                    f.lineString([c[n][i][s], c[n][i][s + 1]], a, t)
                  );
              }
              throw new Error('geojson is invalid');
            }),
            (r.flattenEach = a),
            (r.flattenReduce = function (e, o, n) {
              var i = n;
              return (
                a(e, function (e, t, r) {
                  i = 0 === t && 0 === r && void 0 === n ? e : o(i, e, t, r);
                }),
                i
              );
            }),
            (r.geomEach = o),
            (r.geomReduce = function (e, i, s) {
              var a = s;
              return (
                o(e, function (e, t, r, o, n) {
                  a = 0 === t && void 0 === s ? e : i(a, e, t, r, o, n);
                }),
                a
              );
            }),
            (r.lineEach = c),
            (r.lineReduce = function (e, n, i) {
              var s = i;
              return (
                c(e, function (e, t, r, o) {
                  s = 0 === t && void 0 === i ? e : n(s, e, t, r, o);
                }),
                s
              );
            }),
            (r.propEach = i),
            (r.propReduce = function (e, r, o) {
              var n = o;
              return (
                i(e, function (e, t) {
                  n = 0 === t && void 0 === o ? e : r(n, e, t);
                }),
                n
              );
            }),
            (r.segmentEach = n),
            (r.segmentReduce = function (e, i, s) {
              var a = s,
                c = !1;
              return (
                n(e, function (e, t, r, o, n) {
                  (a = !1 === c && void 0 === s ? e : i(a, e, t, r, o, n)), (c = !0);
                }),
                a
              );
            });
        },
        { '@turf/helpers': 21 },
      ],
      32: [
        function (e, t, r) {
          'use strict';
          var o =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
          Object.defineProperty(r, '__esModule', { value: !0 });
          var h = o(e('@turf/bearing')),
            f = o(e('@turf/distance')),
            y = o(e('@turf/destination')),
            g = o(e('@turf/line-intersect')),
            n = e('@turf/meta'),
            m = e('@turf/helpers'),
            _ = e('@turf/invariant');
          r.default = function (e, u, l) {
            void 0 === l && (l = {});
            var p = m.point([1 / 0, 1 / 0], { dist: 1 / 0 }),
              d = 0;
            return (
              n.flattenEach(e, function (e) {
                for (var t = _.getCoords(e), r = 0; r < t.length - 1; r++) {
                  var o = m.point(t[r]);
                  o.properties.dist = f.default(u, o, l);
                  var n = m.point(t[r + 1]);
                  n.properties.dist = f.default(u, n, l);
                  var i = f.default(o, n, l),
                    s = Math.max(o.properties.dist, n.properties.dist),
                    a = h.default(o, n),
                    c = y.default(u, s, a + 90, l),
                    a = y.default(u, s, a - 90, l),
                    c = g.default(
                      m.lineString([c.geometry.coordinates, a.geometry.coordinates]),
                      m.lineString([o.geometry.coordinates, n.geometry.coordinates]),
                    ),
                    a = null;
                  0 < c.features.length &&
                    (((a = c.features[0]).properties.dist = f.default(u, a, l)),
                    (a.properties.location = d + f.default(o, a, l))),
                    o.properties.dist < p.properties.dist &&
                      (((p = o).properties.index = r), (p.properties.location = d)),
                    n.properties.dist < p.properties.dist &&
                      (((p = n).properties.index = r + 1), (p.properties.location = d + i)),
                    a && a.properties.dist < p.properties.dist && ((p = a).properties.index = r),
                    (d += i);
                }
              }),
              p
            );
          };
        },
        {
          '@turf/bearing': 12,
          '@turf/destination': 19,
          '@turf/distance': 20,
          '@turf/helpers': 21,
          '@turf/invariant': 23,
          '@turf/line-intersect': 26,
          '@turf/meta': 31,
        },
      ],
      33: [
        function (e, t, r) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 });
          var i = e('@turf/helpers'),
            s = e('@turf/invariant');
          function o(e, t) {
            return (
              void 0 === t && (t = {}),
              a(
                s.getGeom(e).coordinates,
                t.properties || ('Feature' === e.type ? e.properties : {}),
              )
            );
          }
          function n(e, t) {
            void 0 === t && (t = {});
            var r = s.getGeom(e).coordinates,
              o = t.properties || ('Feature' === e.type ? e.properties : {}),
              n = [];
            return (
              r.forEach(function (e) {
                n.push(a(e, o));
              }),
              i.featureCollection(n)
            );
          }
          function a(e, t) {
            return 1 < e.length ? i.multiLineString(e, t) : i.lineString(e[0], t);
          }
          (r.default = function (e, t) {
            void 0 === t && (t = {});
            var r = s.getGeom(e);
            switch (
              (t.properties || 'Feature' !== e.type || (t.properties = e.properties), r.type)
            ) {
              case 'Polygon':
                return o(r, t);
              case 'MultiPolygon':
                return n(r, t);
              default:
                throw new Error('invalid poly');
            }
          }),
            (r.polygonToLine = o),
            (r.multiPolygonToLine = n),
            (r.coordsToLine = a);
        },
        { '@turf/helpers': 21, '@turf/invariant': 23 },
      ],
      34: [
        function (e, t, r) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 });
          var n = e('@turf/helpers'),
            o = e('@turf/invariant');
          function i(e, t) {
            var r = n.degreesToRadians(e[1]),
              o = n.degreesToRadians(t[1]),
              e = n.degreesToRadians(t[0] - e[0]);
            e > Math.PI && (e -= 2 * Math.PI), e < -Math.PI && (e += 2 * Math.PI);
            (r = Math.log(Math.tan(o / 2 + Math.PI / 4) / Math.tan(r / 2 + Math.PI / 4))),
              (r = Math.atan2(e, r));
            return (n.radiansToDegrees(r) + 360) % 360;
          }
          r.default = function (e, t, r) {
            return (
              void 0 === r && (r = {}),
              180 <
              (t = r.final ? i(o.getCoord(t), o.getCoord(e)) : i(o.getCoord(e), o.getCoord(t)))
                ? -(360 - t)
                : t
            );
          };
        },
        { '@turf/helpers': 21, '@turf/invariant': 23 },
      ],
      35: [
        function (e, t, r) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 });
          var a = e('@turf/helpers'),
            i = e('@turf/invariant');
          r.default = function (e, t, r, o) {
            void 0 === o && (o = {});
            var n = t < 0,
              t = a.convertLength(Math.abs(t), o.units, 'meters');
            return (
              n && (t = -Math.abs(t)),
              (e = i.getCoord(e)),
              ((r = (function (e, t, r, o) {
                o = void 0 === o ? a.earthRadius : Number(o);
                var n = t / o,
                  i = (e[0] * Math.PI) / 180,
                  s = a.degreesToRadians(e[1]),
                  t = a.degreesToRadians(r),
                  o = n * Math.cos(t),
                  e = s + o;
                Math.abs(e) > Math.PI / 2 && (e = 0 < e ? Math.PI - e : -Math.PI - e);
                (r = Math.log(Math.tan(e / 2 + Math.PI / 4) / Math.tan(s / 2 + Math.PI / 4))),
                  (s = 1e-11 < Math.abs(r) ? o / r : Math.cos(s)),
                  (s = (n * Math.sin(t)) / s);
                return [(((180 * (i + s)) / Math.PI + 540) % 360) - 180, (180 * e) / Math.PI];
              })(e, t, r))[0] += 180 < r[0] - e[0] ? -360 : 180 < e[0] - r[0] ? 360 : 0),
              a.point(r, o.properties)
            );
          };
        },
        { '@turf/helpers': 21, '@turf/invariant': 23 },
      ],
      36: [
        function (e, t, r) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 });
          var s = e('@turf/helpers'),
            o = e('@turf/invariant');
          r.default = function (e, t, r) {
            return (
              void 0 === r && (r = {}),
              (e = o.getCoord(e)),
              ((t = o.getCoord(t))[0] += 180 < t[0] - e[0] ? -360 : 180 < e[0] - t[0] ? 360 : 0),
              (t = (function (e, t, r) {
                var o = (r = void 0 === r ? s.earthRadius : Number(r)),
                  n = (e[1] * Math.PI) / 180,
                  i = (t[1] * Math.PI) / 180,
                  r = i - n,
                  e = (Math.abs(t[0] - e[0]) * Math.PI) / 180;
                e > Math.PI && (e -= 2 * Math.PI);
                (i = Math.log(Math.tan(i / 2 + Math.PI / 4) / Math.tan(n / 2 + Math.PI / 4))),
                  (n = 1e-11 < Math.abs(i) ? r / i : Math.cos(n));
                return Math.sqrt(r * r + n * n * e * e) * o;
              })(e, t)),
              s.convertLength(t, 'meters', r.units)
            );
          };
        },
        { '@turf/helpers': 21, '@turf/invariant': 23 },
      ],
      37: [
        function (e, t, r) {
          'use strict';
          var o = e('@turf/circle'),
            n = e('@turf/line-arc'),
            c = e('@turf/meta'),
            u = e('@turf/helpers'),
            l = e('@turf/invariant');
          function i(e) {
            return e && 'object' == typeof e && 'default' in e ? e : { default: e };
          }
          var p = i(o),
            d = i(n);
          function s(e, t, r, o, n) {
            if (((n = n || {}), !u.isObject(n))) throw new Error('options is invalid');
            var i = n.properties;
            if (!e) throw new Error('center is required');
            if (null == r) throw new Error('bearing1 is required');
            if (null == o) throw new Error('bearing2 is required');
            if (!t) throw new Error('radius is required');
            if ('object' != typeof n) throw new Error('options must be an object');
            if (h(r) === h(o)) return p.default(e, t, n);
            var s = l.getCoords(e),
              n = d.default(e, t, r, o, n),
              a = [[s]];
            return (
              c.coordEach(n, function (e) {
                a[0].push(e);
              }),
              a[0].push(s),
              u.polygon(a, i)
            );
          }
          function h(e) {
            e %= 360;
            return e < 0 && (e += 360), e;
          }
          (t.exports = s), (t.exports.default = s);
        },
        {
          '@turf/circle': 16,
          '@turf/helpers': 21,
          '@turf/invariant': 23,
          '@turf/line-arc': 25,
          '@turf/meta': 31,
        },
      ],
      38: [
        function (e, t, r) {
          'use strict';
          function o(e) {
            return e && 'object' == typeof e && 'default' in e ? e : { default: e };
          }
          var s = o(e('@turf/distance'));
          function n(e) {
            var t = e[0],
              r = e[1],
              o = e[2],
              n = e[3],
              i = s.default(e.slice(0, 2), [o, r]);
            if (s.default(e.slice(0, 2), [t, n]) <= i) {
              i = (r + n) / 2;
              return [t, i - (o - t) / 2, o, i + (o - t) / 2];
            }
            o = (t + o) / 2;
            return [o - (n - r) / 2, r, o + (n - r) / 2, n];
          }
          (t.exports = n), (t.exports.default = n);
        },
        { '@turf/distance': 20 },
      ],
      39: [
        function (e, t, r) {
          'use strict';
          var o = e('@turf/centroid'),
            n = e('@turf/rhumb-bearing'),
            i = e('@turf/rhumb-distance'),
            s = e('@turf/rhumb-destination'),
            a = e('@turf/clone'),
            c = e('@turf/meta'),
            u = e('@turf/invariant'),
            l = e('@turf/helpers');
          function p(e) {
            return e && 'object' == typeof e && 'default' in e ? e : { default: e };
          }
          var d = p(o),
            h = p(n),
            f = p(i),
            y = p(s),
            g = p(a);
          function m(e, o, t) {
            if (((t = t || {}), !l.isObject(t))) throw new Error('options is invalid');
            var n = t.pivot,
              t = t.mutate;
            if (!e) throw new Error('geojson is required');
            if (null == o || isNaN(o)) throw new Error('angle is required');
            return (
              0 === o ||
                ((n = n || d.default(e)),
                (!1 !== t && void 0 !== t) || (e = g.default(e)),
                c.coordEach(e, function (e) {
                  var t = h.default(n, e) + o,
                    r = f.default(n, e),
                    t = u.getCoords(y.default(n, r, t));
                  (e[0] = t[0]), (e[1] = t[1]);
                })),
              e
            );
          }
          (t.exports = m), (t.exports.default = m);
        },
        {
          '@turf/centroid': 15,
          '@turf/clone': 17,
          '@turf/helpers': 21,
          '@turf/invariant': 23,
          '@turf/meta': 31,
          '@turf/rhumb-bearing': 34,
          '@turf/rhumb-destination': 35,
          '@turf/rhumb-distance': 36,
        },
      ],
      40: [
        function (e, t, r) {
          'use strict';
          var s = e('@turf/meta'),
            a = e('@turf/helpers'),
            c = e('@turf/invariant'),
            o = e('@turf/clone'),
            e = e('@turf/rhumb-destination');
          function n(e) {
            return e && 'object' == typeof e && 'default' in e ? e : { default: e };
          }
          var u = n(o),
            l = n(e);
          function i(e, r, o, t) {
            if (((t = t || {}), !a.isObject(t))) throw new Error('options is invalid');
            var n = t.units,
              i = t.zTranslation,
              t = t.mutate;
            if (!e) throw new Error('geojson is required');
            if (null == r || isNaN(r)) throw new Error('distance is required');
            if (i && 'number' != typeof i && isNaN(i))
              throw new Error('zTranslation is not a number');
            if (((i = void 0 !== i ? i : 0), 0 === r && 0 === i)) return e;
            if (null == o || isNaN(o)) throw new Error('direction is required');
            return (
              r < 0 && ((r = -r), (o += 180)),
              (!1 !== t && void 0 !== t) || (e = u.default(e)),
              s.coordEach(e, function (e) {
                var t = c.getCoords(l.default(e, r, o, { units: n }));
                (e[0] = t[0]), (e[1] = t[1]), i && 3 === e.length && (e[2] += i);
              }),
              e
            );
          }
          (t.exports = i), (t.exports.default = i);
        },
        {
          '@turf/clone': 17,
          '@turf/helpers': 21,
          '@turf/invariant': 23,
          '@turf/meta': 31,
          '@turf/rhumb-destination': 35,
        },
      ],
      41: [
        function (e, t, r) {
          'use strict';
          Object.defineProperty(r, '__esModule', { value: !0 });
          var i = e('@turf/meta');
          r.default = function (e, t) {
            void 0 === t && (t = {});
            var r = t.precision,
              o = t.coordinates,
              t = t.mutate,
              r = null == r || isNaN(r) ? 6 : r,
              o = null == o || isNaN(o) ? 3 : o;
            if (!e) throw new Error('<geojson> is required');
            if ('number' != typeof r) throw new Error('<precision> must be a number');
            if ('number' != typeof o) throw new Error('<coordinates> must be a number');
            (!1 !== t && void 0 !== t) || (e = JSON.parse(JSON.stringify(e)));
            var n = Math.pow(10, r);
            return (
              i.coordEach(e, function (e) {
                !(function (e, t, r) {
                  e.length > r && e.splice(r, e.length);
                  for (var o = 0; o < e.length; o++) e[o] = Math.round(e[o] * t) / t;
                })(e, n, o);
              }),
              e
            );
          };
        },
        { '@turf/meta': 31 },
      ],
      42: [
        function (e, t, r) {
          'use strict';
          var o =
            (this && this.__importDefault) ||
            function (e) {
              return e && e.__esModule ? e : { default: e };
            };
          Object.defineProperty(r, '__esModule', { value: !0 });
          var n = o(e('polygon-clipping')),
            i = e('@turf/invariant'),
            s = e('@turf/helpers');
          r.default = function (e, t, r) {
            return (
              void 0 === r && (r = {}),
              (e = i.getGeom(e)),
              (t = i.getGeom(t)),
              0 === (t = n.default.union(e.coordinates, t.coordinates)).length
                ? null
                : 1 === t.length
                ? s.polygon(t[0], r.properties)
                : s.multiPolygon(t, r.properties)
            );
          };
        },
        { '@turf/helpers': 21, '@turf/invariant': 23, 'polygon-clipping': 163 },
      ],
      43: [
        function (e, t, r) {
          'use strict';
          t.exports = {
            builtins: {
              Symbol: 'symbol',
              Promise: 'promise',
              Map: 'map',
              WeakMap: 'weak-map',
              Set: 'set',
              WeakSet: 'weak-set',
              Observable: 'observable',
              setImmediate: 'set-immediate',
              clearImmediate: 'clear-immediate',
              asap: 'asap',
            },
            methods: {
              Array: {
                concat: 'array/concat',
                copyWithin: 'array/copy-within',
                entries: 'array/entries',
                every: 'array/every',
                fill: 'array/fill',
                filter: 'array/filter',
                findIndex: 'array/find-index',
                find: 'array/find',
                forEach: 'array/for-each',
                from: 'array/from',
                includes: 'array/includes',
                indexOf: 'array/index-of',
                join: 'array/join',
                keys: 'array/keys',
                lastIndexOf: 'array/last-index-of',
                map: 'array/map',
                of: 'array/of',
                pop: 'array/pop',
                push: 'array/push',
                reduceRight: 'array/reduce-right',
                reduce: 'array/reduce',
                reverse: 'array/reverse',
                shift: 'array/shift',
                slice: 'array/slice',
                some: 'array/some',
                sort: 'array/sort',
                splice: 'array/splice',
                unshift: 'array/unshift',
                values: 'array/values',
              },
              JSON: { stringify: 'json/stringify' },
              Object: {
                assign: 'object/assign',
                create: 'object/create',
                defineProperties: 'object/define-properties',
                defineProperty: 'object/define-property',
                entries: 'object/entries',
                freeze: 'object/freeze',
                getOwnPropertyDescriptor: 'object/get-own-property-descriptor',
                getOwnPropertyDescriptors: 'object/get-own-property-descriptors',
                getOwnPropertyNames: 'object/get-own-property-names',
                getOwnPropertySymbols: 'object/get-own-property-symbols',
                getPrototypeOf: 'object/get-prototype-of',
                isExtensible: 'object/is-extensible',
                isFrozen: 'object/is-frozen',
                isSealed: 'object/is-sealed',
                is: 'object/is',
                keys: 'object/keys',
                preventExtensions: 'object/prevent-extensions',
                seal: 'object/seal',
                setPrototypeOf: 'object/set-prototype-of',
                values: 'object/values',
              },
              RegExp: { escape: 'regexp/escape' },
              Math: {
                acosh: 'math/acosh',
                asinh: 'math/asinh',
                atanh: 'math/atanh',
                cbrt: 'math/cbrt',
                clz32: 'math/clz32',
                cosh: 'math/cosh',
                expm1: 'math/expm1',
                fround: 'math/fround',
                hypot: 'math/hypot',
                imul: 'math/imul',
                log10: 'math/log10',
                log1p: 'math/log1p',
                log2: 'math/log2',
                sign: 'math/sign',
                sinh: 'math/sinh',
                tanh: 'math/tanh',
                trunc: 'math/trunc',
                iaddh: 'math/iaddh',
                isubh: 'math/isubh',
                imulh: 'math/imulh',
                umulh: 'math/umulh',
              },
              Symbol: {
                for: 'symbol/for',
                hasInstance: 'symbol/has-instance',
                isConcatSpreadable: 'symbol/is-concat-spreadable',
                iterator: 'symbol/iterator',
                keyFor: 'symbol/key-for',
                match: 'symbol/match',
                replace: 'symbol/replace',
                search: 'symbol/search',
                species: 'symbol/species',
                split: 'symbol/split',
                toPrimitive: 'symbol/to-primitive',
                toStringTag: 'symbol/to-string-tag',
                unscopables: 'symbol/unscopables',
              },
              String: {
                at: 'string/at',
                codePointAt: 'string/code-point-at',
                endsWith: 'string/ends-with',
                fromCodePoint: 'string/from-code-point',
                includes: 'string/includes',
                matchAll: 'string/match-all',
                padLeft: 'string/pad-left',
                padRight: 'string/pad-right',
                padStart: 'string/pad-start',
                padEnd: 'string/pad-end',
                raw: 'string/raw',
                repeat: 'string/repeat',
                startsWith: 'string/starts-with',
                trim: 'string/trim',
                trimLeft: 'string/trim-left',
                trimRight: 'string/trim-right',
                trimStart: 'string/trim-start',
                trimEnd: 'string/trim-end',
              },
              Number: {
                EPSILON: 'number/epsilon',
                isFinite: 'number/is-finite',
                isInteger: 'number/is-integer',
                isNaN: 'number/is-nan',
                isSafeInteger: 'number/is-safe-integer',
                MAX_SAFE_INTEGER: 'number/max-safe-integer',
                MIN_SAFE_INTEGER: 'number/min-safe-integer',
                parseFloat: 'number/parse-float',
                parseInt: 'number/parse-int',
              },
              Reflect: {
                apply: 'reflect/apply',
                construct: 'reflect/construct',
                defineProperty: 'reflect/define-property',
                deleteProperty: 'reflect/delete-property',
                enumerate: 'reflect/enumerate',
                getOwnPropertyDescriptor: 'reflect/get-own-property-descriptor',
                getPrototypeOf: 'reflect/get-prototype-of',
                get: 'reflect/get',
                has: 'reflect/has',
                isExtensible: 'reflect/is-extensible',
                ownKeys: 'reflect/own-keys',
                preventExtensions: 'reflect/prevent-extensions',
                setPrototypeOf: 'reflect/set-prototype-of',
                set: 'reflect/set',
                defineMetadata: 'reflect/define-metadata',
                deleteMetadata: 'reflect/delete-metadata',
                getMetadata: 'reflect/get-metadata',
                getMetadataKeys: 'reflect/get-metadata-keys',
                getOwnMetadata: 'reflect/get-own-metadata',
                getOwnMetadataKeys: 'reflect/get-own-metadata-keys',
                hasMetadata: 'reflect/has-metadata',
                hasOwnMetadata: 'reflect/has-own-metadata',
                metadata: 'reflect/metadata',
              },
              System: { global: 'system/global' },
              Error: { isError: 'error/is-error' },
              Date: {},
              Function: {},
            },
          };
        },
        {},
      ],
      44: [
        function (e, t, r) {
          'use strict';
          (r.__esModule = !0),
            (r.definitions = void 0),
            (r.default = function (e) {
              var s = e.types;
              function a(e) {
                return e.moduleName || 'babel-runtime';
              }
              function c(e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
              }
              var o = ['interopRequireWildcard', 'interopRequireDefault'];
              return {
                pre: function (t) {
                  var r = a(this.opts);
                  !1 !== this.opts.helpers &&
                    t.set('helperGenerator', function (e) {
                      if (o.indexOf(e) < 0) return t.addImport(r + '/helpers/' + e, 'default', e);
                    }),
                    this.setDynamic('regeneratorIdentifier', function () {
                      return t.addImport(r + '/regenerator', 'default', 'regeneratorRuntime');
                    });
                },
                visitor: {
                  ReferencedIdentifier: function (e, t) {
                    var r = e.node,
                      o = e.parent,
                      n = e.scope;
                    'regeneratorRuntime' !== r.name || !1 === t.opts.regenerator
                      ? !1 !== t.opts.polyfill &&
                        (s.isMemberExpression(o) ||
                          (c(u.default.builtins, r.name) &&
                            (n.getBindingIdentifier(r.name) ||
                              ((n = a(t.opts)),
                              e.replaceWith(
                                t.addImport(
                                  n + '/core-js/' + u.default.builtins[r.name],
                                  'default',
                                  r.name,
                                ),
                              )))))
                      : e.replaceWith(t.get('regeneratorIdentifier'));
                  },
                  CallExpression: function (e, t) {
                    var r, o;
                    !1 !== t.opts.polyfill &&
                      (e.node.arguments.length ||
                        ((r = e.node.callee),
                        s.isMemberExpression(r) &&
                          r.computed &&
                          e.get('callee.property').matchesPattern('Symbol.iterator') &&
                          ((o = a(t.opts)),
                          e.replaceWith(
                            s.callExpression(
                              t.addImport(o + '/core-js/get-iterator', 'default', 'getIterator'),
                              [r.object],
                            ),
                          ))));
                  },
                  BinaryExpression: function (e, t) {
                    var r;
                    !1 !== t.opts.polyfill &&
                      'in' === e.node.operator &&
                      e.get('left').matchesPattern('Symbol.iterator') &&
                      ((r = a(t.opts)),
                      e.replaceWith(
                        s.callExpression(
                          t.addImport(r + '/core-js/is-iterable', 'default', 'isIterable'),
                          [e.node.right],
                        ),
                      ));
                  },
                  MemberExpression: {
                    enter: function (e, t) {
                      if (!1 !== t.opts.polyfill && e.isReferenced()) {
                        var r = e.node,
                          o = r.object,
                          n = r.property;
                        if (s.isReferenced(o, r) && !r.computed && c(u.default.methods, o.name)) {
                          r = u.default.methods[o.name];
                          if (c(r, n.name) && !e.scope.getBindingIdentifier(o.name)) {
                            if (
                              'Object' === o.name &&
                              'defineProperty' === n.name &&
                              e.parentPath.isCallExpression()
                            ) {
                              var i = e.parentPath.node;
                              if (3 === i.arguments.length && s.isLiteral(i.arguments[1])) return;
                            }
                            i = a(t.opts);
                            e.replaceWith(
                              t.addImport(
                                i + '/core-js/' + r[n.name],
                                'default',
                                o.name + '$' + n.name,
                              ),
                            );
                          }
                        }
                      }
                    },
                    exit: function (e, t) {
                      var r, o, n;
                      !1 !== t.opts.polyfill &&
                        e.isReferenced() &&
                        ((o = (r = e.node).object),
                        c(u.default.builtins, o.name) &&
                          (e.scope.getBindingIdentifier(o.name) ||
                            ((n = a(t.opts)),
                            e.replaceWith(
                              s.memberExpression(
                                t.addImport(
                                  n + '/core-js/' + u.default.builtins[o.name],
                                  'default',
                                  o.name,
                                ),
                                r.property,
                                r.computed,
                              ),
                            ))));
                    },
                  },
                },
              };
            });
          var o,
            n = e('./definitions'),
            u = (o = n) && o.__esModule ? o : { default: o };
          r.definitions = u.default;
        },
        { './definitions': 43 },
      ],
      45: [function (e, t, r) {}, {}],
      46: [
        function (e, t, r) {
          'use strict';
          var m = e('rbush'),
            _ = e('tinyqueue'),
            v = e('point-in-polygon'),
            o = e('robust-predicates/umd/orient2d.min.js').orient2d;
          function n(e, t, r) {
            (t = Math.max(0, void 0 === t ? 2 : t)), (r = r || 0);
            var o = (function (e) {
                for (var t = e[0], r = e[0], o = e[0], n = e[0], i = 0; i < e.length; i++) {
                  var s = e[i];
                  s[0] < t[0] && (t = s),
                    s[0] > o[0] && (o = s),
                    s[1] < r[1] && (r = s),
                    s[1] > n[1] && (n = s);
                }
                var a = [t, r, o, n],
                  c = a.slice();
                for (i = 0; i < e.length; i++) v(e[i], a) || c.push(e[i]);
                return (function (e) {
                  e.sort(P);
                  for (var t = [], r = 0; r < e.length; r++) {
                    for (; 2 <= t.length && S(t[t.length - 2], t[t.length - 1], e[r]) <= 0; )
                      t.pop();
                    t.push(e[r]);
                  }
                  for (var o = [], n = e.length - 1; 0 <= n; n--) {
                    for (; 2 <= o.length && S(o[o.length - 2], o[o.length - 1], e[n]) <= 0; )
                      o.pop();
                    o.push(e[n]);
                  }
                  return o.pop(), t.pop(), t.concat(o);
                })(c);
              })(e),
              n = new m(16);
            (n.toBBox = function (e) {
              return { minX: e[0], minY: e[1], maxX: e[0], maxY: e[1] };
            }),
              (n.compareMinX = function (e, t) {
                return e[0] - t[0];
              }),
              (n.compareMinY = function (e, t) {
                return e[1] - t[1];
              }),
              n.load(e);
            for (var i, s = [], a = 0; a < o.length; a++) {
              var c = o[a];
              n.remove(c), (i = I(c, i)), s.push(i);
            }
            for (var u = new m(16), a = 0; a < s.length; a++) u.insert(w(s[a]));
            for (var l = t * t, p = r * r; s.length; ) {
              var d = s.shift(),
                h = d.p,
                f = d.next.p,
                y = T(h, f);
              y < p ||
                ((y = y / l),
                (c = (function (e, t, r, o, n, i, s) {
                  var a = new _([], b),
                    c = e.data;
                  for (; c; ) {
                    for (var u = 0; u < c.children.length; u++) {
                      var l = c.children[u],
                        p = c.leaf
                          ? C(l, r, o)
                          : (function (e, t, r) {
                              if (E(e, r) || E(t, r)) return 0;
                              var o = O(e[0], e[1], t[0], t[1], r.minX, r.minY, r.maxX, r.minY);
                              if (0 === o) return 0;
                              var n = O(e[0], e[1], t[0], t[1], r.minX, r.minY, r.minX, r.maxY);
                              if (0 === n) return 0;
                              var i = O(e[0], e[1], t[0], t[1], r.maxX, r.minY, r.maxX, r.maxY);
                              if (0 === i) return 0;
                              r = O(e[0], e[1], t[0], t[1], r.minX, r.maxY, r.maxX, r.maxY);
                              return 0 === r ? 0 : Math.min(o, n, i, r);
                            })(r, o, l);
                      i < p || a.push({ node: l, dist: p });
                    }
                    for (; a.length && !a.peek().node.children; ) {
                      var d = a.pop(),
                        h = d.node,
                        f = C(h, t, r),
                        y = C(h, o, n);
                      if (d.dist < f && d.dist < y && x(r, h, s) && x(o, h, s)) return h;
                    }
                    c = (c = a.pop()) && c.node;
                  }
                  return null;
                })(n, d.prev.p, h, f, d.next.next.p, y, u)) &&
                  Math.min(T(c, h), T(c, f)) <= y &&
                  (s.push(d),
                  s.push(I(c, d)),
                  n.remove(c),
                  u.remove(d),
                  u.insert(w(d)),
                  u.insert(w(d.next))));
            }
            d = i;
            for (var g = []; g.push(d.p), (d = d.next), d !== i; );
            return g.push(d.p), g;
          }
          function b(e, t) {
            return e.dist - t.dist;
          }
          function E(e, t) {
            return e[0] >= t.minX && e[0] <= t.maxX && e[1] >= t.minY && e[1] <= t.maxY;
          }
          function x(e, t, r) {
            for (
              var o,
                n,
                i,
                s,
                a = Math.min(e[0], t[0]),
                c = Math.min(e[1], t[1]),
                u = Math.max(e[0], t[0]),
                l = Math.max(e[1], t[1]),
                p = r.search({ minX: a, minY: c, maxX: u, maxY: l }),
                d = 0;
              d < p.length;
              d++
            )
              if (
                ((o = p[d].p),
                (n = p[d].next.p),
                (i = e),
                o !== (s = t) &&
                  n !== i &&
                  0 < S(o, n, i) != 0 < S(o, n, s) &&
                  0 < S(i, s, o) != 0 < S(i, s, n))
              )
                return;
            return 1;
          }
          function S(e, t, r) {
            return o(e[0], e[1], t[0], t[1], r[0], r[1]);
          }
          function w(e) {
            var t = e.p,
              r = e.next.p;
            return (
              (e.minX = Math.min(t[0], r[0])),
              (e.minY = Math.min(t[1], r[1])),
              (e.maxX = Math.max(t[0], r[0])),
              (e.maxY = Math.max(t[1], r[1])),
              e
            );
          }
          function I(e, t) {
            e = { p: e, prev: null, next: null, minX: 0, minY: 0, maxX: 0, maxY: 0 };
            return (
              t
                ? ((e.next = t.next), ((e.prev = t).next.prev = e), (t.next = e))
                : ((e.prev = e).next = e),
              e
            );
          }
          function T(e, t) {
            var r = e[0] - t[0],
              t = e[1] - t[1];
            return r * r + t * t;
          }
          function C(e, t, r) {
            var o = t[0],
              n = t[1],
              i = r[0] - o,
              s = r[1] - n;
            return (
              (0 === i && 0 === s) ||
                (1 < (t = ((e[0] - o) * i + (e[1] - n) * s) / (i * i + s * s))
                  ? ((o = r[0]), (n = r[1]))
                  : 0 < t && ((o += i * t), (n += s * t))),
              (i = e[0] - o) * i + (s = e[1] - n) * s
            );
          }
          function O(e, t, r, o, n, i, s, a) {
            var c,
              u,
              l = r - e,
              p = o - t,
              d = s - n,
              h = a - i,
              f = e - n,
              y = t - i,
              g = l * l + p * p,
              m = l * d + p * h,
              _ = d * d + h * h,
              p = l * f + p * y,
              d = d * f + h * y,
              f = g * _ - m * m,
              h = f,
              y = f;
            0 == f
              ? ((c = 0), (h = 1), (u = d), (y = _))
              : ((u = g * d - m * p),
                (c = m * d - _ * p) < 0
                  ? ((c = 0), (u = d), (y = _))
                  : h < c && ((c = h), (u = d + m), (y = _))),
              u < 0
                ? -p < (u = 0)
                  ? (c = 0)
                  : g < -p
                  ? (c = h)
                  : ((c = -p), (h = g))
                : y < u &&
                  ((u = y), m - p < 0 ? (c = 0) : g < m - p ? (c = h) : ((c = m - p), (h = g)));
            (r =
              (1 - (y = 0 === u ? 0 : u / y)) * n +
              y * s -
              ((1 - (h = 0 === c ? 0 : c / h)) * e + h * r)),
              (o = (1 - y) * i + y * a - ((1 - h) * t + h * o));
            return r * r + o * o;
          }
          function P(e, t) {
            return e[0] === t[0] ? e[1] - t[1] : e[0] - t[0];
          }
          _.default && (_ = _.default), (t.exports = n), (t.exports.default = n);
        },
        {
          'point-in-polygon': 161,
          rbush: 165,
          'robust-predicates/umd/orient2d.min.js': 166,
          tinyqueue: 167,
        },
      ],
      47: [
        function (e, t, r) {
          t.exports = function r(t) {
            switch ((t && t.type) || null) {
              case 'FeatureCollection':
                return (
                  (t.features = t.features.reduce(function (e, t) {
                    return e.concat(r(t));
                  }, [])),
                  t
                );
              case 'Feature':
                return t.geometry
                  ? r(t.geometry).map(function (e) {
                      e = {
                        type: 'Feature',
                        properties: JSON.parse(JSON.stringify(t.properties)),
                        geometry: e,
                      };
                      return void 0 !== t.id && (e.id = t.id), e;
                    })
                  : [t];
              case 'MultiPoint':
                return t.coordinates.map(function (e) {
                  return { type: 'Point', coordinates: e };
                });
              case 'MultiPolygon':
                return t.coordinates.map(function (e) {
                  return { type: 'Polygon', coordinates: e };
                });
              case 'MultiLineString':
                return t.coordinates.map(function (e) {
                  return { type: 'LineString', coordinates: e };
                });
              case 'GeometryCollection':
                return t.geometries.map(r).reduce(function (e, t) {
                  return e.concat(t);
                }, []);
              case 'Point':
              case 'Polygon':
              case 'LineString':
                return [t];
            }
          };
        },
        {},
      ],
      48: [
        function (e, t, r) {
          var o = e('rbush'),
            n = e('@turf/helpers'),
            i = e('@turf/meta'),
            s = e('@turf/bbox').default,
            a = i.featureEach,
            c = (i.coordEach, n.polygon, n.featureCollection);
          function u(e) {
            e = new o(e);
            return (
              (e.insert = function (e) {
                if ('Feature' !== e.type) throw new Error('invalid feature');
                return (e.bbox = e.bbox || s(e)), o.prototype.insert.call(this, e);
              }),
              (e.load = function (e) {
                var t = [];
                return (
                  Array.isArray(e)
                    ? e.forEach(function (e) {
                        if ('Feature' !== e.type) throw new Error('invalid features');
                        (e.bbox = e.bbox || s(e)), t.push(e);
                      })
                    : a(e, function (e) {
                        if ('Feature' !== e.type) throw new Error('invalid features');
                        (e.bbox = e.bbox || s(e)), t.push(e);
                      }),
                  o.prototype.load.call(this, t)
                );
              }),
              (e.remove = function (e, t) {
                if ('Feature' !== e.type) throw new Error('invalid feature');
                return (e.bbox = e.bbox || s(e)), o.prototype.remove.call(this, e, t);
              }),
              (e.clear = function () {
                return o.prototype.clear.call(this);
              }),
              (e.search = function (e) {
                e = o.prototype.search.call(this, this.toBBox(e));
                return c(e);
              }),
              (e.collides = function (e) {
                return o.prototype.collides.call(this, this.toBBox(e));
              }),
              (e.all = function () {
                var e = o.prototype.all.call(this);
                return c(e);
              }),
              (e.toJSON = function () {
                return o.prototype.toJSON.call(this);
              }),
              (e.fromJSON = function (e) {
                return o.prototype.fromJSON.call(this, e);
              }),
              (e.toBBox = function (e) {
                var t;
                if (e.bbox) t = e.bbox;
                else if (Array.isArray(e) && 4 === e.length) t = e;
                else if (Array.isArray(e) && 6 === e.length) t = [e[0], e[1], e[3], e[4]];
                else if ('Feature' === e.type) t = s(e);
                else {
                  if ('FeatureCollection' !== e.type) throw new Error('invalid geojson');
                  t = s(e);
                }
                return { minX: t[0], minY: t[1], maxX: t[2], maxY: t[3] };
              }),
              e
            );
          }
          (t.exports = u), (t.exports.default = u);
        },
        { '@turf/bbox': 11, '@turf/helpers': 21, '@turf/meta': 31, rbush: 165 },
      ],
      49: [
        function (f, y, g) {
          (function (h) {
            (function () {
              var e,
                t,
                r,
                o,
                n,
                i,
                s,
                a,
                c,
                u,
                l,
                p =
                  ((u = [18, 22]),
                  (l = [22, 24]),
                  (e = {
                    trace: function () {},
                    yy: {},
                    symbols_: {
                      error: 2,
                      JSONString: 3,
                      STRING: 4,
                      JSONNumber: 5,
                      NUMBER: 6,
                      JSONNullLiteral: 7,
                      NULL: 8,
                      JSONBooleanLiteral: 9,
                      TRUE: 10,
                      FALSE: 11,
                      JSONText: 12,
                      JSONValue: 13,
                      EOF: 14,
                      JSONObject: 15,
                      JSONArray: 16,
                      '{': 17,
                      '}': 18,
                      JSONMemberList: 19,
                      JSONMember: 20,
                      ':': 21,
                      ',': 22,
                      '[': 23,
                      ']': 24,
                      JSONElementList: 25,
                      $accept: 0,
                      $end: 1,
                    },
                    terminals_: {
                      2: 'error',
                      4: 'STRING',
                      6: 'NUMBER',
                      8: 'NULL',
                      10: 'TRUE',
                      11: 'FALSE',
                      14: 'EOF',
                      17: '{',
                      18: '}',
                      21: ':',
                      22: ',',
                      23: '[',
                      24: ']',
                    },
                    productions_: [
                      0,
                      [3, 1],
                      [5, 1],
                      [7, 1],
                      [9, 1],
                      [9, 1],
                      [12, 2],
                      [13, 1],
                      [13, 1],
                      [13, 1],
                      [13, 1],
                      [13, 1],
                      [13, 1],
                      [15, 2],
                      [15, 3],
                      [20, 3],
                      [19, 1],
                      [19, 3],
                      [16, 2],
                      [16, 3],
                      [25, 1],
                      [25, 3],
                    ],
                    performAction: function (e, t, r, o, n, i) {
                      var s = i.length - 1;
                      switch (n) {
                        case 1:
                          this.$ = e
                            .replace(/\\(\\|")/g, '$1')
                            .replace(/\\n/g, '\n')
                            .replace(/\\r/g, '\r')
                            .replace(/\\t/g, '\t')
                            .replace(/\\v/g, '\v')
                            .replace(/\\f/g, '\f')
                            .replace(/\\b/g, '\b');
                          break;
                        case 2:
                          this.$ = Number(e);
                          break;
                        case 3:
                          this.$ = null;
                          break;
                        case 4:
                          this.$ = !0;
                          break;
                        case 5:
                          this.$ = !1;
                          break;
                        case 6:
                          return (this.$ = i[s - 1]);
                        case 13:
                          (this.$ = {}),
                            Object.defineProperty(this.$, '__line__', {
                              value: this._$.first_line,
                              enumerable: !1,
                            });
                          break;
                        case 14:
                        case 19:
                          (this.$ = i[s - 1]),
                            Object.defineProperty(this.$, '__line__', {
                              value: this._$.first_line,
                              enumerable: !1,
                            });
                          break;
                        case 15:
                          this.$ = [i[s - 2], i[s]];
                          break;
                        case 16:
                          (this.$ = {}), (this.$[i[s][0]] = i[s][1]);
                          break;
                        case 17:
                          (this.$ = i[s - 2]),
                            void 0 !== i[s - 2][i[s][0]] &&
                              (this.$.__duplicateProperties__ ||
                                Object.defineProperty(this.$, '__duplicateProperties__', {
                                  value: [],
                                  enumerable: !1,
                                }),
                              this.$.__duplicateProperties__.push(i[s][0])),
                            (i[s - 2][i[s][0]] = i[s][1]);
                          break;
                        case 18:
                          (this.$ = []),
                            Object.defineProperty(this.$, '__line__', {
                              value: this._$.first_line,
                              enumerable: !1,
                            });
                          break;
                        case 20:
                          this.$ = [i[s]];
                          break;
                        case 21:
                          (this.$ = i[s - 2]), i[s - 2].push(i[s]);
                      }
                    },
                    table: [
                      {
                        3: 5,
                        4: (t = [1, 12]),
                        5: 6,
                        6: (r = [1, 13]),
                        7: 3,
                        8: (o = [1, 9]),
                        9: 4,
                        10: (n = [1, 10]),
                        11: (i = [1, 11]),
                        12: 1,
                        13: 2,
                        15: 7,
                        16: 8,
                        17: (s = [1, 14]),
                        23: (a = [1, 15]),
                      },
                      { 1: [3] },
                      { 14: [1, 16] },
                      (e = function (e, t, r, o) {
                        for (r = r || {}, o = e.length; o--; r[e[o]] = t);
                        return r;
                      })((c = [14, 18, 22, 24]), [2, 7]),
                      e(c, [2, 8]),
                      e(c, [2, 9]),
                      e(c, [2, 10]),
                      e(c, [2, 11]),
                      e(c, [2, 12]),
                      e(c, [2, 3]),
                      e(c, [2, 4]),
                      e(c, [2, 5]),
                      e([14, 18, 21, 22, 24], [2, 1]),
                      e(c, [2, 2]),
                      { 3: 20, 4: t, 18: [1, 17], 19: 18, 20: 19 },
                      {
                        3: 5,
                        4: t,
                        5: 6,
                        6: r,
                        7: 3,
                        8: o,
                        9: 4,
                        10: n,
                        11: i,
                        13: 23,
                        15: 7,
                        16: 8,
                        17: s,
                        23: a,
                        24: [1, 21],
                        25: 22,
                      },
                      { 1: [2, 6] },
                      e(c, [2, 13]),
                      { 18: [1, 24], 22: [1, 25] },
                      e(u, [2, 16]),
                      { 21: [1, 26] },
                      e(c, [2, 18]),
                      { 22: [1, 28], 24: [1, 27] },
                      e(l, [2, 20]),
                      e(c, [2, 14]),
                      { 3: 20, 4: t, 20: 29 },
                      {
                        3: 5,
                        4: t,
                        5: 6,
                        6: r,
                        7: 3,
                        8: o,
                        9: 4,
                        10: n,
                        11: i,
                        13: 30,
                        15: 7,
                        16: 8,
                        17: s,
                        23: a,
                      },
                      e(c, [2, 19]),
                      {
                        3: 5,
                        4: t,
                        5: 6,
                        6: r,
                        7: 3,
                        8: o,
                        9: 4,
                        10: n,
                        11: i,
                        13: 31,
                        15: 7,
                        16: 8,
                        17: s,
                        23: a,
                      },
                      e(u, [2, 17]),
                      e(u, [2, 15]),
                      e(l, [2, 21]),
                    ],
                    defaultActions: { 16: [2, 6] },
                    parseError: function (e, t) {
                      if (!t.recoverable) {
                        function r(e, t) {
                          (this.message = e), (this.hash = t);
                        }
                        throw ((r.prototype = Error), new r(e, t));
                      }
                      this.trace(e);
                    },
                    parse: function (e) {
                      var t,
                        r = this,
                        o = [0],
                        n = [null],
                        i = [],
                        s = this.table,
                        a = '',
                        c = 0,
                        u = 0,
                        l = 0,
                        p = i.slice.call(arguments, 1),
                        d = Object.create(this.lexer),
                        h = { yy: {} };
                      for (t in this.yy)
                        Object.prototype.hasOwnProperty.call(this.yy, t) && (h.yy[t] = this.yy[t]);
                      d.setInput(e, h.yy),
                        (h.yy.lexer = d),
                        (h.yy.parser = this),
                        void 0 === d.yylloc && (d.yylloc = {});
                      var f = d.yylloc;
                      i.push(f);
                      var y = d.options && d.options.ranges;
                      'function' == typeof h.yy.parseError
                        ? (this.parseError = h.yy.parseError)
                        : (this.parseError = Object.getPrototypeOf(this).parseError);
                      for (
                        var g,
                          m,
                          _,
                          v,
                          b,
                          E,
                          x,
                          S = function () {
                            var e = d.lex() || 1;
                            return 'number' != typeof e && (e = r.symbols_[e] || e), e;
                          },
                          w = {};
                        ;

                      ) {
                        if (
                          ((_ = o[o.length - 1]),
                          void 0 ===
                            (v =
                              this.defaultActions[_] ||
                              (null == g && (g = S()), s[_] && s[_][g])) ||
                            !v.length ||
                            !v[0])
                        ) {
                          var I = '',
                            T = [];
                          for (E in s[_])
                            this.terminals_[E] && 2 < E && T.push("'" + this.terminals_[E] + "'");
                          (I = d.showPosition
                            ? 'Parse error on line ' +
                              (c + 1) +
                              ':\n' +
                              d.showPosition() +
                              '\nExpecting ' +
                              T.join(', ') +
                              ", got '" +
                              (this.terminals_[g] || g) +
                              "'"
                            : 'Parse error on line ' +
                              (c + 1) +
                              ': Unexpected ' +
                              (1 == g ? 'end of input' : "'" + (this.terminals_[g] || g) + "'")),
                            this.parseError(I, {
                              text: d.match,
                              token: this.terminals_[g] || g,
                              line: d.yylineno,
                              loc: f,
                              expected: T,
                            });
                        }
                        if (v[0] instanceof Array && 1 < v.length)
                          throw new Error(
                            'Parse Error: multiple actions possible at state: ' +
                              _ +
                              ', token: ' +
                              g,
                          );
                        switch (v[0]) {
                          case 1:
                            o.push(g),
                              n.push(d.yytext),
                              i.push(d.yylloc),
                              o.push(v[1]),
                              (g = null),
                              m
                                ? ((g = m), (m = null))
                                : ((u = d.yyleng),
                                  (a = d.yytext),
                                  (c = d.yylineno),
                                  (f = d.yylloc),
                                  0 < l && l--);
                            break;
                          case 2:
                            if (
                              ((x = this.productions_[v[1]][1]),
                              (w.$ = n[n.length - x]),
                              (w._$ = {
                                first_line: i[i.length - (x || 1)].first_line,
                                last_line: i[i.length - 1].last_line,
                                first_column: i[i.length - (x || 1)].first_column,
                                last_column: i[i.length - 1].last_column,
                              }),
                              y &&
                                (w._$.range = [
                                  i[i.length - (x || 1)].range[0],
                                  i[i.length - 1].range[1],
                                ]),
                              void 0 !==
                                (b = this.performAction.apply(
                                  w,
                                  [a, u, c, h.yy, v[1], n, i].concat(p),
                                )))
                            )
                              return b;
                            x &&
                              ((o = o.slice(0, -1 * x * 2)),
                              (n = n.slice(0, -1 * x)),
                              (i = i.slice(0, -1 * x))),
                              o.push(this.productions_[v[1]][0]),
                              n.push(w.$),
                              i.push(w._$),
                              (x = s[o[o.length - 2]][o[o.length - 1]]),
                              o.push(x);
                            break;
                          case 3:
                            return !0;
                        }
                      }
                      return !0;
                    },
                  }),
                  (l = {
                    EOF: 1,
                    parseError: function (e, t) {
                      if (!this.yy.parser) throw new Error(e);
                      this.yy.parser.parseError(e, t);
                    },
                    setInput: function (e, t) {
                      return (
                        (this.yy = t || this.yy || {}),
                        (this._input = e),
                        (this._more = this._backtrack = this.done = !1),
                        (this.yylineno = this.yyleng = 0),
                        (this.yytext = this.matched = this.match = ''),
                        (this.conditionStack = ['INITIAL']),
                        (this.yylloc = {
                          first_line: 1,
                          first_column: 0,
                          last_line: 1,
                          last_column: 0,
                        }),
                        this.options.ranges && (this.yylloc.range = [0, 0]),
                        (this.offset = 0),
                        this
                      );
                    },
                    input: function () {
                      var e = this._input[0];
                      return (
                        (this.yytext += e),
                        this.yyleng++,
                        this.offset++,
                        (this.match += e),
                        (this.matched += e),
                        e.match(/(?:\r\n?|\n).*/g)
                          ? (this.yylineno++, this.yylloc.last_line++)
                          : this.yylloc.last_column++,
                        this.options.ranges && this.yylloc.range[1]++,
                        (this._input = this._input.slice(1)),
                        e
                      );
                    },
                    unput: function (e) {
                      var t = e.length,
                        r = e.split(/(?:\r\n?|\n)/g);
                      (this._input = e + this._input),
                        (this.yytext = this.yytext.substr(0, this.yytext.length - t)),
                        (this.offset -= t);
                      var o = this.match.split(/(?:\r\n?|\n)/g);
                      (this.match = this.match.substr(0, this.match.length - 1)),
                        (this.matched = this.matched.substr(0, this.matched.length - 1)),
                        r.length - 1 && (this.yylineno -= r.length - 1);
                      e = this.yylloc.range;
                      return (
                        (this.yylloc = {
                          first_line: this.yylloc.first_line,
                          last_line: this.yylineno + 1,
                          first_column: this.yylloc.first_column,
                          last_column: r
                            ? (r.length === o.length ? this.yylloc.first_column : 0) +
                              o[o.length - r.length].length -
                              r[0].length
                            : this.yylloc.first_column - t,
                        }),
                        this.options.ranges && (this.yylloc.range = [e[0], e[0] + this.yyleng - t]),
                        (this.yyleng = this.yytext.length),
                        this
                      );
                    },
                    more: function () {
                      return (this._more = !0), this;
                    },
                    reject: function () {
                      return this.options.backtrack_lexer
                        ? ((this._backtrack = !0), this)
                        : this.parseError(
                            'Lexical error on line ' +
                              (this.yylineno + 1) +
                              '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' +
                              this.showPosition(),
                            { text: '', token: null, line: this.yylineno },
                          );
                    },
                    less: function (e) {
                      this.unput(this.match.slice(e));
                    },
                    pastInput: function () {
                      var e = this.matched.substr(0, this.matched.length - this.match.length);
                      return (20 < e.length ? '...' : '') + e.substr(-20).replace(/\n/g, '');
                    },
                    upcomingInput: function () {
                      var e = this.match;
                      return (
                        e.length < 20 && (e += this._input.substr(0, 20 - e.length)),
                        (e.substr(0, 20) + (20 < e.length ? '...' : '')).replace(/\n/g, '')
                      );
                    },
                    showPosition: function () {
                      var e = this.pastInput(),
                        t = new Array(e.length + 1).join('-');
                      return e + this.upcomingInput() + '\n' + t + '^';
                    },
                    test_match: function (e, t) {
                      var r, o;
                      if (
                        (this.options.backtrack_lexer &&
                          ((o = {
                            yylineno: this.yylineno,
                            yylloc: {
                              first_line: this.yylloc.first_line,
                              last_line: this.last_line,
                              first_column: this.yylloc.first_column,
                              last_column: this.yylloc.last_column,
                            },
                            yytext: this.yytext,
                            match: this.match,
                            matches: this.matches,
                            matched: this.matched,
                            yyleng: this.yyleng,
                            offset: this.offset,
                            _more: this._more,
                            _input: this._input,
                            yy: this.yy,
                            conditionStack: this.conditionStack.slice(0),
                            done: this.done,
                          }),
                          this.options.ranges && (o.yylloc.range = this.yylloc.range.slice(0))),
                        (r = e[0].match(/(?:\r\n?|\n).*/g)) && (this.yylineno += r.length),
                        (this.yylloc = {
                          first_line: this.yylloc.last_line,
                          last_line: this.yylineno + 1,
                          first_column: this.yylloc.last_column,
                          last_column: r
                            ? r[r.length - 1].length - r[r.length - 1].match(/\r?\n?/)[0].length
                            : this.yylloc.last_column + e[0].length,
                        }),
                        (this.yytext += e[0]),
                        (this.match += e[0]),
                        (this.matches = e),
                        (this.yyleng = this.yytext.length),
                        this.options.ranges &&
                          (this.yylloc.range = [this.offset, (this.offset += this.yyleng)]),
                        (this._more = !1),
                        (this._backtrack = !1),
                        (this._input = this._input.slice(e[0].length)),
                        (this.matched += e[0]),
                        (t = this.performAction.call(
                          this,
                          this.yy,
                          this,
                          t,
                          this.conditionStack[this.conditionStack.length - 1],
                        )),
                        this.done && this._input && (this.done = !1),
                        t)
                      )
                        return t;
                      if (this._backtrack) {
                        for (var n in o) this[n] = o[n];
                        return !1;
                      }
                      return !1;
                    },
                    next: function () {
                      if (this.done) return this.EOF;
                      var e, t, r, o;
                      this._input || (this.done = !0),
                        this._more || ((this.yytext = ''), (this.match = ''));
                      for (var n = this._currentRules(), i = 0; i < n.length; i++)
                        if (
                          (r = this._input.match(this.rules[n[i]])) &&
                          (!t || r[0].length > t[0].length)
                        )
                          if (((t = r), (o = i), this.options.backtrack_lexer)) {
                            if (!1 !== (e = this.test_match(r, n[i]))) return e;
                            if (!this._backtrack) return !1;
                            t = !1;
                          } else if (!this.options.flex) break;
                      return t
                        ? !1 !== (e = this.test_match(t, n[o])) && e
                        : '' === this._input
                        ? this.EOF
                        : this.parseError(
                            'Lexical error on line ' +
                              (this.yylineno + 1) +
                              '. Unrecognized text.\n' +
                              this.showPosition(),
                            { text: '', token: null, line: this.yylineno },
                          );
                    },
                    lex: function () {
                      var e = this.next();
                      return e || this.lex();
                    },
                    begin: function (e) {
                      this.conditionStack.push(e);
                    },
                    popState: function () {
                      return 0 < this.conditionStack.length - 1
                        ? this.conditionStack.pop()
                        : this.conditionStack[0];
                    },
                    _currentRules: function () {
                      return (
                        this.conditionStack.length &&
                        this.conditionStack[this.conditionStack.length - 1]
                          ? this.conditions[this.conditionStack[this.conditionStack.length - 1]]
                          : this.conditions.INITIAL
                      ).rules;
                    },
                    topState: function (e) {
                      return 0 <= (e = this.conditionStack.length - 1 - Math.abs(e || 0))
                        ? this.conditionStack[e]
                        : 'INITIAL';
                    },
                    pushState: function (e) {
                      this.begin(e);
                    },
                    stateStackSize: function () {
                      return this.conditionStack.length;
                    },
                    options: {},
                    performAction: function (e, t, r) {
                      switch (r) {
                        case 0:
                          break;
                        case 1:
                          return 6;
                        case 2:
                          return (t.yytext = t.yytext.substr(1, t.yyleng - 2)), 4;
                        case 3:
                          return 17;
                        case 4:
                          return 18;
                        case 5:
                          return 23;
                        case 6:
                          return 24;
                        case 7:
                          return 22;
                        case 8:
                          return 21;
                        case 9:
                          return 10;
                        case 10:
                          return 11;
                        case 11:
                          return 8;
                        case 12:
                          return 14;
                        case 13:
                          return 'INVALID';
                      }
                    },
                    rules: [
                      /^(?:\s+)/,
                      /^(?:(-?([0-9]|[1-9][0-9]+))(\.[0-9]+)?([eE][-+]?[0-9]+)?\b)/,
                      /^(?:"(?:\\[\\"bfnrt\/]|\\u[a-fA-F0-9]{4}|[^\\\0-\x09\x0a-\x1f"])*")/,
                      /^(?:\{)/,
                      /^(?:\})/,
                      /^(?:\[)/,
                      /^(?:\])/,
                      /^(?:,)/,
                      /^(?::)/,
                      /^(?:true\b)/,
                      /^(?:false\b)/,
                      /^(?:null\b)/,
                      /^(?:$)/,
                      /^(?:.)/,
                    ],
                    conditions: {
                      INITIAL: {
                        rules: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
                        inclusive: !0,
                      },
                    },
                  }),
                  (e.lexer = l),
                  new ((d.prototype = e).Parser = d)());
              function d() {
                this.yy = {};
              }
              void 0 !== f &&
                void 0 !== g &&
                ((g.parser = p),
                (g.Parser = p.Parser),
                (g.parse = function () {
                  return p.parse.apply(p, arguments);
                }),
                (g.main = function (e) {
                  e[1] || (console.log('Usage: ' + e[0] + ' FILE'), h.exit(1));
                  e = f('fs').readFileSync(f('path').normalize(e[1]), 'utf8');
                  return g.parser.parse(e);
                }),
                void 0 !== y && f.main === y && g.main(h.argv.slice(1)));
            }).call(this);
          }).call(this, f('_process'));
        },
        { _process: 164, fs: 45, path: 159 },
      ],
      50: [
        function (e, Ue, Ge) {
          (function (De) {
            (function () {
              var o = '__lodash_hash_undefined__',
                _ = 1,
                y = 2,
                d = 9007199254740991,
                p = '[object Arguments]',
                h = '[object Array]',
                t = '[object AsyncFunction]',
                f = '[object Boolean]',
                g = '[object Date]',
                m = '[object Error]',
                r = '[object Function]',
                n = '[object GeneratorFunction]',
                v = '[object Map]',
                b = '[object Number]',
                i = '[object Null]',
                E = '[object Object]',
                s = '[object Promise]',
                a = '[object Proxy]',
                x = '[object RegExp]',
                S = '[object Set]',
                w = '[object String]',
                I = '[object Symbol]',
                c = '[object Undefined]',
                u = '[object WeakMap]',
                T = '[object ArrayBuffer]',
                C = '[object DataView]',
                l = /^\[object .+?Constructor\]$/,
                O = /^(?:0|[1-9]\d*)$/,
                P = {};
              (P['[object Float32Array]'] =
                P['[object Float64Array]'] =
                P['[object Int8Array]'] =
                P['[object Int16Array]'] =
                P['[object Int32Array]'] =
                P['[object Uint8Array]'] =
                P['[object Uint8ClampedArray]'] =
                P['[object Uint16Array]'] =
                P['[object Uint32Array]'] =
                  !0),
                (P[p] =
                  P[h] =
                  P[T] =
                  P[f] =
                  P[C] =
                  P[g] =
                  P[m] =
                  P[r] =
                  P[v] =
                  P[b] =
                  P[E] =
                  P[x] =
                  P[S] =
                  P[w] =
                  P[u] =
                    !1);
              var e = 'object' == typeof De && De && De.Object === Object && De,
                A = 'object' == typeof self && self && self.Object === Object && self,
                M = e || A || Function('return this')(),
                L = 'object' == typeof Ge && Ge && !Ge.nodeType && Ge,
                N = L && 'object' == typeof Ue && Ue && !Ue.nodeType && Ue,
                F = N && N.exports === L,
                R = F && e.process,
                j = (function () {
                  try {
                    return R && R.binding && R.binding('util');
                  } catch (e) {}
                })(),
                A = j && j.isTypedArray;
              function k(e) {
                var r = -1,
                  o = Array(e.size);
                return (
                  e.forEach(function (e, t) {
                    o[++r] = [t, e];
                  }),
                  o
                );
              }
              function D(e) {
                var t = -1,
                  r = Array(e.size);
                return (
                  e.forEach(function (e) {
                    r[++t] = e;
                  }),
                  r
                );
              }
              var U,
                G,
                N = Array.prototype,
                L = Function.prototype,
                V = Object.prototype,
                e = M['__core-js_shared__'],
                B = L.toString,
                z = V.hasOwnProperty,
                J = (j = /[^.]+$/.exec((e && e.keys && e.keys.IE_PROTO) || ''))
                  ? 'Symbol(src)_1.' + j
                  : '',
                W = V.toString,
                Y = RegExp(
                  '^' +
                    B.call(z)
                      .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
                      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
                    '$',
                ),
                L = F ? M.Buffer : void 0,
                e = M.Symbol,
                K = M.Uint8Array,
                H = V.propertyIsEnumerable,
                $ = N.splice,
                X = e ? e.toStringTag : void 0,
                q = Object.getOwnPropertySymbols,
                j = L ? L.isBuffer : void 0,
                Z =
                  ((U = Object.keys),
                  (G = Object),
                  function (e) {
                    return U(G(e));
                  }),
                F = Se(M, 'DataView'),
                Q = Se(M, 'Map'),
                N = Se(M, 'Promise'),
                L = Se(M, 'Set'),
                M = Se(M, 'WeakMap'),
                ee = Se(Object, 'create'),
                te = Te(F),
                re = Te(Q),
                oe = Te(N),
                ne = Te(L),
                ie = Te(M),
                e = e ? e.prototype : void 0,
                se = e ? e.valueOf : void 0;
              function ae(e) {
                var t = -1,
                  r = null == e ? 0 : e.length;
                for (this.clear(); ++t < r; ) {
                  var o = e[t];
                  this.set(o[0], o[1]);
                }
              }
              function ce(e) {
                var t = -1,
                  r = null == e ? 0 : e.length;
                for (this.clear(); ++t < r; ) {
                  var o = e[t];
                  this.set(o[0], o[1]);
                }
              }
              function ue(e) {
                var t = -1,
                  r = null == e ? 0 : e.length;
                for (this.clear(); ++t < r; ) {
                  var o = e[t];
                  this.set(o[0], o[1]);
                }
              }
              function le(e) {
                var t = -1,
                  r = null == e ? 0 : e.length;
                for (this.__data__ = new ue(); ++t < r; ) this.add(e[t]);
              }
              function pe(e) {
                e = this.__data__ = new ce(e);
                this.size = e.size;
              }
              function de(e, t) {
                var r,
                  o,
                  n,
                  i = Pe(e),
                  s = !i && Oe(e),
                  a = !i && !s && Ae(e),
                  c = !i && !s && !a && je(e),
                  u = i || s || a || c,
                  l = u
                    ? (function (e, t) {
                        for (var r = -1, o = Array(e); ++r < e; ) o[r] = t(r);
                        return o;
                      })(e.length, String)
                    : [],
                  p = l.length;
                for (r in e)
                  (!t && !z.call(e, r)) ||
                    (u &&
                      ('length' == r ||
                        (a && ('offset' == r || 'parent' == r)) ||
                        (c && ('buffer' == r || 'byteLength' == r || 'byteOffset' == r)) ||
                        ((o = r),
                        !!(n = null == (n = p) ? d : n) &&
                          ('number' == typeof o || O.test(o)) &&
                          -1 < o &&
                          o % 1 == 0 &&
                          o < n))) ||
                    l.push(r);
                return l;
              }
              function he(e, t) {
                for (var r = e.length; r--; ) if (Ce(e[r][0], t)) return r;
                return -1;
              }
              function fe(e, t, r) {
                t = t(e);
                return Pe(e)
                  ? t
                  : (function (e, t) {
                      for (var r = -1, o = t.length, n = e.length; ++r < o; ) e[n + r] = t[r];
                      return e;
                    })(t, r(e));
              }
              function ye(e) {
                return null == e
                  ? void 0 === e
                    ? c
                    : i
                  : X && X in Object(e)
                  ? (function (e) {
                      var t = z.call(e, X),
                        r = e[X];
                      try {
                        var o = !(e[X] = void 0);
                      } catch (e) {}
                      var n = W.call(e);
                      o && (t ? (e[X] = r) : delete e[X]);
                      return n;
                    })(e)
                  : ((e = e), W.call(e));
              }
              function ge(e) {
                return Fe(e) && ye(e) == p;
              }
              function me(e, t, r, o, n) {
                return (
                  e === t ||
                  (null == e || null == t || (!Fe(e) && !Fe(t))
                    ? e != e && t != t
                    : (function (e, t, r, o, n, i) {
                        var s = Pe(e),
                          a = Pe(t),
                          c = s ? h : Ie(e),
                          u = a ? h : Ie(t),
                          l = (c = c == p ? E : c) == E,
                          a = (u = u == p ? E : u) == E,
                          u = c == u;
                        if (u && Ae(e)) {
                          if (!Ae(t)) return !1;
                          l = !(s = !0);
                        }
                        if (u && !l)
                          return (
                            (i = i || new pe()),
                            s || je(e)
                              ? be(e, t, r, o, n, i)
                              : (function (e, t, r, o, n, i, s) {
                                  switch (r) {
                                    case C:
                                      if (
                                        e.byteLength != t.byteLength ||
                                        e.byteOffset != t.byteOffset
                                      )
                                        return !1;
                                      (e = e.buffer), (t = t.buffer);
                                    case T:
                                      return e.byteLength == t.byteLength && i(new K(e), new K(t))
                                        ? !0
                                        : !1;
                                    case f:
                                    case g:
                                    case b:
                                      return Ce(+e, +t);
                                    case m:
                                      return e.name == t.name && e.message == t.message;
                                    case x:
                                    case w:
                                      return e == t + '';
                                    case v:
                                      var a = k;
                                    case S:
                                      var c = o & _;
                                      if (((a = a || D), e.size != t.size && !c)) return !1;
                                      c = s.get(e);
                                      if (c) return c == t;
                                      (o |= y), s.set(e, t);
                                      a = be(a(e), a(t), o, n, i, s);
                                      return s.delete(e), a;
                                    case I:
                                      if (se) return se.call(e) == se.call(t);
                                  }
                                  return !1;
                                })(e, t, c, r, o, n, i)
                          );
                        if (!(r & _)) {
                          (l = l && z.call(e, '__wrapped__')), (a = a && z.call(t, '__wrapped__'));
                          if (l || a) {
                            (l = l ? e.value() : e), (a = a ? t.value() : t);
                            return (i = i || new pe()), n(l, a, r, o, i);
                          }
                        }
                        return (
                          u &&
                          ((i = i || new pe()),
                          (function (e, t, r, o, n, i) {
                            var s = r & _,
                              a = Ee(e),
                              c = a.length,
                              u = Ee(t).length;
                            if (c != u && !s) return !1;
                            var l = c;
                            for (; l--; ) {
                              var p = a[l];
                              if (!(s ? p in t : z.call(t, p))) return !1;
                            }
                            var d = i.get(e);
                            if (d && i.get(t)) return d == t;
                            var h = !0;
                            i.set(e, t), i.set(t, e);
                            var f = s;
                            for (; ++l < c; ) {
                              p = a[l];
                              var y,
                                g = e[p],
                                m = t[p];
                              if (
                                (o && (y = s ? o(m, g, p, t, e, i) : o(g, m, p, e, t, i)),
                                !(void 0 === y ? g === m || n(g, m, r, o, i) : y))
                              ) {
                                h = !1;
                                break;
                              }
                              f = f || 'constructor' == p;
                            }
                            h &&
                              !f &&
                              ((u = e.constructor),
                              (d = t.constructor),
                              u != d &&
                                'constructor' in e &&
                                'constructor' in t &&
                                !(
                                  'function' == typeof u &&
                                  u instanceof u &&
                                  'function' == typeof d &&
                                  d instanceof d
                                ) &&
                                (h = !1));
                            return i.delete(e), i.delete(t), h;
                          })(e, t, r, o, n, i))
                        );
                      })(e, t, r, o, me, n))
                );
              }
              function _e(e) {
                var t;
                return Ne(e) && ((t = e), !(J && J in t)) && (Me(e) ? Y : l).test(Te(e));
              }
              function ve(e) {
                if (
                  ((r = ('function' == typeof (r = (t = e) && t.constructor) && r.prototype) || V),
                  t !== r)
                )
                  return Z(e);
                var t,
                  r,
                  o,
                  n = [];
                for (o in Object(e)) z.call(e, o) && 'constructor' != o && n.push(o);
                return n;
              }
              function be(e, t, o, n, i, s) {
                var r = o & _,
                  a = e.length,
                  c = t.length;
                if (a != c && !(r && a < c)) return !1;
                c = s.get(e);
                if (c && s.get(t)) return c == t;
                var u = -1,
                  l = !0,
                  p = o & y ? new le() : void 0;
                for (s.set(e, t), s.set(t, e); ++u < a; ) {
                  var d,
                    h = e[u],
                    f = t[u];
                  if ((n && (d = r ? n(f, h, u, t, e, s) : n(h, f, u, e, t, s)), void 0 !== d)) {
                    if (d) continue;
                    l = !1;
                    break;
                  }
                  if (p) {
                    if (
                      !(function (e, t) {
                        for (var r = -1, o = null == e ? 0 : e.length; ++r < o; )
                          if (t(e[r], r, e)) return 1;
                      })(t, function (e, t) {
                        return (r = t), !p.has(r) && (h === e || i(h, e, o, n, s)) && p.push(t);
                        var r;
                      })
                    ) {
                      l = !1;
                      break;
                    }
                  } else if (h !== f && !i(h, f, o, n, s)) {
                    l = !1;
                    break;
                  }
                }
                return s.delete(e), s.delete(t), l;
              }
              function Ee(e) {
                return fe(e, ke, we);
              }
              function xe(e, t) {
                var r,
                  o = e.__data__;
                return (
                  'string' == (e = typeof (r = t)) ||
                  'number' == e ||
                  'symbol' == e ||
                  'boolean' == e
                    ? '__proto__' !== r
                    : null === r
                )
                  ? o['string' == typeof t ? 'string' : 'hash']
                  : o.map;
              }
              function Se(e, t) {
                (t = t), (t = null == (e = e) ? void 0 : e[t]);
                return _e(t) ? t : void 0;
              }
              (ae.prototype.clear = function () {
                (this.__data__ = ee ? ee(null) : {}), (this.size = 0);
              }),
                (ae.prototype.delete = function (e) {
                  return (e = this.has(e) && delete this.__data__[e]), (this.size -= e ? 1 : 0), e;
                }),
                (ae.prototype.get = function (e) {
                  var t = this.__data__;
                  if (ee) {
                    var r = t[e];
                    return r === o ? void 0 : r;
                  }
                  return z.call(t, e) ? t[e] : void 0;
                }),
                (ae.prototype.has = function (e) {
                  var t = this.__data__;
                  return ee ? void 0 !== t[e] : z.call(t, e);
                }),
                (ae.prototype.set = function (e, t) {
                  var r = this.__data__;
                  return (
                    (this.size += this.has(e) ? 0 : 1), (r[e] = ee && void 0 === t ? o : t), this
                  );
                }),
                (ce.prototype.clear = function () {
                  (this.__data__ = []), (this.size = 0);
                }),
                (ce.prototype.delete = function (e) {
                  var t = this.__data__;
                  return (
                    !((e = he(t, e)) < 0) &&
                    (e == t.length - 1 ? t.pop() : $.call(t, e, 1), --this.size, !0)
                  );
                }),
                (ce.prototype.get = function (e) {
                  var t = this.__data__;
                  return (e = he(t, e)) < 0 ? void 0 : t[e][1];
                }),
                (ce.prototype.has = function (e) {
                  return -1 < he(this.__data__, e);
                }),
                (ce.prototype.set = function (e, t) {
                  var r = this.__data__,
                    o = he(r, e);
                  return o < 0 ? (++this.size, r.push([e, t])) : (r[o][1] = t), this;
                }),
                (ue.prototype.clear = function () {
                  (this.size = 0),
                    (this.__data__ = { hash: new ae(), map: new (Q || ce)(), string: new ae() });
                }),
                (ue.prototype.delete = function (e) {
                  return (e = xe(this, e).delete(e)), (this.size -= e ? 1 : 0), e;
                }),
                (ue.prototype.get = function (e) {
                  return xe(this, e).get(e);
                }),
                (ue.prototype.has = function (e) {
                  return xe(this, e).has(e);
                }),
                (ue.prototype.set = function (e, t) {
                  var r = xe(this, e),
                    o = r.size;
                  return r.set(e, t), (this.size += r.size == o ? 0 : 1), this;
                }),
                (le.prototype.add = le.prototype.push =
                  function (e) {
                    return this.__data__.set(e, o), this;
                  }),
                (le.prototype.has = function (e) {
                  return this.__data__.has(e);
                }),
                (pe.prototype.clear = function () {
                  (this.__data__ = new ce()), (this.size = 0);
                }),
                (pe.prototype.delete = function (e) {
                  var t = this.__data__,
                    e = t.delete(e);
                  return (this.size = t.size), e;
                }),
                (pe.prototype.get = function (e) {
                  return this.__data__.get(e);
                }),
                (pe.prototype.has = function (e) {
                  return this.__data__.has(e);
                }),
                (pe.prototype.set = function (e, t) {
                  var r = this.__data__;
                  if (r instanceof ce) {
                    var o = r.__data__;
                    if (!Q || o.length < 199) return o.push([e, t]), (this.size = ++r.size), this;
                    r = this.__data__ = new ue(o);
                  }
                  return r.set(e, t), (this.size = r.size), this;
                });
              var we = q
                  ? function (t) {
                      return null == t
                        ? []
                        : ((t = Object(t)),
                          (function (e, t) {
                            for (
                              var r = -1, o = null == e ? 0 : e.length, n = 0, i = [];
                              ++r < o;

                            ) {
                              var s = e[r];
                              t(s, r, e) && (i[n++] = s);
                            }
                            return i;
                          })(q(t), function (e) {
                            return H.call(t, e);
                          }));
                    }
                  : function () {
                      return [];
                    },
                Ie = ye;
              function Te(e) {
                if (null != e) {
                  try {
                    return B.call(e);
                  } catch (e) {}
                  try {
                    return e + '';
                  } catch (e) {}
                }
                return '';
              }
              function Ce(e, t) {
                return e === t || (e != e && t != t);
              }
              ((F && Ie(new F(new ArrayBuffer(1))) != C) ||
                (Q && Ie(new Q()) != v) ||
                (N && Ie(N.resolve()) != s) ||
                (L && Ie(new L()) != S) ||
                (M && Ie(new M()) != u)) &&
                (Ie = function (e) {
                  var t = ye(e),
                    e = t == E ? e.constructor : void 0,
                    e = e ? Te(e) : '';
                  if (e)
                    switch (e) {
                      case te:
                        return C;
                      case re:
                        return v;
                      case oe:
                        return s;
                      case ne:
                        return S;
                      case ie:
                        return u;
                    }
                  return t;
                });
              var Oe = ge(
                  (function () {
                    return arguments;
                  })(),
                )
                  ? ge
                  : function (e) {
                      return Fe(e) && z.call(e, 'callee') && !H.call(e, 'callee');
                    },
                Pe = Array.isArray;
              var Ae =
                j ||
                function () {
                  return !1;
                };
              function Me(e) {
                if (Ne(e)) {
                  e = ye(e);
                  return e == r || e == n || e == t || e == a;
                }
              }
              function Le(e) {
                return 'number' == typeof e && -1 < e && e % 1 == 0 && e <= d;
              }
              function Ne(e) {
                var t = typeof e;
                return null != e && ('object' == t || 'function' == t);
              }
              function Fe(e) {
                return null != e && 'object' == typeof e;
              }
              var Re,
                je = A
                  ? ((Re = A),
                    function (e) {
                      return Re(e);
                    })
                  : function (e) {
                      return Fe(e) && Le(e.length) && !!P[ye(e)];
                    };
              function ke(e) {
                return (null != (t = e) && Le(t.length) && !Me(t) ? de : ve)(e);
                var t;
              }
              Ue.exports = function (e, t) {
                return me(e, t);
              };
            }).call(this);
          }).call(
            this,
            'undefined' != typeof global
              ? global
              : 'undefined' != typeof self
              ? self
              : 'undefined' != typeof window
              ? window
              : {},
          );
        },
        {},
      ],
      51: [
        function (e, t, r) {
          e = e('./_getNative')(e('./_root'), 'DataView');
          t.exports = e;
        },
        { './_getNative': 100, './_root': 135 },
      ],
      52: [
        function (e, t, r) {
          var o = e('./_hashClear'),
            n = e('./_hashDelete'),
            i = e('./_hashGet'),
            s = e('./_hashHas'),
            e = e('./_hashSet');
          function a(e) {
            var t = -1,
              r = null == e ? 0 : e.length;
            for (this.clear(); ++t < r; ) {
              var o = e[t];
              this.set(o[0], o[1]);
            }
          }
          (a.prototype.clear = o),
            (a.prototype.delete = n),
            (a.prototype.get = i),
            (a.prototype.has = s),
            (a.prototype.set = e),
            (t.exports = a);
        },
        {
          './_hashClear': 107,
          './_hashDelete': 108,
          './_hashGet': 109,
          './_hashHas': 110,
          './_hashSet': 111,
        },
      ],
      53: [
        function (e, t, r) {
          var o = e('./_listCacheClear'),
            n = e('./_listCacheDelete'),
            i = e('./_listCacheGet'),
            s = e('./_listCacheHas'),
            e = e('./_listCacheSet');
          function a(e) {
            var t = -1,
              r = null == e ? 0 : e.length;
            for (this.clear(); ++t < r; ) {
              var o = e[t];
              this.set(o[0], o[1]);
            }
          }
          (a.prototype.clear = o),
            (a.prototype.delete = n),
            (a.prototype.get = i),
            (a.prototype.has = s),
            (a.prototype.set = e),
            (t.exports = a);
        },
        {
          './_listCacheClear': 119,
          './_listCacheDelete': 120,
          './_listCacheGet': 121,
          './_listCacheHas': 122,
          './_listCacheSet': 123,
        },
      ],
      54: [
        function (e, t, r) {
          e = e('./_getNative')(e('./_root'), 'Map');
          t.exports = e;
        },
        { './_getNative': 100, './_root': 135 },
      ],
      55: [
        function (e, t, r) {
          var o = e('./_mapCacheClear'),
            n = e('./_mapCacheDelete'),
            i = e('./_mapCacheGet'),
            s = e('./_mapCacheHas'),
            e = e('./_mapCacheSet');
          function a(e) {
            var t = -1,
              r = null == e ? 0 : e.length;
            for (this.clear(); ++t < r; ) {
              var o = e[t];
              this.set(o[0], o[1]);
            }
          }
          (a.prototype.clear = o),
            (a.prototype.delete = n),
            (a.prototype.get = i),
            (a.prototype.has = s),
            (a.prototype.set = e),
            (t.exports = a);
        },
        {
          './_mapCacheClear': 124,
          './_mapCacheDelete': 125,
          './_mapCacheGet': 126,
          './_mapCacheHas': 127,
          './_mapCacheSet': 128,
        },
      ],
      56: [
        function (e, t, r) {
          e = e('./_getNative')(e('./_root'), 'Promise');
          t.exports = e;
        },
        { './_getNative': 100, './_root': 135 },
      ],
      57: [
        function (e, t, r) {
          e = e('./_getNative')(e('./_root'), 'Set');
          t.exports = e;
        },
        { './_getNative': 100, './_root': 135 },
      ],
      58: [
        function (e, t, r) {
          var o = e('./_ListCache'),
            n = e('./_stackClear'),
            i = e('./_stackDelete'),
            s = e('./_stackGet'),
            a = e('./_stackHas'),
            e = e('./_stackSet');
          function c(e) {
            e = this.__data__ = new o(e);
            this.size = e.size;
          }
          (c.prototype.clear = n),
            (c.prototype.delete = i),
            (c.prototype.get = s),
            (c.prototype.has = a),
            (c.prototype.set = e),
            (t.exports = c);
        },
        {
          './_ListCache': 53,
          './_stackClear': 136,
          './_stackDelete': 137,
          './_stackGet': 138,
          './_stackHas': 139,
          './_stackSet': 140,
        },
      ],
      59: [
        function (e, t, r) {
          e = e('./_root').Symbol;
          t.exports = e;
        },
        { './_root': 135 },
      ],
      60: [
        function (e, t, r) {
          e = e('./_root').Uint8Array;
          t.exports = e;
        },
        { './_root': 135 },
      ],
      61: [
        function (e, t, r) {
          e = e('./_getNative')(e('./_root'), 'WeakMap');
          t.exports = e;
        },
        { './_getNative': 100, './_root': 135 },
      ],
      62: [
        function (e, t, r) {
          t.exports = function (e, t) {
            for (var r = -1, o = null == e ? 0 : e.length; ++r < o && !1 !== t(e[r], r, e); );
            return e;
          };
        },
        {},
      ],
      63: [
        function (e, t, r) {
          t.exports = function (e, t) {
            for (var r = -1, o = null == e ? 0 : e.length, n = 0, i = []; ++r < o; ) {
              var s = e[r];
              t(s, r, e) && (i[n++] = s);
            }
            return i;
          };
        },
        {},
      ],
      64: [
        function (e, t, r) {
          var l = e('./_baseTimes'),
            p = e('./isArguments'),
            d = e('./isArray'),
            h = e('./isBuffer'),
            f = e('./_isIndex'),
            y = e('./isTypedArray'),
            g = Object.prototype.hasOwnProperty;
          t.exports = function (e, t) {
            var r,
              o = d(e),
              n = !o && p(e),
              i = !o && !n && h(e),
              s = !o && !n && !i && y(e),
              a = o || n || i || s,
              c = a ? l(e.length, String) : [],
              u = c.length;
            for (r in e)
              (!t && !g.call(e, r)) ||
                (a &&
                  ('length' == r ||
                    (i && ('offset' == r || 'parent' == r)) ||
                    (s && ('buffer' == r || 'byteLength' == r || 'byteOffset' == r)) ||
                    f(r, u))) ||
                c.push(r);
            return c;
          };
        },
        {
          './_baseTimes': 82,
          './_isIndex': 115,
          './isArguments': 144,
          './isArray': 145,
          './isBuffer': 147,
          './isTypedArray': 154,
        },
      ],
      65: [
        function (e, t, r) {
          t.exports = function (e, t) {
            for (var r = -1, o = t.length, n = e.length; ++r < o; ) e[n + r] = t[r];
            return e;
          };
        },
        {},
      ],
      66: [
        function (e, t, r) {
          var n = e('./_baseAssignValue'),
            i = e('./eq'),
            s = Object.prototype.hasOwnProperty;
          t.exports = function (e, t, r) {
            var o = e[t];
            (s.call(e, t) && i(o, r) && (void 0 !== r || t in e)) || n(e, t, r);
          };
        },
        { './_baseAssignValue': 70, './eq': 143 },
      ],
      67: [
        function (e, t, r) {
          var o = e('./eq');
          t.exports = function (e, t) {
            for (var r = e.length; r--; ) if (o(e[r][0], t)) return r;
            return -1;
          };
        },
        { './eq': 143 },
      ],
      68: [
        function (e, t, r) {
          var o = e('./_copyObject'),
            n = e('./keys');
          t.exports = function (e, t) {
            return e && o(t, n(t), e);
          };
        },
        { './_copyObject': 91, './keys': 155 },
      ],
      69: [
        function (e, t, r) {
          var o = e('./_copyObject'),
            n = e('./keysIn');
          t.exports = function (e, t) {
            return e && o(t, n(t), e);
          };
        },
        { './_copyObject': 91, './keysIn': 156 },
      ],
      70: [
        function (e, t, r) {
          var o = e('./_defineProperty');
          t.exports = function (e, t, r) {
            '__proto__' == t && o
              ? o(e, t, { configurable: !0, enumerable: !0, value: r, writable: !0 })
              : (e[t] = r);
          };
        },
        { './_defineProperty': 95 },
      ],
      71: [
        function (e, t, r) {
          var f = e('./_Stack'),
            y = e('./_arrayEach'),
            g = e('./_assignValue'),
            m = e('./_baseAssign'),
            _ = e('./_baseAssignIn'),
            v = e('./_cloneBuffer'),
            b = e('./_copyArray'),
            E = e('./_copySymbols'),
            x = e('./_copySymbolsIn'),
            S = e('./_getAllKeys'),
            w = e('./_getAllKeysIn'),
            I = e('./_getTag'),
            T = e('./_initCloneArray'),
            C = e('./_initCloneByTag'),
            O = e('./_initCloneObject'),
            P = e('./isArray'),
            A = e('./isBuffer'),
            M = e('./isMap'),
            L = e('./isObject'),
            N = e('./isSet'),
            F = e('./keys'),
            R = e('./keysIn'),
            j = 1,
            k = 2,
            D = 4,
            U = '[object Arguments]',
            G = '[object Function]',
            V = '[object GeneratorFunction]',
            B = '[object Object]',
            z = {};
          (z[U] =
            z['[object Array]'] =
            z['[object ArrayBuffer]'] =
            z['[object DataView]'] =
            z['[object Boolean]'] =
            z['[object Date]'] =
            z['[object Float32Array]'] =
            z['[object Float64Array]'] =
            z['[object Int8Array]'] =
            z['[object Int16Array]'] =
            z['[object Int32Array]'] =
            z['[object Map]'] =
            z['[object Number]'] =
            z[B] =
            z['[object RegExp]'] =
            z['[object Set]'] =
            z['[object String]'] =
            z['[object Symbol]'] =
            z['[object Uint8Array]'] =
            z['[object Uint8ClampedArray]'] =
            z['[object Uint16Array]'] =
            z['[object Uint32Array]'] =
              !0),
            (z['[object Error]'] = z[G] = z['[object WeakMap]'] = !1),
            (t.exports = function r(o, n, i, e, t, s) {
              var a,
                c = n & j,
                u = n & k,
                l = n & D;
              if ((i && (a = t ? i(o, e, t, s) : i(o)), void 0 !== a)) return a;
              if (!L(o)) return o;
              var p = P(o);
              if (p) {
                if (((a = T(o)), !c)) return b(o, a);
              } else {
                var d = I(o),
                  e = d == G || d == V;
                if (A(o)) return v(o, c);
                if (d == B || d == U || (e && !t)) {
                  if (((a = u || e ? {} : O(o)), !c)) return u ? x(o, _(a, o)) : E(o, m(a, o));
                } else {
                  if (!z[d]) return t ? o : {};
                  a = C(o, d, c);
                }
              }
              c = (s = s || new f()).get(o);
              if (c) return c;
              s.set(o, a),
                N(o)
                  ? o.forEach(function (e) {
                      a.add(r(e, n, i, e, o, s));
                    })
                  : M(o) &&
                    o.forEach(function (e, t) {
                      a.set(t, r(e, n, i, t, o, s));
                    });
              var h = p ? void 0 : (l ? (u ? w : S) : u ? R : F)(o);
              return (
                y(h || o, function (e, t) {
                  h && (e = o[(t = e)]), g(a, t, r(e, n, i, t, o, s));
                }),
                a
              );
            });
        },
        {
          './_Stack': 58,
          './_arrayEach': 62,
          './_assignValue': 66,
          './_baseAssign': 68,
          './_baseAssignIn': 69,
          './_cloneBuffer': 85,
          './_copyArray': 90,
          './_copySymbols': 92,
          './_copySymbolsIn': 93,
          './_getAllKeys': 97,
          './_getAllKeysIn': 98,
          './_getTag': 105,
          './_initCloneArray': 112,
          './_initCloneByTag': 113,
          './_initCloneObject': 114,
          './isArray': 145,
          './isBuffer': 147,
          './isMap': 150,
          './isObject': 151,
          './isSet': 153,
          './keys': 155,
          './keysIn': 156,
        },
      ],
      72: [
        function (e, t, r) {
          var o = e('./isObject'),
            n = Object.create,
            e = function (e) {
              if (!o(e)) return {};
              if (n) return n(e);
              i.prototype = e;
              e = new i();
              return (i.prototype = void 0), e;
            };
          function i() {}
          t.exports = e;
        },
        { './isObject': 151 },
      ],
      73: [
        function (e, t, r) {
          var o = e('./_arrayPush'),
            n = e('./isArray');
          t.exports = function (e, t, r) {
            return (t = t(e)), n(e) ? t : o(t, r(e));
          };
        },
        { './_arrayPush': 65, './isArray': 145 },
      ],
      74: [
        function (e, t, r) {
          var o = e('./_Symbol'),
            n = e('./_getRawTag'),
            i = e('./_objectToString'),
            s = o ? o.toStringTag : void 0;
          t.exports = function (e) {
            return null == e
              ? void 0 === e
                ? '[object Undefined]'
                : '[object Null]'
              : (s && s in Object(e) ? n : i)(e);
          };
        },
        { './_Symbol': 59, './_getRawTag': 102, './_objectToString': 133 },
      ],
      75: [
        function (e, t, r) {
          var o = e('./_baseGetTag'),
            n = e('./isObjectLike');
          t.exports = function (e) {
            return n(e) && '[object Arguments]' == o(e);
          };
        },
        { './_baseGetTag': 74, './isObjectLike': 152 },
      ],
      76: [
        function (e, t, r) {
          var o = e('./_getTag'),
            n = e('./isObjectLike');
          t.exports = function (e) {
            return n(e) && '[object Map]' == o(e);
          };
        },
        { './_getTag': 105, './isObjectLike': 152 },
      ],
      77: [
        function (e, t, r) {
          var o = e('./isFunction'),
            n = e('./_isMasked'),
            i = e('./isObject'),
            s = e('./_toSource'),
            a = /^\[object .+?Constructor\]$/,
            c = Function.prototype,
            e = Object.prototype,
            c = c.toString,
            e = e.hasOwnProperty,
            u = RegExp(
              '^' +
                c
                  .call(e)
                  .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
                  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') +
                '$',
            );
          t.exports = function (e) {
            return !(!i(e) || n(e)) && (o(e) ? u : a).test(s(e));
          };
        },
        { './_isMasked': 117, './_toSource': 141, './isFunction': 148, './isObject': 151 },
      ],
      78: [
        function (e, t, r) {
          var o = e('./_getTag'),
            n = e('./isObjectLike');
          t.exports = function (e) {
            return n(e) && '[object Set]' == o(e);
          };
        },
        { './_getTag': 105, './isObjectLike': 152 },
      ],
      79: [
        function (e, t, r) {
          var o = e('./_baseGetTag'),
            n = e('./isLength'),
            i = e('./isObjectLike'),
            s = {};
          (s['[object Float32Array]'] =
            s['[object Float64Array]'] =
            s['[object Int8Array]'] =
            s['[object Int16Array]'] =
            s['[object Int32Array]'] =
            s['[object Uint8Array]'] =
            s['[object Uint8ClampedArray]'] =
            s['[object Uint16Array]'] =
            s['[object Uint32Array]'] =
              !0),
            (s['[object Arguments]'] =
              s['[object Array]'] =
              s['[object ArrayBuffer]'] =
              s['[object Boolean]'] =
              s['[object DataView]'] =
              s['[object Date]'] =
              s['[object Error]'] =
              s['[object Function]'] =
              s['[object Map]'] =
              s['[object Number]'] =
              s['[object Object]'] =
              s['[object RegExp]'] =
              s['[object Set]'] =
              s['[object String]'] =
              s['[object WeakMap]'] =
                !1),
            (t.exports = function (e) {
              return i(e) && n(e.length) && !!s[o(e)];
            });
        },
        { './_baseGetTag': 74, './isLength': 149, './isObjectLike': 152 },
      ],
      80: [
        function (e, t, r) {
          var o = e('./_isPrototype'),
            n = e('./_nativeKeys'),
            i = Object.prototype.hasOwnProperty;
          t.exports = function (e) {
            if (!o(e)) return n(e);
            var t,
              r = [];
            for (t in Object(e)) i.call(e, t) && 'constructor' != t && r.push(t);
            return r;
          };
        },
        { './_isPrototype': 118, './_nativeKeys': 130 },
      ],
      81: [
        function (e, t, r) {
          var n = e('./isObject'),
            i = e('./_isPrototype'),
            s = e('./_nativeKeysIn'),
            a = Object.prototype.hasOwnProperty;
          t.exports = function (e) {
            if (!n(e)) return s(e);
            var t,
              r = i(e),
              o = [];
            for (t in e) ('constructor' != t || (!r && a.call(e, t))) && o.push(t);
            return o;
          };
        },
        { './_isPrototype': 118, './_nativeKeysIn': 131, './isObject': 151 },
      ],
      82: [
        function (e, t, r) {
          t.exports = function (e, t) {
            for (var r = -1, o = Array(e); ++r < e; ) o[r] = t(r);
            return o;
          };
        },
        {},
      ],
      83: [
        function (e, t, r) {
          t.exports = function (t) {
            return function (e) {
              return t(e);
            };
          };
        },
        {},
      ],
      84: [
        function (e, t, r) {
          var o = e('./_Uint8Array');
          t.exports = function (e) {
            var t = new e.constructor(e.byteLength);
            return new o(t).set(new o(e)), t;
          };
        },
        { './_Uint8Array': 60 },
      ],
      85: [
        function (e, t, r) {
          var o = e('./_root'),
            e = 'object' == typeof r && r && !r.nodeType && r,
            r = e && 'object' == typeof t && t && !t.nodeType && t,
            o = r && r.exports === e ? o.Buffer : void 0,
            n = o ? o.allocUnsafe : void 0;
          t.exports = function (e, t) {
            return t
              ? e.slice()
              : ((t = e.length), (t = n ? n(t) : new e.constructor(t)), e.copy(t), t);
          };
        },
        { './_root': 135 },
      ],
      86: [
        function (e, t, r) {
          var o = e('./_cloneArrayBuffer');
          t.exports = function (e, t) {
            return (
              (t = t ? o(e.buffer) : e.buffer), new e.constructor(t, e.byteOffset, e.byteLength)
            );
          };
        },
        { './_cloneArrayBuffer': 84 },
      ],
      87: [
        function (e, t, r) {
          var o = /\w*$/;
          t.exports = function (e) {
            var t = new e.constructor(e.source, o.exec(e));
            return (t.lastIndex = e.lastIndex), t;
          };
        },
        {},
      ],
      88: [
        function (e, t, r) {
          var e = e('./_Symbol'),
            e = e ? e.prototype : void 0,
            o = e ? e.valueOf : void 0;
          t.exports = function (e) {
            return o ? Object(o.call(e)) : {};
          };
        },
        { './_Symbol': 59 },
      ],
      89: [
        function (e, t, r) {
          var o = e('./_cloneArrayBuffer');
          t.exports = function (e, t) {
            return (t = t ? o(e.buffer) : e.buffer), new e.constructor(t, e.byteOffset, e.length);
          };
        },
        { './_cloneArrayBuffer': 84 },
      ],
      90: [
        function (e, t, r) {
          t.exports = function (e, t) {
            var r = -1,
              o = e.length;
            for (t = t || Array(o); ++r < o; ) t[r] = e[r];
            return t;
          };
        },
        {},
      ],
      91: [
        function (e, t, r) {
          var u = e('./_assignValue'),
            l = e('./_baseAssignValue');
          t.exports = function (e, t, r, o) {
            var n = !r;
            r = r || {};
            for (var i = -1, s = t.length; ++i < s; ) {
              var a = t[i],
                c = o ? o(r[a], e[a], a, r, e) : void 0;
              void 0 === c && (c = e[a]), (n ? l : u)(r, a, c);
            }
            return r;
          };
        },
        { './_assignValue': 66, './_baseAssignValue': 70 },
      ],
      92: [
        function (e, t, r) {
          var o = e('./_copyObject'),
            n = e('./_getSymbols');
          t.exports = function (e, t) {
            return o(e, n(e), t);
          };
        },
        { './_copyObject': 91, './_getSymbols': 103 },
      ],
      93: [
        function (e, t, r) {
          var o = e('./_copyObject'),
            n = e('./_getSymbolsIn');
          t.exports = function (e, t) {
            return o(e, n(e), t);
          };
        },
        { './_copyObject': 91, './_getSymbolsIn': 104 },
      ],
      94: [
        function (e, t, r) {
          e = e('./_root')['__core-js_shared__'];
          t.exports = e;
        },
        { './_root': 135 },
      ],
      95: [
        function (e, t, r) {
          var o = e('./_getNative'),
            e = (function () {
              try {
                var e = o(Object, 'defineProperty');
                return e({}, '', {}), e;
              } catch (e) {}
            })();
          t.exports = e;
        },
        { './_getNative': 100 },
      ],
      96: [
        function (e, r, t) {
          (function (t) {
            (function () {
              var e = 'object' == typeof t && t && t.Object === Object && t;
              r.exports = e;
            }).call(this);
          }).call(
            this,
            'undefined' != typeof global
              ? global
              : 'undefined' != typeof self
              ? self
              : 'undefined' != typeof window
              ? window
              : {},
          );
        },
        {},
      ],
      97: [
        function (e, t, r) {
          var o = e('./_baseGetAllKeys'),
            n = e('./_getSymbols'),
            i = e('./keys');
          t.exports = function (e) {
            return o(e, i, n);
          };
        },
        { './_baseGetAllKeys': 73, './_getSymbols': 103, './keys': 155 },
      ],
      98: [
        function (e, t, r) {
          var o = e('./_baseGetAllKeys'),
            n = e('./_getSymbolsIn'),
            i = e('./keysIn');
          t.exports = function (e) {
            return o(e, i, n);
          };
        },
        { './_baseGetAllKeys': 73, './_getSymbolsIn': 104, './keysIn': 156 },
      ],
      99: [
        function (e, t, r) {
          var o = e('./_isKeyable');
          t.exports = function (e, t) {
            return (e = e.__data__), o(t) ? e['string' == typeof t ? 'string' : 'hash'] : e.map;
          };
        },
        { './_isKeyable': 116 },
      ],
      100: [
        function (e, t, r) {
          var o = e('./_baseIsNative'),
            n = e('./_getValue');
          t.exports = function (e, t) {
            return (t = n(e, t)), o(t) ? t : void 0;
          };
        },
        { './_baseIsNative': 77, './_getValue': 106 },
      ],
      101: [
        function (e, t, r) {
          e = e('./_overArg')(Object.getPrototypeOf, Object);
          t.exports = e;
        },
        { './_overArg': 134 },
      ],
      102: [
        function (e, t, r) {
          var o = e('./_Symbol'),
            e = Object.prototype,
            i = e.hasOwnProperty,
            s = e.toString,
            a = o ? o.toStringTag : void 0;
          t.exports = function (e) {
            var t = i.call(e, a),
              r = e[a];
            try {
              var o = !(e[a] = void 0);
            } catch (e) {}
            var n = s.call(e);
            return o && (t ? (e[a] = r) : delete e[a]), n;
          };
        },
        { './_Symbol': 59 },
      ],
      103: [
        function (e, t, r) {
          var o = e('./_arrayFilter'),
            e = e('./stubArray'),
            n = Object.prototype.propertyIsEnumerable,
            i = Object.getOwnPropertySymbols,
            e = i
              ? function (t) {
                  return null == t
                    ? []
                    : ((t = Object(t)),
                      o(i(t), function (e) {
                        return n.call(t, e);
                      }));
                }
              : e;
          t.exports = e;
        },
        { './_arrayFilter': 63, './stubArray': 157 },
      ],
      104: [
        function (e, t, r) {
          var o = e('./_arrayPush'),
            n = e('./_getPrototype'),
            i = e('./_getSymbols'),
            e = e('./stubArray'),
            e = Object.getOwnPropertySymbols
              ? function (e) {
                  for (var t = []; e; ) o(t, i(e)), (e = n(e));
                  return t;
                }
              : e;
          t.exports = e;
        },
        { './_arrayPush': 65, './_getPrototype': 101, './_getSymbols': 103, './stubArray': 157 },
      ],
      105: [
        function (e, t, r) {
          var o = e('./_DataView'),
            n = e('./_Map'),
            i = e('./_Promise'),
            s = e('./_Set'),
            a = e('./_WeakMap'),
            c = e('./_baseGetTag'),
            u = e('./_toSource'),
            l = '[object Map]',
            p = '[object Promise]',
            d = '[object Set]',
            h = '[object WeakMap]',
            f = '[object DataView]',
            y = u(o),
            g = u(n),
            m = u(i),
            _ = u(s),
            v = u(a),
            e = c;
          ((o && e(new o(new ArrayBuffer(1))) != f) ||
            (n && e(new n()) != l) ||
            (i && e(i.resolve()) != p) ||
            (s && e(new s()) != d) ||
            (a && e(new a()) != h)) &&
            (e = function (e) {
              var t = c(e),
                e = '[object Object]' == t ? e.constructor : void 0,
                e = e ? u(e) : '';
              if (e)
                switch (e) {
                  case y:
                    return f;
                  case g:
                    return l;
                  case m:
                    return p;
                  case _:
                    return d;
                  case v:
                    return h;
                }
              return t;
            }),
            (t.exports = e);
        },
        {
          './_DataView': 51,
          './_Map': 54,
          './_Promise': 56,
          './_Set': 57,
          './_WeakMap': 61,
          './_baseGetTag': 74,
          './_toSource': 141,
        },
      ],
      106: [
        function (e, t, r) {
          t.exports = function (e, t) {
            return null == e ? void 0 : e[t];
          };
        },
        {},
      ],
      107: [
        function (e, t, r) {
          var o = e('./_nativeCreate');
          t.exports = function () {
            (this.__data__ = o ? o(null) : {}), (this.size = 0);
          };
        },
        { './_nativeCreate': 129 },
      ],
      108: [
        function (e, t, r) {
          t.exports = function (e) {
            return (e = this.has(e) && delete this.__data__[e]), (this.size -= e ? 1 : 0), e;
          };
        },
        {},
      ],
      109: [
        function (e, t, r) {
          var o = e('./_nativeCreate'),
            n = Object.prototype.hasOwnProperty;
          t.exports = function (e) {
            var t = this.__data__;
            if (o) {
              var r = t[e];
              return '__lodash_hash_undefined__' === r ? void 0 : r;
            }
            return n.call(t, e) ? t[e] : void 0;
          };
        },
        { './_nativeCreate': 129 },
      ],
      110: [
        function (e, t, r) {
          var o = e('./_nativeCreate'),
            n = Object.prototype.hasOwnProperty;
          t.exports = function (e) {
            var t = this.__data__;
            return o ? void 0 !== t[e] : n.call(t, e);
          };
        },
        { './_nativeCreate': 129 },
      ],
      111: [
        function (e, t, r) {
          var o = e('./_nativeCreate');
          t.exports = function (e, t) {
            var r = this.__data__;
            return (
              (this.size += this.has(e) ? 0 : 1),
              (r[e] = o && void 0 === t ? '__lodash_hash_undefined__' : t),
              this
            );
          };
        },
        { './_nativeCreate': 129 },
      ],
      112: [
        function (e, t, r) {
          var o = Object.prototype.hasOwnProperty;
          t.exports = function (e) {
            var t = e.length,
              r = new e.constructor(t);
            return (
              t &&
                'string' == typeof e[0] &&
                o.call(e, 'index') &&
                ((r.index = e.index), (r.input = e.input)),
              r
            );
          };
        },
        {},
      ],
      113: [
        function (e, t, r) {
          var n = e('./_cloneArrayBuffer'),
            i = e('./_cloneDataView'),
            s = e('./_cloneRegExp'),
            a = e('./_cloneSymbol'),
            c = e('./_cloneTypedArray');
          t.exports = function (e, t, r) {
            var o = e.constructor;
            switch (t) {
              case '[object ArrayBuffer]':
                return n(e);
              case '[object Boolean]':
              case '[object Date]':
                return new o(+e);
              case '[object DataView]':
                return i(e, r);
              case '[object Float32Array]':
              case '[object Float64Array]':
              case '[object Int8Array]':
              case '[object Int16Array]':
              case '[object Int32Array]':
              case '[object Uint8Array]':
              case '[object Uint8ClampedArray]':
              case '[object Uint16Array]':
              case '[object Uint32Array]':
                return c(e, r);
              case '[object Map]':
                return new o();
              case '[object Number]':
              case '[object String]':
                return new o(e);
              case '[object RegExp]':
                return s(e);
              case '[object Set]':
                return new o();
              case '[object Symbol]':
                return a(e);
            }
          };
        },
        {
          './_cloneArrayBuffer': 84,
          './_cloneDataView': 86,
          './_cloneRegExp': 87,
          './_cloneSymbol': 88,
          './_cloneTypedArray': 89,
        },
      ],
      114: [
        function (e, t, r) {
          var o = e('./_baseCreate'),
            n = e('./_getPrototype'),
            i = e('./_isPrototype');
          t.exports = function (e) {
            return 'function' != typeof e.constructor || i(e) ? {} : o(n(e));
          };
        },
        { './_baseCreate': 72, './_getPrototype': 101, './_isPrototype': 118 },
      ],
      115: [
        function (e, t, r) {
          var o = /^(?:0|[1-9]\d*)$/;
          t.exports = function (e, t) {
            var r = typeof e;
            return (
              !!(t = null == t ? 9007199254740991 : t) &&
              ('number' == r || ('symbol' != r && o.test(e))) &&
              -1 < e &&
              e % 1 == 0 &&
              e < t
            );
          };
        },
        {},
      ],
      116: [
        function (e, t, r) {
          t.exports = function (e) {
            var t = typeof e;
            return 'string' == t || 'number' == t || 'symbol' == t || 'boolean' == t
              ? '__proto__' !== e
              : null === e;
          };
        },
        {},
      ],
      117: [
        function (e, t, r) {
          var e = e('./_coreJsData'),
            o = (e = /[^.]+$/.exec((e && e.keys && e.keys.IE_PROTO) || ''))
              ? 'Symbol(src)_1.' + e
              : '';
          t.exports = function (e) {
            return !!o && o in e;
          };
        },
        { './_coreJsData': 94 },
      ],
      118: [
        function (e, t, r) {
          var o = Object.prototype;
          t.exports = function (e) {
            var t = e && e.constructor;
            return e === (('function' == typeof t && t.prototype) || o);
          };
        },
        {},
      ],
      119: [
        function (e, t, r) {
          t.exports = function () {
            (this.__data__ = []), (this.size = 0);
          };
        },
        {},
      ],
      120: [
        function (e, t, r) {
          var o = e('./_assocIndexOf'),
            n = Array.prototype.splice;
          t.exports = function (e) {
            var t = this.__data__;
            return (
              !((e = o(t, e)) < 0) &&
              (e == t.length - 1 ? t.pop() : n.call(t, e, 1), --this.size, !0)
            );
          };
        },
        { './_assocIndexOf': 67 },
      ],
      121: [
        function (e, t, r) {
          var o = e('./_assocIndexOf');
          t.exports = function (e) {
            var t = this.__data__;
            return (e = o(t, e)) < 0 ? void 0 : t[e][1];
          };
        },
        { './_assocIndexOf': 67 },
      ],
      122: [
        function (e, t, r) {
          var o = e('./_assocIndexOf');
          t.exports = function (e) {
            return -1 < o(this.__data__, e);
          };
        },
        { './_assocIndexOf': 67 },
      ],
      123: [
        function (e, t, r) {
          var n = e('./_assocIndexOf');
          t.exports = function (e, t) {
            var r = this.__data__,
              o = n(r, e);
            return o < 0 ? (++this.size, r.push([e, t])) : (r[o][1] = t), this;
          };
        },
        { './_assocIndexOf': 67 },
      ],
      124: [
        function (e, t, r) {
          var o = e('./_Hash'),
            n = e('./_ListCache'),
            i = e('./_Map');
          t.exports = function () {
            (this.size = 0),
              (this.__data__ = { hash: new o(), map: new (i || n)(), string: new o() });
          };
        },
        { './_Hash': 52, './_ListCache': 53, './_Map': 54 },
      ],
      125: [
        function (e, t, r) {
          var o = e('./_getMapData');
          t.exports = function (e) {
            return (e = o(this, e).delete(e)), (this.size -= e ? 1 : 0), e;
          };
        },
        { './_getMapData': 99 },
      ],
      126: [
        function (e, t, r) {
          var o = e('./_getMapData');
          t.exports = function (e) {
            return o(this, e).get(e);
          };
        },
        { './_getMapData': 99 },
      ],
      127: [
        function (e, t, r) {
          var o = e('./_getMapData');
          t.exports = function (e) {
            return o(this, e).has(e);
          };
        },
        { './_getMapData': 99 },
      ],
      128: [
        function (e, t, r) {
          var n = e('./_getMapData');
          t.exports = function (e, t) {
            var r = n(this, e),
              o = r.size;
            return r.set(e, t), (this.size += r.size == o ? 0 : 1), this;
          };
        },
        { './_getMapData': 99 },
      ],
      129: [
        function (e, t, r) {
          e = e('./_getNative')(Object, 'create');
          t.exports = e;
        },
        { './_getNative': 100 },
      ],
      130: [
        function (e, t, r) {
          e = e('./_overArg')(Object.keys, Object);
          t.exports = e;
        },
        { './_overArg': 134 },
      ],
      131: [
        function (e, t, r) {
          t.exports = function (e) {
            var t = [];
            if (null != e) for (var r in Object(e)) t.push(r);
            return t;
          };
        },
        {},
      ],
      132: [
        function (e, t, r) {
          var e = e('./_freeGlobal'),
            r = 'object' == typeof r && r && !r.nodeType && r,
            o = r && 'object' == typeof t && t && !t.nodeType && t,
            n = o && o.exports === r && e.process,
            e = (function () {
              try {
                var e = o && o.require && o.require('util').types;
                return e ? e : n && n.binding && n.binding('util');
              } catch (e) {}
            })();
          t.exports = e;
        },
        { './_freeGlobal': 96 },
      ],
      133: [
        function (e, t, r) {
          var o = Object.prototype.toString;
          t.exports = function (e) {
            return o.call(e);
          };
        },
        {},
      ],
      134: [
        function (e, t, r) {
          t.exports = function (t, r) {
            return function (e) {
              return t(r(e));
            };
          };
        },
        {},
      ],
      135: [
        function (e, t, r) {
          var o = e('./_freeGlobal'),
            e = 'object' == typeof self && self && self.Object === Object && self,
            e = o || e || Function('return this')();
          t.exports = e;
        },
        { './_freeGlobal': 96 },
      ],
      136: [
        function (e, t, r) {
          var o = e('./_ListCache');
          t.exports = function () {
            (this.__data__ = new o()), (this.size = 0);
          };
        },
        { './_ListCache': 53 },
      ],
      137: [
        function (e, t, r) {
          t.exports = function (e) {
            var t = this.__data__,
              e = t.delete(e);
            return (this.size = t.size), e;
          };
        },
        {},
      ],
      138: [
        function (e, t, r) {
          t.exports = function (e) {
            return this.__data__.get(e);
          };
        },
        {},
      ],
      139: [
        function (e, t, r) {
          t.exports = function (e) {
            return this.__data__.has(e);
          };
        },
        {},
      ],
      140: [
        function (e, t, r) {
          var n = e('./_ListCache'),
            i = e('./_Map'),
            s = e('./_MapCache');
          t.exports = function (e, t) {
            var r = this.__data__;
            if (r instanceof n) {
              var o = r.__data__;
              if (!i || o.length < 199) return o.push([e, t]), (this.size = ++r.size), this;
              r = this.__data__ = new s(o);
            }
            return r.set(e, t), (this.size = r.size), this;
          };
        },
        { './_ListCache': 53, './_Map': 54, './_MapCache': 55 },
      ],
      141: [
        function (e, t, r) {
          var o = Function.prototype.toString;
          t.exports = function (e) {
            if (null != e) {
              try {
                return o.call(e);
              } catch (e) {}
              try {
                return e + '';
              } catch (e) {}
            }
            return '';
          };
        },
        {},
      ],
      142: [
        function (e, t, r) {
          var o = e('./_baseClone');
          t.exports = function (e) {
            return o(e, 5);
          };
        },
        { './_baseClone': 71 },
      ],
      143: [
        function (e, t, r) {
          t.exports = function (e, t) {
            return e === t || (e != e && t != t);
          };
        },
        {},
      ],
      144: [
        function (e, t, r) {
          var o = e('./_baseIsArguments'),
            n = e('./isObjectLike'),
            e = Object.prototype,
            i = e.hasOwnProperty,
            s = e.propertyIsEnumerable,
            o = o(
              (function () {
                return arguments;
              })(),
            )
              ? o
              : function (e) {
                  return n(e) && i.call(e, 'callee') && !s.call(e, 'callee');
                };
          t.exports = o;
        },
        { './_baseIsArguments': 75, './isObjectLike': 152 },
      ],
      145: [
        function (e, t, r) {
          var o = Array.isArray;
          t.exports = o;
        },
        {},
      ],
      146: [
        function (e, t, r) {
          var o = e('./isFunction'),
            n = e('./isLength');
          t.exports = function (e) {
            return null != e && n(e.length) && !o(e);
          };
        },
        { './isFunction': 148, './isLength': 149 },
      ],
      147: [
        function (e, t, r) {
          var o = e('./_root'),
            n = e('./stubFalse'),
            e = 'object' == typeof r && r && !r.nodeType && r,
            r = e && 'object' == typeof t && t && !t.nodeType && t,
            o = r && r.exports === e ? o.Buffer : void 0,
            n = (o ? o.isBuffer : void 0) || n;
          t.exports = n;
        },
        { './_root': 135, './stubFalse': 158 },
      ],
      148: [
        function (e, t, r) {
          var o = e('./_baseGetTag'),
            n = e('./isObject');
          t.exports = function (e) {
            return (
              !!n(e) &&
              ('[object Function]' == (e = o(e)) ||
                '[object GeneratorFunction]' == e ||
                '[object AsyncFunction]' == e ||
                '[object Proxy]' == e)
            );
          };
        },
        { './_baseGetTag': 74, './isObject': 151 },
      ],
      149: [
        function (e, t, r) {
          t.exports = function (e) {
            return 'number' == typeof e && -1 < e && e % 1 == 0 && e <= 9007199254740991;
          };
        },
        {},
      ],
      150: [
        function (e, t, r) {
          var o = e('./_baseIsMap'),
            n = e('./_baseUnary'),
            e = e('./_nodeUtil'),
            e = e && e.isMap,
            o = e ? n(e) : o;
          t.exports = o;
        },
        { './_baseIsMap': 76, './_baseUnary': 83, './_nodeUtil': 132 },
      ],
      151: [
        function (e, t, r) {
          t.exports = function (e) {
            var t = typeof e;
            return null != e && ('object' == t || 'function' == t);
          };
        },
        {},
      ],
      152: [
        function (e, t, r) {
          t.exports = function (e) {
            return null != e && 'object' == typeof e;
          };
        },
        {},
      ],
      153: [
        function (e, t, r) {
          var o = e('./_baseIsSet'),
            n = e('./_baseUnary'),
            e = e('./_nodeUtil'),
            e = e && e.isSet,
            o = e ? n(e) : o;
          t.exports = o;
        },
        { './_baseIsSet': 78, './_baseUnary': 83, './_nodeUtil': 132 },
      ],
      154: [
        function (e, t, r) {
          var o = e('./_baseIsTypedArray'),
            n = e('./_baseUnary'),
            e = e('./_nodeUtil'),
            e = e && e.isTypedArray,
            o = e ? n(e) : o;
          t.exports = o;
        },
        { './_baseIsTypedArray': 79, './_baseUnary': 83, './_nodeUtil': 132 },
      ],
      155: [
        function (e, t, r) {
          var o = e('./_arrayLikeKeys'),
            n = e('./_baseKeys'),
            i = e('./isArrayLike');
          t.exports = function (e) {
            return (i(e) ? o : n)(e);
          };
        },
        { './_arrayLikeKeys': 64, './_baseKeys': 80, './isArrayLike': 146 },
      ],
      156: [
        function (e, t, r) {
          var o = e('./_arrayLikeKeys'),
            n = e('./_baseKeysIn'),
            i = e('./isArrayLike');
          t.exports = function (e) {
            return i(e) ? o(e, !0) : n(e);
          };
        },
        { './_arrayLikeKeys': 64, './_baseKeysIn': 81, './isArrayLike': 146 },
      ],
      157: [
        function (e, t, r) {
          t.exports = function () {
            return [];
          };
        },
        {},
      ],
      158: [
        function (e, t, r) {
          t.exports = function () {
            return !1;
          };
        },
        {},
      ],
      159: [
        function (e, t, u) {
          (function (s) {
            (function () {
              function n(e, t) {
                for (var r = 0, o = e.length - 1; 0 <= o; o--) {
                  var n = e[o];
                  '.' === n
                    ? e.splice(o, 1)
                    : '..' === n
                    ? (e.splice(o, 1), r++)
                    : r && (e.splice(o, 1), r--);
                }
                if (t) for (; r--; ) e.unshift('..');
                return e;
              }
              function i(e, t) {
                if (e.filter) return e.filter(t);
                for (var r = [], o = 0; o < e.length; o++) t(e[o], o, e) && r.push(e[o]);
                return r;
              }
              (u.resolve = function () {
                for (var e = '', t = !1, r = arguments.length - 1; -1 <= r && !t; r--) {
                  var o = 0 <= r ? arguments[r] : s.cwd();
                  if ('string' != typeof o)
                    throw new TypeError('Arguments to path.resolve must be strings');
                  o && ((e = o + '/' + e), (t = '/' === o.charAt(0)));
                }
                return (
                  (t ? '/' : '') +
                    (e = n(
                      i(e.split('/'), function (e) {
                        return !!e;
                      }),
                      !t,
                    ).join('/')) || '.'
                );
              }),
                (u.normalize = function (e) {
                  var t = u.isAbsolute(e),
                    r = '/' === o(e, -1);
                  return (
                    (e = n(
                      i(e.split('/'), function (e) {
                        return !!e;
                      }),
                      !t,
                    ).join('/')) ||
                      t ||
                      (e = '.'),
                    e && r && (e += '/'),
                    (t ? '/' : '') + e
                  );
                }),
                (u.isAbsolute = function (e) {
                  return '/' === e.charAt(0);
                }),
                (u.join = function () {
                  var e = Array.prototype.slice.call(arguments, 0);
                  return u.normalize(
                    i(e, function (e, t) {
                      if ('string' != typeof e)
                        throw new TypeError('Arguments to path.join must be strings');
                      return e;
                    }).join('/'),
                  );
                }),
                (u.relative = function (e, t) {
                  function r(e) {
                    for (var t = 0; t < e.length && '' === e[t]; t++);
                    for (var r = e.length - 1; 0 <= r && '' === e[r]; r--);
                    return r < t ? [] : e.slice(t, r - t + 1);
                  }
                  (e = u.resolve(e).substr(1)), (t = u.resolve(t).substr(1));
                  for (
                    var o = r(e.split('/')),
                      n = r(t.split('/')),
                      i = Math.min(o.length, n.length),
                      s = i,
                      a = 0;
                    a < i;
                    a++
                  )
                    if (o[a] !== n[a]) {
                      s = a;
                      break;
                    }
                  for (var c = [], a = s; a < o.length; a++) c.push('..');
                  return (c = c.concat(n.slice(s))).join('/');
                }),
                (u.sep = '/'),
                (u.delimiter = ':'),
                (u.dirname = function (e) {
                  if (('string' != typeof e && (e += ''), 0 === e.length)) return '.';
                  for (
                    var t = e.charCodeAt(0), r = 47 === t, o = -1, n = !0, i = e.length - 1;
                    1 <= i;
                    --i
                  )
                    if (47 === e.charCodeAt(i)) {
                      if (!n) {
                        o = i;
                        break;
                      }
                    } else n = !1;
                  return -1 === o ? (r ? '/' : '.') : r && 1 === o ? '/' : e.slice(0, o);
                }),
                (u.basename = function (e, t) {
                  e = (function (e) {
                    'string' != typeof e && (e += '');
                    for (var t = 0, r = -1, o = !0, n = e.length - 1; 0 <= n; --n)
                      if (47 === e.charCodeAt(n)) {
                        if (!o) {
                          t = n + 1;
                          break;
                        }
                      } else -1 === r && ((o = !1), (r = n + 1));
                    return -1 === r ? '' : e.slice(t, r);
                  })(e);
                  return (
                    t && e.substr(-1 * t.length) === t && (e = e.substr(0, e.length - t.length)), e
                  );
                }),
                (u.extname = function (e) {
                  'string' != typeof e && (e += '');
                  for (var t = -1, r = 0, o = -1, n = !0, i = 0, s = e.length - 1; 0 <= s; --s) {
                    var a = e.charCodeAt(s);
                    if (47 === a) {
                      if (n) continue;
                      r = s + 1;
                      break;
                    }
                    -1 === o && ((n = !1), (o = s + 1)),
                      46 === a ? (-1 === t ? (t = s) : 1 !== i && (i = 1)) : -1 !== t && (i = -1);
                  }
                  return -1 === t || -1 === o || 0 === i || (1 === i && t === o - 1 && t === r + 1)
                    ? ''
                    : e.slice(t, o);
                });
              var o =
                'b' === 'ab'.substr(-1)
                  ? function (e, t, r) {
                      return e.substr(t, r);
                    }
                  : function (e, t, r) {
                      return t < 0 && (t = e.length + t), e.substr(t, r);
                    };
            }).call(this);
          }).call(this, e('_process'));
        },
        { _process: 164 },
      ],
      160: [
        function (e, t, r) {
          t.exports = function (e, t, r, o) {
            var n = e[0],
              i = e[1],
              s = !1;
            void 0 === r && (r = 0), void 0 === o && (o = t.length);
            for (var a = (o - r) / 2, c = 0, u = a - 1; c < a; u = c++) {
              var l = t[r + 2 * c + 0],
                p = t[r + 2 * c + 1],
                d = t[r + 2 * u + 0],
                h = t[r + 2 * u + 1];
              i < p != i < h && n < ((d - l) * (i - p)) / (h - p) + l && (s = !s);
            }
            return s;
          };
        },
        {},
      ],
      161: [
        function (e, t, r) {
          var n = e('./flat.js'),
            i = e('./nested.js');
          (t.exports = function (e, t, r, o) {
            return (0 < t.length && Array.isArray(t[0]) ? i : n)(e, t, r, o);
          }),
            (t.exports.nested = i),
            (t.exports.flat = n);
        },
        { './flat.js': 160, './nested.js': 162 },
      ],
      162: [
        function (e, t, r) {
          t.exports = function (e, t, r, o) {
            var n = e[0],
              i = e[1],
              s = !1;
            void 0 === r && (r = 0), void 0 === o && (o = t.length);
            for (var a = o - r, c = 0, u = a - 1; c < a; u = c++) {
              var l = t[c + r][0],
                p = t[c + r][1],
                d = t[u + r][0],
                h = t[u + r][1];
              i < p != i < h && n < ((d - l) * (i - p)) / (h - p) + l && (s = !s);
            }
            return s;
          };
        },
        {},
      ],
      163: [
        function (e, r, o) {
          (function (T) {
            (function () {
              var e, t;
              (e = this),
                (t = function () {
                  'use strict';
                  function c(e, t) {
                    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
                  }
                  function o(e, t) {
                    for (var r = 0; r < t.length; r++) {
                      var o = t[r];
                      (o.enumerable = o.enumerable || !1),
                        (o.configurable = !0),
                        'value' in o && (o.writable = !0),
                        Object.defineProperty(e, o.key, o);
                    }
                  }
                  function n(e, t, r) {
                    return t && o(e.prototype, t), r && o(e, r), e;
                  }
                  var u = function (e, t) {
                    (this.next = null),
                      (this.key = e),
                      (this.data = t),
                      (this.left = null),
                      (this.right = null);
                  };
                  function t(e, t) {
                    return t < e ? 1 : e < t ? -1 : 0;
                  }
                  function s(e, t, r) {
                    for (var o = new u(null, null), n = o, i = o; ; ) {
                      var s = r(e, t.key);
                      if (s < 0) {
                        if (null === t.left) break;
                        if (r(e, t.left.key) < 0) {
                          var a = t.left;
                          if (((t.left = a.right), (a.right = t), null === (t = a).left)) break;
                        }
                        (i.left = t), (t = (i = t).left);
                      } else {
                        if (!(0 < s)) break;
                        if (null === t.right) break;
                        if (0 < r(e, t.right.key)) {
                          a = t.right;
                          if (((t.right = a.left), (a.left = t), null === (t = a).right)) break;
                        }
                        (n.right = t), (t = (n = t).right);
                      }
                    }
                    return (
                      (n.right = t.left),
                      (i.left = t.right),
                      (t.left = o.right),
                      (t.right = o.left),
                      t
                    );
                  }
                  function a(e, t, r, o) {
                    t = new u(e, t);
                    if (null === r) return (t.left = t.right = null), t;
                    o = o(e, (r = s(e, r, o)).key);
                    return (
                      o < 0
                        ? ((t.left = r.left), ((t.right = r).left = null))
                        : 0 <= o && ((t.right = r.right), ((t.left = r).right = null)),
                      t
                    );
                  }
                  function l(e, t, r) {
                    var o = null,
                      n = null;
                    return (
                      t &&
                        (0 === (e = r((t = s(e, t, r)).key, e))
                          ? ((o = t.left), (n = t.right))
                          : e < 0
                          ? ((n = t.right), (t.right = null), (o = t))
                          : ((o = t.left), (t.left = null), (n = t))),
                      { left: o, right: n }
                    );
                  }
                  var O =
                    ((e.prototype.insert = function (e, t) {
                      return this._size++, (this._root = a(e, t, this._root, this._comparator));
                    }),
                    (e.prototype.add = function (e, t) {
                      var r = new u(e, t);
                      null === this._root &&
                        ((r.left = r.right = null), this._size++, (this._root = r));
                      var o = this._comparator,
                        t = s(e, this._root, o),
                        e = o(e, t.key);
                      return (
                        0 === e
                          ? (this._root = t)
                          : (e < 0
                              ? ((r.left = t.left), ((r.right = t).left = null))
                              : 0 < e && ((r.right = t.right), ((r.left = t).right = null)),
                            this._size++,
                            (this._root = r)),
                        this._root
                      );
                    }),
                    (e.prototype.remove = function (e) {
                      this._root = this._remove(e, this._root, this._comparator);
                    }),
                    (e.prototype._remove = function (e, t, r) {
                      var o;
                      return null === t
                        ? null
                        : 0 === r(e, (t = s(e, t, r)).key)
                        ? (null === t.left
                            ? (o = t.right)
                            : ((o = s(e, t.left, r)).right = t.right),
                          this._size--,
                          o)
                        : t;
                    }),
                    (e.prototype.pop = function () {
                      var e = this._root;
                      if (e) {
                        for (; e.left; ) e = e.left;
                        return (
                          (this._root = s(e.key, this._root, this._comparator)),
                          (this._root = this._remove(e.key, this._root, this._comparator)),
                          { key: e.key, data: e.data }
                        );
                      }
                      return null;
                    }),
                    (e.prototype.findStatic = function (e) {
                      for (var t = this._root, r = this._comparator; t; ) {
                        var o = r(e, t.key);
                        if (0 === o) return t;
                        t = o < 0 ? t.left : t.right;
                      }
                      return null;
                    }),
                    (e.prototype.find = function (e) {
                      return this._root &&
                        ((this._root = s(e, this._root, this._comparator)),
                        0 !== this._comparator(e, this._root.key))
                        ? null
                        : this._root;
                    }),
                    (e.prototype.contains = function (e) {
                      for (var t = this._root, r = this._comparator; t; ) {
                        var o = r(e, t.key);
                        if (0 === o) return !0;
                        t = o < 0 ? t.left : t.right;
                      }
                      return !1;
                    }),
                    (e.prototype.forEach = function (e, t) {
                      for (var r = this._root, o = [], n = !1; !n; )
                        null !== r
                          ? (o.push(r), (r = r.left))
                          : 0 !== o.length
                          ? ((r = o.pop()), e.call(t, r), (r = r.right))
                          : (n = !0);
                      return this;
                    }),
                    (e.prototype.range = function (e, t, r, o) {
                      for (var n = [], i = this._comparator, s = this._root; 0 !== n.length || s; )
                        if (s) n.push(s), (s = s.left);
                        else {
                          if (0 < i((s = n.pop()).key, t)) break;
                          if (0 <= i(s.key, e) && r.call(o, s)) return this;
                          s = s.right;
                        }
                      return this;
                    }),
                    (e.prototype.keys = function () {
                      var t = [];
                      return (
                        this.forEach(function (e) {
                          e = e.key;
                          return t.push(e);
                        }),
                        t
                      );
                    }),
                    (e.prototype.values = function () {
                      var t = [];
                      return (
                        this.forEach(function (e) {
                          e = e.data;
                          return t.push(e);
                        }),
                        t
                      );
                    }),
                    (e.prototype.min = function () {
                      return this._root ? this.minNode(this._root).key : null;
                    }),
                    (e.prototype.max = function () {
                      return this._root ? this.maxNode(this._root).key : null;
                    }),
                    (e.prototype.minNode = function (e) {
                      if ((void 0 === e && (e = this._root), e)) for (; e.left; ) e = e.left;
                      return e;
                    }),
                    (e.prototype.maxNode = function (e) {
                      if ((void 0 === e && (e = this._root), e)) for (; e.right; ) e = e.right;
                      return e;
                    }),
                    (e.prototype.at = function (e) {
                      for (var t = this._root, r = !1, o = 0, n = []; !r; )
                        if (t) n.push(t), (t = t.left);
                        else if (0 < n.length) {
                          if (((t = n.pop()), o === e)) return t;
                          o++, (t = t.right);
                        } else r = !0;
                      return null;
                    }),
                    (e.prototype.next = function (e) {
                      var t = this._root,
                        r = null;
                      if (e.right) {
                        for (r = e.right; r.left; ) r = r.left;
                        return r;
                      }
                      for (var o = this._comparator; t; ) {
                        var n = o(e.key, t.key);
                        if (0 === n) break;
                        t = n < 0 ? (r = t).left : t.right;
                      }
                      return r;
                    }),
                    (e.prototype.prev = function (e) {
                      var t = this._root,
                        r = null;
                      if (null !== e.left) {
                        for (r = e.left; r.right; ) r = r.right;
                        return r;
                      }
                      for (var o = this._comparator; t; ) {
                        var n = o(e.key, t.key);
                        if (0 === n) break;
                        t = n < 0 ? t.left : (r = t).right;
                      }
                      return r;
                    }),
                    (e.prototype.clear = function () {
                      return (this._root = null), (this._size = 0), this;
                    }),
                    (e.prototype.toList = function () {
                      return (function (e) {
                        var t = e,
                          r = [],
                          o = !1,
                          e = new u(null, null),
                          n = e;
                        for (; !o; )
                          t
                            ? (r.push(t), (t = t.left))
                            : 0 < r.length
                            ? (t = (t = n = n.next = r.pop()).right)
                            : (o = !0);
                        return (n.next = null), e.next;
                      })(this._root);
                    }),
                    (e.prototype.load = function (e, t, r) {
                      void 0 === t && (t = []), void 0 === r && (r = !1);
                      var o = e.length,
                        n = this._comparator;
                      return (
                        r &&
                          (function e(t, r, o, n, i) {
                            if (n <= o) return;
                            var s = t[(o + n) >> 1];
                            var a = o - 1;
                            var c = n + 1;
                            for (;;) {
                              for (; a++, i(t[a], s) < 0; );
                              for (; c--, 0 < i(t[c], s); );
                              if (c <= a) break;
                              var u = t[a];
                              (t[a] = t[c]), (t[c] = u), (u = r[a]), (r[a] = r[c]), (r[c] = u);
                            }
                            e(t, r, o, c, i);
                            e(t, r, c + 1, n, i);
                          })(e, t, 0, o - 1, n),
                        null === this._root
                          ? ((this._root = (function e(t, r, o, n) {
                              var i = n - o;
                              if (0 < i) {
                                var s = o + Math.floor(i / 2),
                                  a = t[s],
                                  i = r[s],
                                  i = new u(a, i);
                                return (i.left = e(t, r, o, s)), (i.right = e(t, r, s + 1, n)), i;
                              }
                              return null;
                            })(e, t, 0, o)),
                            (this._size = o))
                          : ((n = (function (e, t, r) {
                              var o = new u(null, null),
                                n = o,
                                i = e,
                                s = t;
                              for (; null !== i && null !== s; )
                                r(i.key, s.key) < 0
                                  ? (i = (n.next = i).next)
                                  : (s = (n.next = s).next),
                                  (n = n.next);
                              null !== i ? (n.next = i) : null !== s && (n.next = s);
                              return o.next;
                            })(
                              this.toList(),
                              (function (e, t) {
                                for (var r = new u(null, null), o = r, n = 0; n < e.length; n++)
                                  o = o.next = new u(e[n], t[n]);
                                return (o.next = null), r.next;
                              })(e, t),
                              n,
                            )),
                            (o = this._size + o),
                            (this._root = (function e(t, r, o) {
                              var n = o - r;
                              if (0 < n) {
                                var i = r + Math.floor(n / 2),
                                  n = e(t, r, i),
                                  r = t.head;
                                return (
                                  (r.left = n),
                                  (t.head = t.head.next),
                                  (r.right = e(t, i + 1, o)),
                                  r
                                );
                              }
                              return null;
                            })({ head: n }, 0, o))),
                        this
                      );
                    }),
                    (e.prototype.isEmpty = function () {
                      return null === this._root;
                    }),
                    Object.defineProperty(e.prototype, 'size', {
                      get: function () {
                        return this._size;
                      },
                      enumerable: !0,
                      configurable: !0,
                    }),
                    Object.defineProperty(e.prototype, 'root', {
                      get: function () {
                        return this._root;
                      },
                      enumerable: !0,
                      configurable: !0,
                    }),
                    (e.prototype.toString = function (e) {
                      void 0 === e &&
                        (e = function (e) {
                          return String(e.key);
                        });
                      var t = [];
                      return (
                        (function e(t, r, o, n, i) {
                          t &&
                            (n(r + (o ? '└── ' : '├── ') + i(t) + '\n'),
                            (o = r + (o ? '    ' : '│   ')),
                            t.left && e(t.left, o, !1, n, i),
                            t.right && e(t.right, o, !0, n, i));
                        })(
                          this._root,
                          '',
                          !0,
                          function (e) {
                            return t.push(e);
                          },
                          e,
                        ),
                        t.join('')
                      );
                    }),
                    (e.prototype.update = function (e, t, r) {
                      var o = this._comparator,
                        n = l(e, this._root, o),
                        i = n.left,
                        n = n.right;
                      o(e, t) < 0 ? (n = a(t, r, n, o)) : (i = a(t, r, i, o)),
                        (this._root =
                          ((i = i),
                          (o = o),
                          null === (n = n)
                            ? i
                            : (null === i || ((n = s(i.key, n, o)).left = i), n)));
                    }),
                    (e.prototype.split = function (e) {
                      return l(e, this._root, this._comparator);
                    }),
                    e);
                  function e(e) {
                    void 0 === e && (e = t),
                      (this._root = null),
                      (this._size = 0),
                      (this._comparator = e);
                  }
                  function p(e, t) {
                    return e.ll.x <= t.x && t.x <= e.ur.x && e.ll.y <= t.y && t.y <= e.ur.y;
                  }
                  function P(e, t) {
                    if (t.ur.x < e.ll.x || e.ur.x < t.ll.x || t.ur.y < e.ll.y || e.ur.y < t.ll.y)
                      return null;
                    var r = (e.ll.x < t.ll.x ? t : e).ll.x,
                      o = (e.ur.x < t.ur.x ? e : t).ur.x;
                    return {
                      ll: { x: r, y: (e.ll.y < t.ll.y ? t : e).ll.y },
                      ur: { x: o, y: (e.ur.y < t.ur.y ? e : t).ur.y },
                    };
                  }
                  var i = Number.EPSILON;
                  void 0 === i && (i = Math.pow(2, -52));
                  function d(e, t) {
                    if (-i < e && e < i && -i < t && t < i) return 0;
                    var r = e - t;
                    return r * r < v * e * t ? 0 : e < t ? -1 : 1;
                  }
                  function h(e, t) {
                    return e.x * t.y - e.y * t.x;
                  }
                  function f(e, t) {
                    return e.x * t.x + e.y * t.y;
                  }
                  function y(e, t, r) {
                    return (
                      (t = { x: t.x - e.x, y: t.y - e.y }),
                      (e = { x: r.x - e.x, y: r.y - e.y }),
                      (e = h(t, e)),
                      d(e, 0)
                    );
                  }
                  function g(e) {
                    return Math.sqrt(f(e, e));
                  }
                  function m(e, t, r) {
                    return 0 === t.y ? null : { x: e.x + (t.x / t.y) * (r - e.y), y: r };
                  }
                  function _(e, t, r) {
                    return 0 === t.x ? null : { x: r, y: e.y + (t.y / t.x) * (r - e.x) };
                  }
                  var v = i * i,
                    r = (function () {
                      function e() {
                        c(this, e), this.reset();
                      }
                      return (
                        n(e, [
                          {
                            key: 'reset',
                            value: function () {
                              (this.xRounder = new b()), (this.yRounder = new b());
                            },
                          },
                          {
                            key: 'round',
                            value: function (e, t) {
                              return { x: this.xRounder.round(e), y: this.yRounder.round(t) };
                            },
                          },
                        ]),
                        e
                      );
                    })(),
                    b = (function () {
                      function e() {
                        c(this, e), (this.tree = new O()), this.round(0);
                      }
                      return (
                        n(e, [
                          {
                            key: 'round',
                            value: function (e) {
                              var t = this.tree.add(e),
                                r = this.tree.prev(t);
                              if (null !== r && 0 === d(t.key, r.key))
                                return this.tree.remove(e), r.key;
                              r = this.tree.next(t);
                              return null !== r && 0 === d(t.key, r.key)
                                ? (this.tree.remove(e), r.key)
                                : e;
                            },
                          },
                        ]),
                        e
                      );
                    })(),
                    A = new r(),
                    M = (function () {
                      function o(e, t) {
                        c(this, o),
                          void 0 === e.events ? (e.events = [this]) : e.events.push(this),
                          (this.point = e),
                          (this.isLeft = t);
                      }
                      return (
                        n(o, null, [
                          {
                            key: 'compare',
                            value: function (e, t) {
                              var r = o.comparePoints(e.point, t.point);
                              return 0 !== r
                                ? r
                                : (e.point !== t.point && e.link(t),
                                  e.isLeft !== t.isLeft
                                    ? e.isLeft
                                      ? 1
                                      : -1
                                    : x.compare(e.segment, t.segment));
                            },
                          },
                          {
                            key: 'comparePoints',
                            value: function (e, t) {
                              return e.x < t.x
                                ? -1
                                : e.x > t.x
                                ? 1
                                : e.y < t.y
                                ? -1
                                : e.y > t.y
                                ? 1
                                : 0;
                            },
                          },
                        ]),
                        n(o, [
                          {
                            key: 'link',
                            value: function (e) {
                              if (e.point === this.point)
                                throw new Error('Tried to link already linked events');
                              for (var t = e.point.events, r = 0, o = t.length; r < o; r++) {
                                var n = t[r];
                                this.point.events.push(n), (n.point = this.point);
                              }
                              this.checkForConsuming();
                            },
                          },
                          {
                            key: 'checkForConsuming',
                            value: function () {
                              for (var e = this.point.events.length, t = 0; t < e; t++) {
                                var r = this.point.events[t];
                                if (void 0 === r.segment.consumedBy)
                                  for (var o = t + 1; o < e; o++) {
                                    var n = this.point.events[o];
                                    void 0 === n.consumedBy &&
                                      r.otherSE.point.events === n.otherSE.point.events &&
                                      r.segment.consume(n.segment);
                                  }
                              }
                            },
                          },
                          {
                            key: 'getAvailableLinkedEvents',
                            value: function () {
                              for (var e = [], t = 0, r = this.point.events.length; t < r; t++) {
                                var o = this.point.events[t];
                                o !== this &&
                                  !o.segment.ringOut &&
                                  o.segment.isInResult() &&
                                  e.push(o);
                              }
                              return e;
                            },
                          },
                          {
                            key: 'getLeftmostComparator',
                            value: function (r) {
                              function n(e) {
                                var t = e.otherSE;
                                i.set(e, {
                                  sine: (function (e, t, r) {
                                    (t = { x: t.x - e.x, y: t.y - e.y }),
                                      (e = { x: r.x - e.x, y: r.y - e.y });
                                    return h(e, t) / g(e) / g(t);
                                  })(o.point, r.point, t.point),
                                  cosine: (function (e, t, r) {
                                    (t = { x: t.x - e.x, y: t.y - e.y }),
                                      (e = { x: r.x - e.x, y: r.y - e.y });
                                    return f(e, t) / g(e) / g(t);
                                  })(o.point, r.point, t.point),
                                });
                              }
                              var o = this,
                                i = new Map();
                              return function (e, t) {
                                i.has(e) || n(e), i.has(t) || n(t);
                                var r = i.get(e),
                                  o = r.sine,
                                  e = r.cosine,
                                  r = i.get(t),
                                  t = r.sine,
                                  r = r.cosine;
                                return 0 <= o && 0 <= t
                                  ? e < r
                                    ? 1
                                    : r < e
                                    ? -1
                                    : 0
                                  : o < 0 && t < 0
                                  ? e < r
                                    ? -1
                                    : r < e
                                    ? 1
                                    : 0
                                  : t < o
                                  ? -1
                                  : o < t
                                  ? 1
                                  : 0;
                              };
                            },
                          },
                        ]),
                        o
                      );
                    })(),
                    E = 0,
                    x = (function () {
                      function u(e, t, r, o) {
                        c(this, u),
                          (this.id = ++E),
                          ((this.leftSE = e).segment = this),
                          (e.otherSE = t),
                          ((this.rightSE = t).segment = this),
                          (t.otherSE = e),
                          (this.rings = r),
                          (this.windings = o);
                      }
                      return (
                        n(u, null, [
                          {
                            key: 'compare',
                            value: function (e, t) {
                              var r = e.leftSE.point.x,
                                o = t.leftSE.point.x,
                                n = e.rightSE.point.x,
                                i = t.rightSE.point.x;
                              if (i < r) return 1;
                              if (n < o) return -1;
                              var s = e.leftSE.point.y,
                                a = t.leftSE.point.y,
                                c = e.rightSE.point.y,
                                u = t.rightSE.point.y;
                              if (r < o) {
                                if (a < s && a < c) return 1;
                                if (s < a && c < a) return -1;
                                var l = e.comparePoint(t.leftSE.point);
                                if (l < 0) return 1;
                                if (0 < l) return -1;
                                l = t.comparePoint(e.rightSE.point);
                                return 0 !== l ? l : -1;
                              }
                              if (o < r) {
                                if (s < a && s < u) return -1;
                                if (a < s && u < s) return 1;
                                l = t.comparePoint(e.leftSE.point);
                                if (0 !== l) return l;
                                l = e.comparePoint(t.rightSE.point);
                                return l < 0 ? 1 : 0 < l ? -1 : 1;
                              }
                              if (s < a) return -1;
                              if (a < s) return 1;
                              if (n < i) {
                                var p = t.comparePoint(e.rightSE.point);
                                if (0 !== p) return p;
                              }
                              if (i < n) {
                                p = e.comparePoint(t.rightSE.point);
                                if (p < 0) return 1;
                                if (0 < p) return -1;
                              }
                              if (n !== i) {
                                (s = c - s), (r = n - r), (a = u - a), (o = i - o);
                                if (r < s && a < o) return 1;
                                if (s < r && o < a) return -1;
                              }
                              return i < n
                                ? 1
                                : n < i || c < u
                                ? -1
                                : u < c
                                ? 1
                                : e.id < t.id
                                ? -1
                                : e.id > t.id
                                ? 1
                                : 0;
                            },
                          },
                        ]),
                        n(
                          u,
                          [
                            {
                              key: 'replaceRightSE',
                              value: function (e) {
                                (this.rightSE = e),
                                  ((this.rightSE.segment = this).rightSE.otherSE = this.leftSE),
                                  (this.leftSE.otherSE = this.rightSE);
                              },
                            },
                            {
                              key: 'bbox',
                              value: function () {
                                var e = this.leftSE.point.y,
                                  t = this.rightSE.point.y;
                                return {
                                  ll: { x: this.leftSE.point.x, y: e < t ? e : t },
                                  ur: { x: this.rightSE.point.x, y: t < e ? e : t },
                                };
                              },
                            },
                            {
                              key: 'vector',
                              value: function () {
                                return {
                                  x: this.rightSE.point.x - this.leftSE.point.x,
                                  y: this.rightSE.point.y - this.leftSE.point.y,
                                };
                              },
                            },
                            {
                              key: 'isAnEndpoint',
                              value: function (e) {
                                return (
                                  (e.x === this.leftSE.point.x && e.y === this.leftSE.point.y) ||
                                  (e.x === this.rightSE.point.x && e.y === this.rightSE.point.y)
                                );
                              },
                            },
                            {
                              key: 'comparePoint',
                              value: function (e) {
                                if (this.isAnEndpoint(e)) return 0;
                                var t = this.leftSE.point,
                                  r = this.rightSE.point,
                                  o = this.vector();
                                if (t.x === r.x) return e.x === t.x ? 0 : e.x < t.x ? 1 : -1;
                                (r = (e.y - t.y) / o.y), (r = t.x + r * o.x);
                                if (e.x === r) return 0;
                                (r = (e.x - t.x) / o.x), (o = t.y + r * o.y);
                                return e.y === o ? 0 : e.y < o ? -1 : 1;
                              },
                            },
                            {
                              key: 'getIntersection',
                              value: function (e) {
                                var t = this.bbox(),
                                  r = e.bbox(),
                                  o = P(t, r);
                                if (null === o) return null;
                                var n = this.leftSE.point,
                                  i = this.rightSE.point,
                                  s = e.leftSE.point,
                                  a = e.rightSE.point,
                                  c = p(t, s) && 0 === this.comparePoint(s),
                                  u = p(r, n) && 0 === e.comparePoint(n),
                                  t = p(t, a) && 0 === this.comparePoint(a),
                                  r = p(r, i) && 0 === e.comparePoint(i);
                                if (u && c) return r && !t ? i : !r && t ? a : null;
                                if (u) return t && n.x === a.x && n.y === a.y ? null : n;
                                if (c) return r && i.x === s.x && i.y === s.y ? null : s;
                                if (r && t) return null;
                                if (r) return i;
                                if (t) return a;
                                e = (function (e, t, r, o) {
                                  if (0 === t.x) return _(r, o, e.x);
                                  if (0 === o.x) return _(e, t, r.x);
                                  if (0 === t.y) return m(r, o, e.y);
                                  if (0 === o.y) return m(e, t, r.y);
                                  var n = h(t, o);
                                  if (0 == n) return null;
                                  var i = { x: r.x - e.x, y: r.y - e.y },
                                    s = h(i, t) / n,
                                    n = h(i, o) / n;
                                  return {
                                    x: (e.x + n * t.x + (r.x + s * o.x)) / 2,
                                    y: (e.y + n * t.y + (r.y + s * o.y)) / 2,
                                  };
                                })(n, this.vector(), s, e.vector());
                                return null !== e && p(o, e) ? A.round(e.x, e.y) : null;
                              },
                            },
                            {
                              key: 'split',
                              value: function (e) {
                                var t = [],
                                  r = void 0 !== e.events,
                                  o = new M(e, !0),
                                  n = new M(e, !1),
                                  e = this.rightSE;
                                this.replaceRightSE(n), t.push(n), t.push(o);
                                e = new u(o, e, this.rings.slice(), this.windings.slice());
                                return (
                                  0 < M.comparePoints(e.leftSE.point, e.rightSE.point) &&
                                    e.swapEvents(),
                                  0 < M.comparePoints(this.leftSE.point, this.rightSE.point) &&
                                    this.swapEvents(),
                                  r && (o.checkForConsuming(), n.checkForConsuming()),
                                  t
                                );
                              },
                            },
                            {
                              key: 'swapEvents',
                              value: function () {
                                var e = this.rightSE;
                                (this.rightSE = this.leftSE),
                                  (this.leftSE = e),
                                  (this.leftSE.isLeft = !0),
                                  (this.rightSE.isLeft = !1);
                                for (var t = 0, r = this.windings.length; t < r; t++)
                                  this.windings[t] *= -1;
                              },
                            },
                            {
                              key: 'consume',
                              value: function (e) {
                                for (var t = this, r = e; t.consumedBy; ) t = t.consumedBy;
                                for (; r.consumedBy; ) r = r.consumedBy;
                                var o,
                                  e = u.compare(t, r);
                                if (0 !== e) {
                                  0 < e && ((o = t), (t = r), (r = o)),
                                    t.prev === r && ((o = t), (t = r), (r = o));
                                  for (var n = 0, i = r.rings.length; n < i; n++) {
                                    var s = r.rings[n],
                                      a = r.windings[n],
                                      c = t.rings.indexOf(s);
                                    -1 === c
                                      ? (t.rings.push(s), t.windings.push(a))
                                      : (t.windings[c] += a);
                                  }
                                  (r.rings = null),
                                    (r.windings = null),
                                    (r.consumedBy = t),
                                    (r.leftSE.consumedBy = t.leftSE),
                                    (r.rightSE.consumedBy = t.rightSE);
                                }
                              },
                            },
                            {
                              key: 'prevInResult',
                              value: function () {
                                return (
                                  void 0 !== this._prevInResult ||
                                    (this.prev
                                      ? this.prev.isInResult()
                                        ? (this._prevInResult = this.prev)
                                        : (this._prevInResult = this.prev.prevInResult())
                                      : (this._prevInResult = null)),
                                  this._prevInResult
                                );
                              },
                            },
                            {
                              key: 'beforeState',
                              value: function () {
                                return (
                                  void 0 !== this._beforeState ||
                                    (this.prev
                                      ? ((e = this.prev.consumedBy || this.prev),
                                        (this._beforeState = e.afterState()))
                                      : (this._beforeState = {
                                          rings: [],
                                          windings: [],
                                          multiPolys: [],
                                        })),
                                  this._beforeState
                                );
                                var e;
                              },
                            },
                            {
                              key: 'afterState',
                              value: function () {
                                if (void 0 !== this._afterState) return this._afterState;
                                var e = this.beforeState();
                                this._afterState = {
                                  rings: e.rings.slice(0),
                                  windings: e.windings.slice(0),
                                  multiPolys: [],
                                };
                                for (
                                  var t = this._afterState.rings,
                                    r = this._afterState.windings,
                                    o = this._afterState.multiPolys,
                                    n = 0,
                                    i = this.rings.length;
                                  n < i;
                                  n++
                                ) {
                                  var s = this.rings[n],
                                    a = this.windings[n],
                                    c = t.indexOf(s);
                                  -1 === c ? (t.push(s), r.push(a)) : (r[c] += a);
                                }
                                for (var u, l, p = [], d = [], h = 0, f = t.length; h < f; h++)
                                  0 !== r[h] &&
                                    ((u = (l = t[h]).poly),
                                    -1 === d.indexOf(u) &&
                                      (l.isExterior
                                        ? p.push(u)
                                        : (-1 === d.indexOf(u) && d.push(u),
                                          -1 !== (l = p.indexOf(l.poly)) && p.splice(l, 1))));
                                for (var y = 0, g = p.length; y < g; y++) {
                                  var m = p[y].multiPoly;
                                  -1 === o.indexOf(m) && o.push(m);
                                }
                                return this._afterState;
                              },
                            },
                            {
                              key: 'isInResult',
                              value: function () {
                                if (this.consumedBy) return !1;
                                if (void 0 !== this._isInResult) return this._isInResult;
                                var e = this.beforeState().multiPolys,
                                  t = this.afterState().multiPolys;
                                switch (D.type) {
                                  case 'union':
                                    var r = 0 === e.length,
                                      o = 0 === t.length;
                                    this._isInResult = r != o;
                                    break;
                                  case 'intersection':
                                    var n,
                                      o =
                                        e.length < t.length
                                          ? ((n = e.length), t.length)
                                          : ((n = t.length), e.length);
                                    this._isInResult = o === D.numMultiPolys && n < o;
                                    break;
                                  case 'xor':
                                    var i = Math.abs(e.length - t.length);
                                    this._isInResult = i % 2 == 1;
                                    break;
                                  case 'difference':
                                    i = function (e) {
                                      return 1 === e.length && e[0].isSubject;
                                    };
                                    this._isInResult = i(e) !== i(t);
                                    break;
                                  default:
                                    throw new Error(
                                      'Unrecognized operation type found '.concat(D.type),
                                    );
                                }
                                return this._isInResult;
                              },
                            },
                          ],
                          [
                            {
                              key: 'fromRing',
                              value: function (e, t, r) {
                                var o,
                                  n,
                                  i,
                                  s = M.comparePoints(e, t);
                                if (s < 0) (o = e), (n = t), (i = 1);
                                else {
                                  if (!(0 < s))
                                    throw new Error(
                                      'Tried to create degenerate segment at ['
                                        .concat(e.x, ', ')
                                        .concat(e.y, ']'),
                                    );
                                  (o = t), (n = e), (i = -1);
                                }
                                return new u(new M(o, !0), new M(n, !1), [r], [i]);
                              },
                            },
                          ],
                        ),
                        u
                      );
                    })(),
                    S = (function () {
                      function a(e, t, r) {
                        if ((c(this, a), !Array.isArray(e) || 0 === e.length))
                          throw new Error('Input geometry is not a valid Polygon or MultiPolygon');
                        if (
                          ((this.poly = t),
                          (this.isExterior = r),
                          (this.segments = []),
                          'number' != typeof e[0][0] || 'number' != typeof e[0][1])
                        )
                          throw new Error('Input geometry is not a valid Polygon or MultiPolygon');
                        r = A.round(e[0][0], e[0][1]);
                        this.bbox = { ll: { x: r.x, y: r.y }, ur: { x: r.x, y: r.y } };
                        for (var o = r, n = 1, i = e.length; n < i; n++) {
                          if ('number' != typeof e[n][0] || 'number' != typeof e[n][1])
                            throw new Error(
                              'Input geometry is not a valid Polygon or MultiPolygon',
                            );
                          var s = A.round(e[n][0], e[n][1]);
                          (s.x === o.x && s.y === o.y) ||
                            (this.segments.push(x.fromRing(o, s, this)),
                            s.x < this.bbox.ll.x && (this.bbox.ll.x = s.x),
                            s.y < this.bbox.ll.y && (this.bbox.ll.y = s.y),
                            s.x > this.bbox.ur.x && (this.bbox.ur.x = s.x),
                            s.y > this.bbox.ur.y && (this.bbox.ur.y = s.y),
                            (o = s));
                        }
                        (r.x === o.x && r.y === o.y) || this.segments.push(x.fromRing(o, r, this));
                      }
                      return (
                        n(a, [
                          {
                            key: 'getSweepEvents',
                            value: function () {
                              for (var e = [], t = 0, r = this.segments.length; t < r; t++) {
                                var o = this.segments[t];
                                e.push(o.leftSE), e.push(o.rightSE);
                              }
                              return e;
                            },
                          },
                        ]),
                        a
                      );
                    })(),
                    w = (function () {
                      function i(e, t) {
                        if ((c(this, i), !Array.isArray(e)))
                          throw new Error('Input geometry is not a valid Polygon or MultiPolygon');
                        (this.exteriorRing = new S(e[0], this, !0)),
                          (this.bbox = {
                            ll: { x: this.exteriorRing.bbox.ll.x, y: this.exteriorRing.bbox.ll.y },
                            ur: { x: this.exteriorRing.bbox.ur.x, y: this.exteriorRing.bbox.ur.y },
                          }),
                          (this.interiorRings = []);
                        for (var r = 1, o = e.length; r < o; r++) {
                          var n = new S(e[r], this, !1);
                          n.bbox.ll.x < this.bbox.ll.x && (this.bbox.ll.x = n.bbox.ll.x),
                            n.bbox.ll.y < this.bbox.ll.y && (this.bbox.ll.y = n.bbox.ll.y),
                            n.bbox.ur.x > this.bbox.ur.x && (this.bbox.ur.x = n.bbox.ur.x),
                            n.bbox.ur.y > this.bbox.ur.y && (this.bbox.ur.y = n.bbox.ur.y),
                            this.interiorRings.push(n);
                        }
                        this.multiPoly = t;
                      }
                      return (
                        n(i, [
                          {
                            key: 'getSweepEvents',
                            value: function () {
                              for (
                                var e = this.exteriorRing.getSweepEvents(),
                                  t = 0,
                                  r = this.interiorRings.length;
                                t < r;
                                t++
                              )
                                for (
                                  var o = this.interiorRings[t].getSweepEvents(),
                                    n = 0,
                                    i = o.length;
                                  n < i;
                                  n++
                                )
                                  e.push(o[n]);
                              return e;
                            },
                          },
                        ]),
                        i
                      );
                    })(),
                    L = (function () {
                      function i(e, t) {
                        if ((c(this, i), !Array.isArray(e)))
                          throw new Error('Input geometry is not a valid Polygon or MultiPolygon');
                        try {
                          'number' == typeof e[0][0][0] && (e = [e]);
                        } catch (e) {}
                        (this.polys = []),
                          (this.bbox = {
                            ll: { x: Number.POSITIVE_INFINITY, y: Number.POSITIVE_INFINITY },
                            ur: { x: Number.NEGATIVE_INFINITY, y: Number.NEGATIVE_INFINITY },
                          });
                        for (var r = 0, o = e.length; r < o; r++) {
                          var n = new w(e[r], this);
                          n.bbox.ll.x < this.bbox.ll.x && (this.bbox.ll.x = n.bbox.ll.x),
                            n.bbox.ll.y < this.bbox.ll.y && (this.bbox.ll.y = n.bbox.ll.y),
                            n.bbox.ur.x > this.bbox.ur.x && (this.bbox.ur.x = n.bbox.ur.x),
                            n.bbox.ur.y > this.bbox.ur.y && (this.bbox.ur.y = n.bbox.ur.y),
                            this.polys.push(n);
                        }
                        this.isSubject = t;
                      }
                      return (
                        n(i, [
                          {
                            key: 'getSweepEvents',
                            value: function () {
                              for (var e = [], t = 0, r = this.polys.length; t < r; t++)
                                for (
                                  var o = this.polys[t].getSweepEvents(), n = 0, i = o.length;
                                  n < i;
                                  n++
                                )
                                  e.push(o[n]);
                              return e;
                            },
                          },
                        ]),
                        i
                      );
                    })(),
                    N = (function () {
                      function _(e) {
                        c(this, _);
                        for (var t = 0, r = (this.events = e).length; t < r; t++)
                          e[t].segment.ringOut = this;
                        this.poly = null;
                      }
                      return (
                        n(_, null, [
                          {
                            key: 'factory',
                            value: function (e) {
                              for (var t = [], r = 0, o = e.length; r < o; r++) {
                                var n = e[r];
                                if (n.isInResult() && !n.ringOut) {
                                  for (
                                    var i,
                                      s = n.leftSE,
                                      a = n.rightSE,
                                      c = [s],
                                      u = s.point,
                                      l = [];
                                    (i = s), (s = a), c.push(s), s.point !== u;

                                  )
                                    for (;;) {
                                      var p = s.getAvailableLinkedEvents();
                                      if (0 === p.length) {
                                        var d = c[0].point,
                                          h = c[c.length - 1].point;
                                        throw new Error(
                                          'Unable to complete output ring starting at ['.concat(
                                            d.x,
                                            ',',
                                          ) +
                                            ' '.concat(
                                              d.y,
                                              ']. Last matching segment found ends at',
                                            ) +
                                            ' ['.concat(h.x, ', ').concat(h.y, '].'),
                                        );
                                      }
                                      if (1 === p.length) {
                                        a = p[0].otherSE;
                                        break;
                                      }
                                      for (var f = null, y = 0, g = l.length; y < g; y++)
                                        if (l[y].point === s.point) {
                                          f = y;
                                          break;
                                        }
                                      if (null === f) {
                                        l.push({ index: c.length, point: s.point });
                                        var m = s.getLeftmostComparator(i),
                                          a = p.sort(m)[0].otherSE;
                                        break;
                                      }
                                      (m = l.splice(f)[0]), (m = c.splice(m.index));
                                      m.unshift(m[0].otherSE), t.push(new _(m.reverse()));
                                    }
                                  t.push(new _(c));
                                }
                              }
                              return t;
                            },
                          },
                        ]),
                        n(_, [
                          {
                            key: 'getGeom',
                            value: function () {
                              for (
                                var e = this.events[0].point,
                                  t = [e],
                                  r = 1,
                                  o = this.events.length - 1;
                                r < o;
                                r++
                              ) {
                                var n = this.events[r].point,
                                  i = this.events[r + 1].point;
                                0 !== y(n, e, i) && (t.push(n), (e = n));
                              }
                              if (1 === t.length) return null;
                              var s = t[0],
                                a = t[1];
                              0 === y(s, e, a) && t.shift(), t.push(t[0]);
                              for (
                                var c = this.isExteriorRing() ? 1 : -1,
                                  a = this.isExteriorRing() ? 0 : t.length - 1,
                                  u = this.isExteriorRing() ? t.length : -1,
                                  l = [],
                                  p = a;
                                p != u;
                                p += c
                              )
                                l.push([t[p].x, t[p].y]);
                              return l;
                            },
                          },
                          {
                            key: 'isExteriorRing',
                            value: function () {
                              var e;
                              return (
                                void 0 === this._isExteriorRing &&
                                  ((e = this.enclosingRing()),
                                  (this._isExteriorRing = !e || !e.isExteriorRing())),
                                this._isExteriorRing
                              );
                            },
                          },
                          {
                            key: 'enclosingRing',
                            value: function () {
                              return (
                                void 0 === this._enclosingRing &&
                                  (this._enclosingRing = this._calcEnclosingRing()),
                                this._enclosingRing
                              );
                            },
                          },
                          {
                            key: '_calcEnclosingRing',
                            value: function () {
                              for (
                                var e = this.events[0], t = 1, r = this.events.length;
                                t < r;
                                t++
                              ) {
                                var o = this.events[t];
                                0 < M.compare(e, o) && (e = o);
                              }
                              for (
                                var n = e.segment.prevInResult(), i = n ? n.prevInResult() : null;
                                ;

                              ) {
                                if (!n) return null;
                                if (!i) return n.ringOut;
                                if (i.ringOut !== n.ringOut)
                                  return i.ringOut.enclosingRing() !== n.ringOut
                                    ? n.ringOut
                                    : n.ringOut.enclosingRing();
                                i = (n = i.prevInResult()) ? n.prevInResult() : null;
                              }
                            },
                          },
                        ]),
                        _
                      );
                    })(),
                    I = (function () {
                      function t(e) {
                        c(this, t), (((this.exteriorRing = e).poly = this).interiorRings = []);
                      }
                      return (
                        n(t, [
                          {
                            key: 'addInterior',
                            value: function (e) {
                              this.interiorRings.push(e), (e.poly = this);
                            },
                          },
                          {
                            key: 'getGeom',
                            value: function () {
                              var e = [this.exteriorRing.getGeom()];
                              if (null === e[0]) return null;
                              for (var t = 0, r = this.interiorRings.length; t < r; t++) {
                                var o = this.interiorRings[t].getGeom();
                                null !== o && e.push(o);
                              }
                              return e;
                            },
                          },
                        ]),
                        t
                      );
                    })(),
                    F = (function () {
                      function t(e) {
                        c(this, t), (this.rings = e), (this.polys = this._composePolys(e));
                      }
                      return (
                        n(t, [
                          {
                            key: 'getGeom',
                            value: function () {
                              for (var e = [], t = 0, r = this.polys.length; t < r; t++) {
                                var o = this.polys[t].getGeom();
                                null !== o && e.push(o);
                              }
                              return e;
                            },
                          },
                          {
                            key: '_composePolys',
                            value: function (e) {
                              for (var t = [], r = 0, o = e.length; r < o; r++) {
                                var n,
                                  i = e[r];
                                i.poly ||
                                  (i.isExteriorRing()
                                    ? t.push(new I(i))
                                    : ((n = i.enclosingRing()).poly || t.push(new I(n)),
                                      n.poly.addInterior(i)));
                              }
                              return t;
                            },
                          },
                        ]),
                        t
                      );
                    })(),
                    R = (function () {
                      function r(e) {
                        var t =
                          1 < arguments.length && void 0 !== arguments[1]
                            ? arguments[1]
                            : x.compare;
                        c(this, r), (this.queue = e), (this.tree = new O(t)), (this.segments = []);
                      }
                      return (
                        n(r, [
                          {
                            key: 'process',
                            value: function (e) {
                              var t = e.segment,
                                r = [];
                              if (e.consumedBy)
                                return (
                                  e.isLeft ? this.queue.remove(e.otherSE) : this.tree.remove(t), r
                                );
                              var o = e.isLeft ? this.tree.insert(t) : this.tree.find(t);
                              if (!o)
                                throw new Error(
                                  'Unable to find segment #'.concat(t.id, ' ') +
                                    '['
                                      .concat(t.leftSE.point.x, ', ')
                                      .concat(t.leftSE.point.y, '] -> ') +
                                    '['
                                      .concat(t.rightSE.point.x, ', ')
                                      .concat(t.rightSE.point.y, '] ') +
                                    'in SweepLine tree. Please submit a bug report.',
                                );
                              for (var n = o, i = o, s = void 0, a = void 0; void 0 === s; )
                                null === (n = this.tree.prev(n))
                                  ? (s = null)
                                  : void 0 === n.key.consumedBy && (s = n.key);
                              for (; void 0 === a; )
                                null === (i = this.tree.next(i))
                                  ? (a = null)
                                  : void 0 === i.key.consumedBy && (a = i.key);
                              if (e.isLeft) {
                                o = null;
                                if (s) {
                                  var c = s.getIntersection(t);
                                  if (
                                    null !== c &&
                                    (t.isAnEndpoint(c) || (o = c), !s.isAnEndpoint(c))
                                  )
                                    for (
                                      var u = this._splitSafely(s, c), l = 0, p = u.length;
                                      l < p;
                                      l++
                                    )
                                      r.push(u[l]);
                                }
                                c = null;
                                if (a) {
                                  var d = a.getIntersection(t);
                                  if (
                                    null !== d &&
                                    (t.isAnEndpoint(d) || (c = d), !a.isAnEndpoint(d))
                                  )
                                    for (
                                      var h = this._splitSafely(a, d), f = 0, y = h.length;
                                      f < y;
                                      f++
                                    )
                                      r.push(h[f]);
                                }
                                if (null !== o || null !== c) {
                                  d = null;
                                  (d =
                                    null !== o && (null === c || M.comparePoints(o, c) <= 0)
                                      ? o
                                      : c),
                                    this.queue.remove(t.rightSE),
                                    r.push(t.rightSE);
                                  for (var g = t.split(d), m = 0, _ = g.length; m < _; m++)
                                    r.push(g[m]);
                                }
                                0 < r.length
                                  ? (this.tree.remove(t), r.push(e))
                                  : (this.segments.push(t), (t.prev = s));
                              } else {
                                if (s && a) {
                                  e = s.getIntersection(a);
                                  if (null !== e) {
                                    if (!s.isAnEndpoint(e))
                                      for (
                                        var v = this._splitSafely(s, e), b = 0, E = v.length;
                                        b < E;
                                        b++
                                      )
                                        r.push(v[b]);
                                    if (!a.isAnEndpoint(e))
                                      for (
                                        var x = this._splitSafely(a, e), S = 0, w = x.length;
                                        S < w;
                                        S++
                                      )
                                        r.push(x[S]);
                                  }
                                }
                                this.tree.remove(t);
                              }
                              return r;
                            },
                          },
                          {
                            key: '_splitSafely',
                            value: function (e, t) {
                              this.tree.remove(e);
                              var r = e.rightSE;
                              this.queue.remove(r);
                              t = e.split(t);
                              return t.push(r), void 0 === e.consumedBy && this.tree.insert(e), t;
                            },
                          },
                        ]),
                        r
                      );
                    })(),
                    j = (void 0 !== T && T.env.POLYGON_CLIPPING_MAX_QUEUE_SIZE) || 1e6,
                    k = (void 0 !== T && T.env.POLYGON_CLIPPING_MAX_SWEEPLINE_SEGMENTS) || 1e6,
                    D = new ((function () {
                      function e() {
                        c(this, e);
                      }
                      return (
                        n(e, [
                          {
                            key: 'run',
                            value: function (e, t, r) {
                              (D.type = e), A.reset();
                              for (var o = [new L(t, !0)], n = 0, i = r.length; n < i; n++)
                                o.push(new L(r[n], !1));
                              if (((D.numMultiPolys = o.length), 'difference' === D.type))
                                for (var s = o[0], a = 1; a < o.length; )
                                  null !== P(o[a].bbox, s.bbox) ? a++ : o.splice(a, 1);
                              if ('intersection' === D.type)
                                for (var c = 0, u = o.length; c < u; c++)
                                  for (var l = o[c], p = c + 1, d = o.length; p < d; p++)
                                    if (null === P(l.bbox, o[p].bbox)) return [];
                              for (var h = new O(M.compare), f = 0, y = o.length; f < y; f++)
                                for (var g = o[f].getSweepEvents(), m = 0, _ = g.length; m < _; m++)
                                  if ((h.insert(g[m]), h.size > j))
                                    throw new Error(
                                      'Infinite loop when putting segment endpoints in a priority queue (queue size too big). Please file a bug report.',
                                    );
                              for (var v = new R(h), b = h.size, E = h.pop(); E; ) {
                                var x = E.key;
                                if (h.size === b) {
                                  var S = x.segment;
                                  throw new Error(
                                    'Unable to pop() '.concat(
                                      x.isLeft ? 'left' : 'right',
                                      ' SweepEvent ',
                                    ) +
                                      '['
                                        .concat(x.point.x, ', ')
                                        .concat(x.point.y, '] from segment #')
                                        .concat(S.id, ' ') +
                                      '['
                                        .concat(S.leftSE.point.x, ', ')
                                        .concat(S.leftSE.point.y, '] -> ') +
                                      '['
                                        .concat(S.rightSE.point.x, ', ')
                                        .concat(S.rightSE.point.y, '] from queue. ') +
                                      'Please file a bug report.',
                                  );
                                }
                                if (h.size > j)
                                  throw new Error(
                                    'Infinite loop when passing sweep line over endpoints (queue size too big). Please file a bug report.',
                                  );
                                if (v.segments.length > k)
                                  throw new Error(
                                    'Infinite loop when passing sweep line over endpoints (too many sweep line segments). Please file a bug report.',
                                  );
                                for (var w = v.process(x), I = 0, T = w.length; I < T; I++) {
                                  var C = w[I];
                                  void 0 === C.consumedBy && h.insert(C);
                                }
                                (b = h.size), (E = h.pop());
                              }
                              A.reset();
                              t = N.factory(v.segments);
                              return new F(t).getGeom();
                            },
                          },
                        ]),
                        e
                      );
                    })())();
                  return {
                    union: function (e) {
                      for (
                        var t = arguments.length, r = new Array(1 < t ? t - 1 : 0), o = 1;
                        o < t;
                        o++
                      )
                        r[o - 1] = arguments[o];
                      return D.run('union', e, r);
                    },
                    intersection: function (e) {
                      for (
                        var t = arguments.length, r = new Array(1 < t ? t - 1 : 0), o = 1;
                        o < t;
                        o++
                      )
                        r[o - 1] = arguments[o];
                      return D.run('intersection', e, r);
                    },
                    xor: function (e) {
                      for (
                        var t = arguments.length, r = new Array(1 < t ? t - 1 : 0), o = 1;
                        o < t;
                        o++
                      )
                        r[o - 1] = arguments[o];
                      return D.run('xor', e, r);
                    },
                    difference: function (e) {
                      for (
                        var t = arguments.length, r = new Array(1 < t ? t - 1 : 0), o = 1;
                        o < t;
                        o++
                      )
                        r[o - 1] = arguments[o];
                      return D.run('difference', e, r);
                    },
                  };
                }),
                'object' == typeof o && void 0 !== r
                  ? (r.exports = t())
                  : ((e =
                      'undefined' != typeof globalThis ? globalThis : e || self).polygonClipping =
                      t());
            }).call(this);
          }).call(this, e('_process'));
        },
        { _process: 164 },
      ],
      164: [
        function (e, t, r) {
          var o,
            n,
            t = (t.exports = {});
          function i() {
            throw new Error('setTimeout has not been defined');
          }
          function s() {
            throw new Error('clearTimeout has not been defined');
          }
          function a(t) {
            if (o === setTimeout) return setTimeout(t, 0);
            if ((o === i || !o) && setTimeout) return (o = setTimeout), setTimeout(t, 0);
            try {
              return o(t, 0);
            } catch (e) {
              try {
                return o.call(null, t, 0);
              } catch (e) {
                return o.call(this, t, 0);
              }
            }
          }
          !(function () {
            try {
              o = 'function' == typeof setTimeout ? setTimeout : i;
            } catch (e) {
              o = i;
            }
            try {
              n = 'function' == typeof clearTimeout ? clearTimeout : s;
            } catch (e) {
              n = s;
            }
          })();
          var c,
            u = [],
            l = !1,
            p = -1;
          function d() {
            l && c && ((l = !1), c.length ? (u = c.concat(u)) : (p = -1), u.length && h());
          }
          function h() {
            if (!l) {
              var e = a(d);
              l = !0;
              for (var t = u.length; t; ) {
                for (c = u, u = []; ++p < t; ) c && c[p].run();
                (p = -1), (t = u.length);
              }
              (c = null),
                (l = !1),
                (function (t) {
                  if (n === clearTimeout) return clearTimeout(t);
                  if ((n === s || !n) && clearTimeout) return (n = clearTimeout), clearTimeout(t);
                  try {
                    n(t);
                  } catch (e) {
                    try {
                      return n.call(null, t);
                    } catch (e) {
                      return n.call(this, t);
                    }
                  }
                })(e);
            }
          }
          function f(e, t) {
            (this.fun = e), (this.array = t);
          }
          function y() {}
          (t.nextTick = function (e) {
            var t = new Array(arguments.length - 1);
            if (1 < arguments.length)
              for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
            u.push(new f(e, t)), 1 !== u.length || l || a(h);
          }),
            (f.prototype.run = function () {
              this.fun.apply(null, this.array);
            }),
            (t.title = 'browser'),
            (t.browser = !0),
            (t.env = {}),
            (t.argv = []),
            (t.version = ''),
            (t.versions = {}),
            (t.on = y),
            (t.addListener = y),
            (t.once = y),
            (t.off = y),
            (t.removeListener = y),
            (t.removeAllListeners = y),
            (t.emit = y),
            (t.prependListener = y),
            (t.prependOnceListener = y),
            (t.listeners = function (e) {
              return [];
            }),
            (t.binding = function (e) {
              throw new Error('process.binding is not supported');
            }),
            (t.cwd = function () {
              return '/';
            }),
            (t.chdir = function (e) {
              throw new Error('process.chdir is not supported');
            }),
            (t.umask = function () {
              return 0;
            });
        },
        {},
      ],
      165: [
        function (e, t, r) {
          var o, n;
          (o = this),
            (n = function () {
              'use strict';
              function h(e, t, r) {
                var o = e[t];
                (e[t] = e[r]), (e[r] = o);
              }
              function u(e, t) {
                return e < t ? -1 : t < e ? 1 : 0;
              }
              function e(e) {
                void 0 === e && (e = 9),
                  (this._maxEntries = Math.max(4, e)),
                  (this._minEntries = Math.max(2, Math.ceil(0.4 * this._maxEntries))),
                  this.clear();
              }
              function f(e, t) {
                y(e, 0, e.children.length, t, e);
              }
              function y(e, t, r, o, n) {
                ((n = n || _(null)).minX = 1 / 0),
                  (n.minY = 1 / 0),
                  (n.maxX = -1 / 0),
                  (n.maxY = -1 / 0);
                for (var i = t; i < r; i++) {
                  var s = e.children[i];
                  d(n, e.leaf ? o(s) : s);
                }
                return n;
              }
              function d(e, t) {
                return (
                  (e.minX = Math.min(e.minX, t.minX)),
                  (e.minY = Math.min(e.minY, t.minY)),
                  (e.maxX = Math.max(e.maxX, t.maxX)),
                  (e.maxY = Math.max(e.maxY, t.maxY)),
                  e
                );
              }
              function i(e, t) {
                return e.minX - t.minX;
              }
              function s(e, t) {
                return e.minY - t.minY;
              }
              function g(e) {
                return (e.maxX - e.minX) * (e.maxY - e.minY);
              }
              function m(e) {
                return e.maxX - e.minX + (e.maxY - e.minY);
              }
              function l(e, t) {
                return e.minX <= t.minX && e.minY <= t.minY && t.maxX <= e.maxX && t.maxY <= e.maxY;
              }
              function c(e, t) {
                return t.minX <= e.maxX && t.minY <= e.maxY && t.maxX >= e.minX && t.maxY >= e.minY;
              }
              function _(e) {
                return {
                  children: e,
                  height: 1,
                  leaf: !0,
                  minX: 1 / 0,
                  minY: 1 / 0,
                  maxX: -1 / 0,
                  maxY: -1 / 0,
                };
              }
              function v(e, t, r, o, n) {
                for (var i, s, a, c = [t, r]; c.length; )
                  (r = c.pop()) - (t = c.pop()) <= o ||
                    ((i = t + Math.ceil((r - t) / o / 2) * o),
                    (a = n),
                    (function e(t, r, o, n, i) {
                      for (; o < n; ) {
                        var s, a, c, u;
                        600 < n - o &&
                          ((s = n - o + 1),
                          (a = r - o + 1),
                          (u = Math.log(s)),
                          (c = 0.5 * Math.exp((2 * u) / 3)),
                          (u = 0.5 * Math.sqrt((u * c * (s - c)) / s) * (a - s / 2 < 0 ? -1 : 1)),
                          e(
                            t,
                            r,
                            Math.max(o, Math.floor(r - (a * c) / s + u)),
                            Math.min(n, Math.floor(r + ((s - a) * c) / s + u)),
                            i,
                          ));
                        var l = t[r],
                          p = o,
                          d = n;
                        for (h(t, o, r), 0 < i(t[n], l) && h(t, o, n); p < d; ) {
                          for (h(t, p, d), p++, d--; i(t[p], l) < 0; ) p++;
                          for (; 0 < i(t[d], l); ) d--;
                        }
                        0 === i(t[o], l) ? h(t, o, d) : h(t, ++d, n),
                          d <= r && (o = d + 1),
                          r <= d && (n = d - 1);
                      }
                    })((s = e), i, t || 0, r || s.length - 1, a || u),
                    c.push(t, i, i, r));
              }
              return (
                (e.prototype.all = function () {
                  return this._all(this.data, []);
                }),
                (e.prototype.search = function (e) {
                  var t = this.data,
                    r = [];
                  if (!c(e, t)) return r;
                  for (var o = this.toBBox, n = []; t; ) {
                    for (var i = 0; i < t.children.length; i++) {
                      var s = t.children[i],
                        a = t.leaf ? o(s) : s;
                      c(e, a) && (t.leaf ? r.push(s) : l(e, a) ? this._all(s, r) : n.push(s));
                    }
                    t = n.pop();
                  }
                  return r;
                }),
                (e.prototype.collides = function (e) {
                  var t = this.data;
                  if (!c(e, t)) return !1;
                  for (var r = []; t; ) {
                    for (var o = 0; o < t.children.length; o++) {
                      var n = t.children[o],
                        i = t.leaf ? this.toBBox(n) : n;
                      if (c(e, i)) {
                        if (t.leaf || l(e, i)) return !0;
                        r.push(n);
                      }
                    }
                    t = r.pop();
                  }
                  return !1;
                }),
                (e.prototype.load = function (e) {
                  if (!e || !e.length) return this;
                  if (e.length < this._minEntries) {
                    for (var t = 0; t < e.length; t++) this.insert(e[t]);
                    return this;
                  }
                  var r,
                    o = this._build(e.slice(), 0, e.length - 1, 0);
                  return (
                    this.data.children.length
                      ? this.data.height === o.height
                        ? this._splitRoot(this.data, o)
                        : (this.data.height < o.height &&
                            ((r = this.data), (this.data = o), (o = r)),
                          this._insert(o, this.data.height - o.height - 1, !0))
                      : (this.data = o),
                    this
                  );
                }),
                (e.prototype.insert = function (e) {
                  return e && this._insert(e, this.data.height - 1), this;
                }),
                (e.prototype.clear = function () {
                  return (this.data = _([])), this;
                }),
                (e.prototype.remove = function (e, t) {
                  if (!e) return this;
                  for (
                    var r, o, n, i = this.data, s = this.toBBox(e), a = [], c = [];
                    i || a.length;

                  ) {
                    if (
                      (i || ((i = a.pop()), (o = a[a.length - 1]), (r = c.pop()), (n = !0)), i.leaf)
                    ) {
                      var u = (function (e, t, r) {
                        if (!r) return t.indexOf(e);
                        for (var o = 0; o < t.length; o++) if (r(e, t[o])) return o;
                        return -1;
                      })(e, i.children, t);
                      if (-1 !== u)
                        return i.children.splice(u, 1), a.push(i), this._condense(a), this;
                    }
                    n || i.leaf || !l(i, s)
                      ? o
                        ? (r++, (i = o.children[r]), (n = !1))
                        : (i = null)
                      : (a.push(i), c.push(r), (r = 0), (i = (o = i).children[0]));
                  }
                  return this;
                }),
                (e.prototype.toBBox = function (e) {
                  return e;
                }),
                (e.prototype.compareMinX = function (e, t) {
                  return e.minX - t.minX;
                }),
                (e.prototype.compareMinY = function (e, t) {
                  return e.minY - t.minY;
                }),
                (e.prototype.toJSON = function () {
                  return this.data;
                }),
                (e.prototype.fromJSON = function (e) {
                  return (this.data = e), this;
                }),
                (e.prototype._all = function (e, t) {
                  for (var r = []; e; )
                    e.leaf ? t.push.apply(t, e.children) : r.push.apply(r, e.children),
                      (e = r.pop());
                  return t;
                }),
                (e.prototype._build = function (e, t, r, o) {
                  var n,
                    i = r - t + 1,
                    s = this._maxEntries;
                  if (i <= s) return f((n = _(e.slice(t, r + 1))), this.toBBox), n;
                  o ||
                    ((o = Math.ceil(Math.log(i) / Math.log(s))),
                    (s = Math.ceil(i / Math.pow(s, o - 1)))),
                    ((n = _([])).leaf = !1),
                    (n.height = o);
                  var a = Math.ceil(i / s),
                    c = a * Math.ceil(Math.sqrt(s));
                  v(e, t, r, c, this.compareMinX);
                  for (var u = t; u <= r; u += c) {
                    var l = Math.min(u + c - 1, r);
                    v(e, u, l, a, this.compareMinY);
                    for (var p = u; p <= l; p += a) {
                      var d = Math.min(p + a - 1, l);
                      n.children.push(this._build(e, p, d, o - 1));
                    }
                  }
                  return f(n, this.toBBox), n;
                }),
                (e.prototype._chooseSubtree = function (e, t, r, o) {
                  for (; o.push(t), !t.leaf && o.length - 1 !== r; ) {
                    for (var n = 1 / 0, i = 1 / 0, s = void 0, a = 0; a < t.children.length; a++) {
                      var c = t.children[a],
                        u = g(c),
                        l =
                          ((l = e),
                          (p = c),
                          (Math.max(p.maxX, l.maxX) - Math.min(p.minX, l.minX)) *
                            (Math.max(p.maxY, l.maxY) - Math.min(p.minY, l.minY)) -
                            u);
                      l < i
                        ? ((i = l), (n = u < n ? u : n), (s = c))
                        : l === i && u < n && ((n = u), (s = c));
                    }
                    t = s || t.children[0];
                  }
                  var l, p;
                  return t;
                }),
                (e.prototype._insert = function (e, t, r) {
                  var o = r ? e : this.toBBox(e),
                    n = [],
                    r = this._chooseSubtree(o, this.data, t, n);
                  for (
                    r.children.push(e), d(r, o);
                    0 <= t && n[t].children.length > this._maxEntries;

                  )
                    this._split(n, t), t--;
                  this._adjustParentBBoxes(o, n, t);
                }),
                (e.prototype._split = function (e, t) {
                  var r = e[t],
                    o = r.children.length,
                    n = this._minEntries;
                  this._chooseSplitAxis(r, n, o);
                  (o = this._chooseSplitIndex(r, n, o)),
                    (o = _(r.children.splice(o, r.children.length - o)));
                  (o.height = r.height),
                    (o.leaf = r.leaf),
                    f(r, this.toBBox),
                    f(o, this.toBBox),
                    t ? e[t - 1].children.push(o) : this._splitRoot(r, o);
                }),
                (e.prototype._splitRoot = function (e, t) {
                  (this.data = _([e, t])),
                    (this.data.height = e.height + 1),
                    (this.data.leaf = !1),
                    f(this.data, this.toBBox);
                }),
                (e.prototype._chooseSplitIndex = function (e, t, r) {
                  for (var o, n, i, s, a, c, u = 1 / 0, l = 1 / 0, p = t; p <= r - t; p++) {
                    var d = y(e, 0, p, this.toBBox),
                      h = y(e, p, r, this.toBBox),
                      f =
                        ((n = d),
                        (i = h),
                        0,
                        (s = Math.max(n.minX, i.minX)),
                        (f = Math.max(n.minY, i.minY)),
                        (a = Math.min(n.maxX, i.maxX)),
                        (c = Math.min(n.maxY, i.maxY)),
                        Math.max(0, a - s) * Math.max(0, c - f)),
                      h = g(d) + g(h);
                    f < u
                      ? ((u = f), (o = p), (l = h < l ? h : l))
                      : f === u && h < l && ((l = h), (o = p));
                  }
                  return o || r - t;
                }),
                (e.prototype._chooseSplitAxis = function (e, t, r) {
                  var o = e.leaf ? this.compareMinX : i,
                    n = e.leaf ? this.compareMinY : s;
                  this._allDistMargin(e, t, r, o) < this._allDistMargin(e, t, r, n) &&
                    e.children.sort(o);
                }),
                (e.prototype._allDistMargin = function (e, t, r, o) {
                  e.children.sort(o);
                  for (
                    var n = this.toBBox,
                      i = y(e, 0, t, n),
                      s = y(e, r - t, r, n),
                      a = m(i) + m(s),
                      c = t;
                    c < r - t;
                    c++
                  ) {
                    var u = e.children[c];
                    d(i, e.leaf ? n(u) : u), (a += m(i));
                  }
                  for (var l = r - t - 1; t <= l; l--) {
                    var p = e.children[l];
                    d(s, e.leaf ? n(p) : p), (a += m(s));
                  }
                  return a;
                }),
                (e.prototype._adjustParentBBoxes = function (e, t, r) {
                  for (var o = r; 0 <= o; o--) d(t[o], e);
                }),
                (e.prototype._condense = function (e) {
                  for (var t = e.length - 1, r = void 0; 0 <= t; t--)
                    0 === e[t].children.length
                      ? 0 < t
                        ? (r = e[t - 1].children).splice(r.indexOf(e[t]), 1)
                        : this.clear()
                      : f(e[t], this.toBBox);
                }),
                e
              );
            }),
            'object' == typeof r && void 0 !== t
              ? (t.exports = n())
              : ((o = o || self).RBush = n());
        },
        {},
      ],
      166: [
        function (e, t, r) {
          var o;
          (o = this),
            (function (e) {
              'use strict';
              var M = 134217729;
              function L(e, t, r, o, n) {
                let i,
                  s,
                  a,
                  c,
                  u = t[0],
                  l = o[0],
                  p = 0,
                  d = 0;
                l > u == l > -u ? ((i = u), (u = t[++p])) : ((i = l), (l = o[++d]));
                let h = 0;
                if (p < e && d < r)
                  for (
                    l > u == l > -u
                      ? ((a = i - ((s = u + i) - u)), (u = t[++p]))
                      : ((a = i - ((s = l + i) - l)), (l = o[++d])),
                      i = s,
                      0 !== a && (n[h++] = a);
                    p < e && d < r;

                  )
                    l > u == l > -u
                      ? ((a = i - ((s = i + u) - (c = s - i)) + (u - c)), (u = t[++p]))
                      : ((a = i - ((s = i + l) - (c = s - i)) + (l - c)), (l = o[++d])),
                      (i = s),
                      0 !== a && (n[h++] = a);
                for (; p < e; )
                  (a = i - ((s = i + u) - (c = s - i)) + (u - c)),
                    (u = t[++p]),
                    (i = s),
                    0 !== a && (n[h++] = a);
                for (; d < r; )
                  (a = i - ((s = i + l) - (c = s - i)) + (l - c)),
                    (l = o[++d]),
                    (i = s),
                    0 !== a && (n[h++] = a);
                return (0 === i && 0 !== h) || (n[h++] = i), h;
              }
              function t(e) {
                return new Float64Array(e);
              }
              const N = t(4),
                F = t(8),
                R = t(12),
                j = t(16),
                k = t(4);
              (e.orient2d = function (e, t, r, o, n, i) {
                var s = (t - i) * (r - n),
                  a = (e - n) * (o - i),
                  c = s - a;
                if (0 == s || 0 == a || 0 < s != 0 < a) return c;
                a = Math.abs(s + a);
                return Math.abs(c) >= 33306690738754716e-32 * a
                  ? c
                  : -(function (e, t, r, o, n, i, s) {
                      let a, c, u, l, p, d, h, f, y, g, m, _, v, b, E, x, S, w;
                      var I = e - n,
                        T = r - n,
                        C = t - i,
                        O = o - i;
                      (p =
                        (E =
                          (f = I - (h = (d = M * I) - (d - I))) *
                            (g = O - (y = (d = M * O) - (d - O))) -
                          ((b = I * O) - h * y - f * y - h * g)) -
                        (m =
                          E -
                          (S =
                            (f = C - (h = (d = M * C) - (d - C))) *
                              (g = T - (y = (d = M * T) - (d - T))) -
                            ((x = C * T) - h * y - f * y - h * g)))),
                        (N[0] = E - (m + p) + (p - S)),
                        (p = (v = b - ((_ = b + m) - (p = _ - b)) + (m - p)) - (m = v - x)),
                        (N[1] = v - (m + p) + (p - x)),
                        (p = (w = _ + m) - _),
                        (N[2] = _ - (w - p) + (m - p)),
                        (N[3] = w);
                      let P = (function (t) {
                          let r = t[0];
                          for (let e = 1; e < 4; e++) r += t[e];
                          return r;
                        })(N),
                        A = 22204460492503146e-32 * s;
                      if (P >= A || -P >= A) return P;
                      if (
                        ((a = e - (I + (p = e - I)) + (p - n)),
                        (u = r - (T + (p = r - T)) + (p - n)),
                        (c = t - (C + (p = t - C)) + (p - i)),
                        (l = o - (O + (p = o - O)) + (p - i)),
                        0 === a && 0 === c && 0 === u && 0 === l)
                      )
                        return P;
                      if (
                        ((A = 11093356479670487e-47 * s + 33306690738754706e-32 * Math.abs(P)),
                        (P += I * l + O * a - (C * u + T * c)) >= A || -P >= A)
                      )
                        return P;
                      (p =
                        (E =
                          (f = a - (h = (d = M * a) - (d - a))) *
                            (g = O - (y = (d = M * O) - (d - O))) -
                          ((b = a * O) - h * y - f * y - h * g)) -
                        (m =
                          E -
                          (S =
                            (f = c - (h = (d = M * c) - (d - c))) *
                              (g = T - (y = (d = M * T) - (d - T))) -
                            ((x = c * T) - h * y - f * y - h * g)))),
                        (k[0] = E - (m + p) + (p - S)),
                        (p = (v = b - ((_ = b + m) - (p = _ - b)) + (m - p)) - (m = v - x)),
                        (k[1] = v - (m + p) + (p - x)),
                        (p = (w = _ + m) - _),
                        (k[2] = _ - (w - p) + (m - p)),
                        (k[3] = w);
                      T = L(4, N, 4, k, F);
                      (p =
                        (E =
                          (f = I - (h = (d = M * I) - (d - I))) *
                            (g = l - (y = (d = M * l) - (d - l))) -
                          ((b = I * l) - h * y - f * y - h * g)) -
                        (m =
                          E -
                          (S =
                            (f = C - (h = (d = M * C) - (d - C))) *
                              (g = u - (y = (d = M * u) - (d - u))) -
                            ((x = C * u) - h * y - f * y - h * g)))),
                        (k[0] = E - (m + p) + (p - S)),
                        (p = (v = b - ((_ = b + m) - (p = _ - b)) + (m - p)) - (m = v - x)),
                        (k[1] = v - (m + p) + (p - x)),
                        (p = (w = _ + m) - _),
                        (k[2] = _ - (w - p) + (m - p)),
                        (k[3] = w);
                      T = L(T, F, 4, k, R);
                      (p =
                        (E =
                          (f = a - (h = (d = M * a) - (d - a))) *
                            (g = l - (y = (d = M * l) - (d - l))) -
                          ((b = a * l) - h * y - f * y - h * g)) -
                        (m =
                          E -
                          (S =
                            (f = c - (h = (d = M * c) - (d - c))) *
                              (g = u - (y = (d = M * u) - (d - u))) -
                            ((x = c * u) - h * y - f * y - h * g)))),
                        (k[0] = E - (m + p) + (p - S)),
                        (p = (v = b - ((_ = b + m) - (p = _ - b)) + (m - p)) - (m = v - x)),
                        (k[1] = v - (m + p) + (p - x)),
                        (p = (w = _ + m) - _),
                        (k[2] = _ - (w - p) + (m - p)),
                        (k[3] = w);
                      T = L(T, R, 4, k, j);
                      return j[T - 1];
                    })(e, t, r, o, n, i, a);
              }),
                (e.orient2dfast = function (e, t, r, o, n, i) {
                  return (t - i) * (r - n) - (e - n) * (o - i);
                }),
                Object.defineProperty(e, '__esModule', { value: !0 });
            })('object' == typeof r && void 0 !== t ? r : ((o = o || self).predicates = {}));
        },
        {},
      ],
      167: [
        function (e, t, r) {
          var o, n;
          (o = this),
            (n = function () {
              'use strict';
              function e(e, t) {
                if (
                  (void 0 === e && (e = []),
                  void 0 === t && (t = o),
                  (this.data = e),
                  (this.length = this.data.length),
                  (this.compare = t),
                  0 < this.length)
                )
                  for (var r = (this.length >> 1) - 1; 0 <= r; r--) this._down(r);
              }
              function o(e, t) {
                return e < t ? -1 : t < e ? 1 : 0;
              }
              return (
                (e.prototype.push = function (e) {
                  this.data.push(e), this.length++, this._up(this.length - 1);
                }),
                (e.prototype.pop = function () {
                  if (0 !== this.length) {
                    var e = this.data[0],
                      t = this.data.pop();
                    return this.length--, 0 < this.length && ((this.data[0] = t), this._down(0)), e;
                  }
                }),
                (e.prototype.peek = function () {
                  return this.data[0];
                }),
                (e.prototype._up = function (e) {
                  for (var t = this.data, r = this.compare, o = t[e]; 0 < e; ) {
                    var n = (e - 1) >> 1,
                      i = t[n];
                    if (0 <= r(o, i)) break;
                    (t[e] = i), (e = n);
                  }
                  t[e] = o;
                }),
                (e.prototype._down = function (e) {
                  for (
                    var t = this.data, r = this.compare, o = this.length >> 1, n = t[e];
                    e < o;

                  ) {
                    var i = 1 + (e << 1),
                      s = t[i],
                      a = i + 1;
                    if ((a < this.length && r(t[a], s) < 0 && (s = t[(i = a)]), 0 <= r(s, n)))
                      break;
                    (t[e] = s), (e = i);
                  }
                  t[e] = n;
                }),
                e
              );
            }),
            'object' == typeof r && void 0 !== t
              ? (t.exports = n())
              : ((o = o || self).TinyQueue = n());
        },
        {},
      ],
      168: [
        function (e, t, r) {
          var n = (t.exports = function (e) {
            return new i(e);
          });
          function i(e) {
            this.value = e;
          }
          function o(e, a, c) {
            var u = [],
              l = [],
              p = !0;
            return (function o(t) {
              var e = c ? d(t) : t,
                n = {},
                r = !0,
                i = {
                  node: e,
                  node_: t,
                  path: [].concat(u),
                  parent: l[l.length - 1],
                  parents: l,
                  key: u.slice(-1)[0],
                  isRoot: 0 === u.length,
                  level: u.length,
                  circular: null,
                  update: function (e, t) {
                    i.isRoot || (i.parent.node[i.key] = e), (i.node = e), t && (r = !1);
                  },
                  delete: function (e) {
                    delete i.parent.node[i.key], e && (r = !1);
                  },
                  remove: function (e) {
                    f(i.parent.node) ? i.parent.node.splice(i.key, 1) : delete i.parent.node[i.key],
                      e && (r = !1);
                  },
                  keys: null,
                  before: function (e) {
                    n.before = e;
                  },
                  after: function (e) {
                    n.after = e;
                  },
                  pre: function (e) {
                    n.pre = e;
                  },
                  post: function (e) {
                    n.post = e;
                  },
                  stop: function () {
                    p = !1;
                  },
                  block: function () {
                    r = !1;
                  },
                };
              if (!p) return i;
              function s() {
                if ('object' == typeof i.node && null !== i.node) {
                  (i.keys && i.node_ === i.node) || (i.keys = h(i.node)),
                    (i.isLeaf = 0 == i.keys.length);
                  for (var e = 0; e < l.length; e++)
                    if (l[e].node_ === t) {
                      i.circular = l[e];
                      break;
                    }
                } else (i.isLeaf = !0), (i.keys = null);
                (i.notLeaf = !i.isLeaf), (i.notRoot = !i.isRoot);
              }
              s();
              e = a.call(i, i.node);
              return (
                void 0 !== e && i.update && i.update(e),
                n.before && n.before.call(i, i.node),
                r &&
                  ('object' != typeof i.node ||
                    null === i.node ||
                    i.circular ||
                    (l.push(i),
                    s(),
                    y(i.keys, function (e, t) {
                      u.push(e), n.pre && n.pre.call(i, i.node[e], e);
                      var r = o(i.node[e]);
                      c && g.call(i.node, e) && (i.node[e] = r.node),
                        (r.isLast = t == i.keys.length - 1),
                        (r.isFirst = 0 == t),
                        n.post && n.post.call(i, r),
                        u.pop();
                    }),
                    l.pop()),
                  n.after && n.after.call(i, i.node)),
                i
              );
            })(e).node;
          }
          function d(t) {
            if ('object' != typeof t || null === t) return t;
            var e,
              r,
              o = f(t)
                ? []
                : '[object Date]' === s(t)
                ? new Date(t.getTime ? t.getTime() : t)
                : '[object RegExp]' === s(t)
                ? new RegExp(t)
                : '[object Error]' === s(t)
                ? { message: t.message }
                : '[object Boolean]' === s(t)
                ? new Boolean(t)
                : '[object Number]' === s(t)
                ? new Number(t)
                : '[object String]' === s(t)
                ? new String(t)
                : Object.create && Object.getPrototypeOf
                ? Object.create(Object.getPrototypeOf(t))
                : t.constructor === Object
                ? {}
                : ((e = (t.constructor && t.constructor.prototype) || t.__proto__ || {}),
                  ((r = function () {}).prototype = e),
                  new r());
            return (
              y(h(t), function (e) {
                o[e] = t[e];
              }),
              o
            );
          }
          (i.prototype.get = function (e) {
            for (var t = this.value, r = 0; r < e.length; r++) {
              var o = e[r];
              if (!t || !g.call(t, o)) {
                t = void 0;
                break;
              }
              t = t[o];
            }
            return t;
          }),
            (i.prototype.has = function (e) {
              for (var t = this.value, r = 0; r < e.length; r++) {
                var o = e[r];
                if (!t || !g.call(t, o)) return !1;
                t = t[o];
              }
              return !0;
            }),
            (i.prototype.set = function (e, t) {
              for (var r = this.value, o = 0; o < e.length - 1; o++) {
                var n = e[o];
                g.call(r, n) || (r[n] = {}), (r = r[n]);
              }
              return (r[e[o]] = t);
            }),
            (i.prototype.map = function (e) {
              return o(this.value, e, !0);
            }),
            (i.prototype.forEach = function (e) {
              return (this.value = o(this.value, e, !1)), this.value;
            }),
            (i.prototype.reduce = function (t, e) {
              var r = 1 === arguments.length,
                o = r ? this.value : e;
              return (
                this.forEach(function (e) {
                  (this.isRoot && r) || (o = t.call(this, o, e));
                }),
                o
              );
            }),
            (i.prototype.paths = function () {
              var t = [];
              return (
                this.forEach(function (e) {
                  t.push(this.path);
                }),
                t
              );
            }),
            (i.prototype.nodes = function () {
              var t = [];
              return (
                this.forEach(function (e) {
                  t.push(this.node);
                }),
                t
              );
            }),
            (i.prototype.clone = function () {
              var n = [],
                i = [];
              return (function t(r) {
                for (var e = 0; e < n.length; e++) if (n[e] === r) return i[e];
                if ('object' != typeof r || null === r) return r;
                var o = d(r);
                return (
                  n.push(r),
                  i.push(o),
                  y(h(r), function (e) {
                    o[e] = t(r[e]);
                  }),
                  n.pop(),
                  i.pop(),
                  o
                );
              })(this.value);
            });
          var h =
            Object.keys ||
            function (e) {
              var t,
                r = [];
              for (t in e) r.push(t);
              return r;
            };
          function s(e) {
            return Object.prototype.toString.call(e);
          }
          var f =
              Array.isArray ||
              function (e) {
                return '[object Array]' === Object.prototype.toString.call(e);
              },
            y = function (e, t) {
              if (e.forEach) return e.forEach(t);
              for (var r = 0; r < e.length; r++) t(e[r], r, e);
            };
          y(h(i.prototype), function (o) {
            n[o] = function (e) {
              var t = [].slice.call(arguments, 1),
                r = new i(e);
              return r[o].apply(r, t);
            };
          });
          var g =
            Object.hasOwnProperty ||
            function (e, t) {
              return t in e;
            };
        },
        {},
      ],
      169: [
        function (e, t, r) {
          (t.exports.RADIUS = 6378137),
            (t.exports.FLATTENING = 1 / 298.257223563),
            (t.exports.POLAR_RADIUS = 6356752.3142);
        },
        {},
      ],
      170: [
        function (e, t, r) {
          t.exports = function () {
            for (var e = {}, t = 0; t < arguments.length; t++) {
              var r,
                o = arguments[t];
              for (r in o) n.call(o, r) && (e[r] = o[r]);
            }
            return e;
          };
          var n = Object.prototype.hasOwnProperty;
        },
        {},
      ],
      171: [
        function (e, t, r) {
          'use strict';
          var o = e('lodash.isequal'),
            n = e('@mapbox/geojson-normalize'),
            i = e('./third_party/hat/index'),
            s = e('./lib/features_at'),
            a = e('./lib/string_sets_are_equal'),
            l = e('@mapbox/geojsonhint'),
            p = e('./constants'),
            d = e('./lib/string_set'),
            h = e('./lib/change_style_property'),
            f = {
              Polygon: e('./feature_types/polygon'),
              LineString: e('./feature_types/line_string'),
              Point: e('./feature_types/point'),
              MultiPolygon: e('./feature_types/multi_feature'),
              MultiLineString: e('./feature_types/multi_feature'),
              MultiPoint: e('./feature_types/multi_feature'),
            };
          t.exports = function (c, u) {
            return (
              (u.modes = p.modes),
              (u.getFeatureIdsAt = function (e) {
                return s.click({ point: e }, null, c).map(function (e) {
                  return e.properties.id;
                });
              }),
              (u.getSelectedIds = function () {
                return c.store.getSelectedIds();
              }),
              (u.getSelected = function () {
                return {
                  type: p.geojsonTypes.FEATURE_COLLECTION,
                  features: c.store
                    .getSelectedIds()
                    .map(function (e) {
                      return c.store.get(e);
                    })
                    .map(function (e) {
                      return e.toGeoJSON();
                    }),
                };
              }),
              (u.getSelectedPoints = function () {
                return {
                  type: p.geojsonTypes.FEATURE_COLLECTION,
                  features: c.store.getSelectedCoordinates().map(function (e) {
                    return {
                      type: p.geojsonTypes.FEATURE,
                      properties: {},
                      geometry: { type: p.geojsonTypes.POINT, coordinates: e.coordinates },
                    };
                  }),
                };
              }),
              (u.set = function (e) {
                if (
                  void 0 === e.type ||
                  e.type !== p.geojsonTypes.FEATURE_COLLECTION ||
                  !Array.isArray(e.features)
                )
                  throw new Error('Invalid FeatureCollection');
                var t = c.store.createRenderBatch(),
                  r = c.store.getAllIds().slice(),
                  e = u.add(e),
                  o = new d(e);
                return (
                  (r = r.filter(function (e) {
                    return !o.has(e);
                  })).length && u.delete(r),
                  t(),
                  e
                );
              }),
              (u.add = function (e) {
                var t = l.hint(e, { precisionWarning: !1 }).filter(function (e) {
                  return 'message' !== e.level && void 0 !== e.line;
                });
                if (t.length) throw new Error(t[0].message);
                e = JSON.parse(JSON.stringify(n(e))).features.map(function (e) {
                  if (((e.id = e.id || i()), null === e.geometry))
                    throw new Error('Invalid geometry: null');
                  if (void 0 === c.store.get(e.id) || c.store.get(e.id).type !== e.geometry.type) {
                    var t = f[e.geometry.type];
                    if (void 0 === t)
                      throw new Error('Invalid geometry type: ' + e.geometry.type + '.');
                    t = new t(c, e);
                    c.store.add(t);
                  } else {
                    t = c.store.get(e.id);
                    (t.properties = e.properties),
                      o(t.getCoordinates(), e.geometry.coordinates) ||
                        t.incomingCoords(e.geometry.coordinates);
                  }
                  return e.id;
                });
                return c.store.render(), e;
              }),
              (u.get = function (e) {
                e = c.store.get(e);
                if (e) return e.toGeoJSON();
              }),
              (u.getAll = function () {
                return {
                  type: p.geojsonTypes.FEATURE_COLLECTION,
                  features: c.store.getAll().map(function (e) {
                    return e.toGeoJSON();
                  }),
                };
              }),
              (u.delete = function (e) {
                return (
                  c.store.delete(e, { silent: !0 }),
                  u.getMode() !== p.modes.DIRECT_SELECT || c.store.getSelectedIds().length
                    ? c.store.render()
                    : c.events.changeMode(p.modes.SIMPLE_SELECT, void 0, { silent: !0 }),
                  u
                );
              }),
              (u.deleteAll = function () {
                return (
                  c.store.delete(c.store.getAllIds(), { silent: !0 }),
                  u.getMode() === p.modes.DIRECT_SELECT
                    ? c.events.changeMode(p.modes.SIMPLE_SELECT, void 0, { silent: !0 })
                    : c.store.render(),
                  u
                );
              }),
              (u.changeMode = function (e) {
                var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
                return (
                  !1 == !!c.options.drawEnabled ||
                    (e === p.modes.SIMPLE_SELECT && u.getMode() === p.modes.SIMPLE_SELECT
                      ? a(t.featureIds || [], c.store.getSelectedIds()) ||
                        (c.store.setSelected(t.featureIds, { silent: !0 }), c.store.render())
                      : (e === p.modes.DIRECT_SELECT &&
                          u.getMode() === p.modes.DIRECT_SELECT &&
                          t.featureId === c.store.getSelectedIds()[0]) ||
                        c.events.changeMode(e, t, { silent: !0 })),
                  u
                );
              }),
              (u.getMode = function () {
                return c.events.getMode();
              }),
              (u.trash = function () {
                return c.events.trash({ silent: !0 }), u;
              }),
              (u.combineFeatures = function () {
                return c.events.combineFeatures({ silent: !0 }), u;
              }),
              (u.uncombineFeatures = function () {
                return c.events.uncombineFeatures({ silent: !0 }), u;
              }),
              (u.unionPolygon = function () {
                return c.events.unionPolygon({ silent: !0 }), u;
              }),
              (u.unionLine = function () {
                return c.events.unionLine({ silent: !0 }), u;
              }),
              (u.splitLine = function () {
                return c.events.splitLine({ silent: !0 }), u;
              }),
              (u.curveLine = function () {
                return c.events.curveLine({ silent: !0 }), u;
              }),
              (u.parallelLine = function (e) {
                return c.events.parallelLine(e), u;
              }),
              (u.curveFeature = function () {
                return c.events.curveFeature({ silent: !0 }), u;
              }),
              (u.cloneFeature = function () {
                return c.events.cloneFeature({ silent: !0 }), u;
              }),
              (u.setFeatureProperty = function (e, t, r, o) {
                return c.store.setFeatureProperty(e, t, r), o && c.store.render(), u;
              }),
              (u.setCustomStyle = function () {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
                  t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
                  r = void 0 !== t.featureIds ? t.featureIds : c.store.getSelectedIds();
                if (!Array.isArray(r)) throw new Error('Invalid featureIds');
                if (0 < r.length) {
                  for (
                    var o = r
                        .map(function (e) {
                          return c.store.get(e);
                        })
                        .map(function (e) {
                          return e.toGeoJSON();
                        }),
                      n = 0,
                      i = r.length;
                    n < i;
                    n++
                  ) {
                    var s = r[n],
                      a = c.store.get(s);
                    h.setStyleProperties(a, e), c.store.featureChanged(s);
                  }
                  c.store.render(),
                    c.map.fire(p.events.UPDATE, {
                      action: p.updateActions.CHANGE_PROPERTIES,
                      prevFeatures: o,
                      features: r
                        .map(function (e) {
                          return c.store.get(e);
                        })
                        .map(function (e) {
                          return e.toGeoJSON();
                        }),
                    }),
                    (void 0 !== t.cancelSelected && !t.cancelSelected && 1) ||
                      c.events.changeMode(p.modes.SIMPLE_SELECT, void 0, { silent: !0 });
                }
                return u;
              }),
              (u.cancelCustomStyle = function () {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
                  t = void 0 !== e.featureIds ? e.featureIds : c.store.getSelectedIds();
                if (!Array.isArray(t)) throw new Error('Invalid featureIds');
                if (0 < t.length) {
                  for (
                    var r = t
                        .map(function (e) {
                          return c.store.get(e);
                        })
                        .map(function (e) {
                          return e.toGeoJSON();
                        }),
                      o = 0,
                      n = t.length;
                    o < n;
                    o++
                  ) {
                    var i = t[o],
                      s = c.store.get(i);
                    h.deleteAllStyleProperties(s), c.store.featureChanged(i);
                  }
                  c.store.render(),
                    c.map.fire(p.events.UPDATE, {
                      action: p.updateActions.CHANGE_PROPERTIES,
                      prevFeatures: r,
                      features: t
                        .map(function (e) {
                          return c.store.get(e);
                        })
                        .map(function (e) {
                          return e.toGeoJSON();
                        }),
                    }),
                    (void 0 !== e.cancelSelected && !e.cancelSelected && 1) ||
                      c.events.changeMode(p.modes.SIMPLE_SELECT, void 0, { silent: !0 });
                }
                return u;
              }),
              u
            );
          };
        },
        {
          './constants': 172,
          './feature_types/line_string': 197,
          './feature_types/multi_feature': 198,
          './feature_types/point': 203,
          './feature_types/polygon': 204,
          './lib/change_style_property': 210,
          './lib/features_at': 219,
          './lib/string_set': 229,
          './lib/string_sets_are_equal': 230,
          './third_party/hat/index': 266,
          '@mapbox/geojson-normalize': 6,
          '@mapbox/geojsonhint': 7,
          'lodash.isequal': 50,
        },
      ],
      172: [
        function (e, t, r) {
          'use strict';
          t.exports = {
            classes: {
              CONTROL_BASE: 'minemap-ctrl',
              CONTROL_PREFIX: 'minemap-ctrl-',
              CONTROL_BUTTON: 'minemap-draw_ctrl-draw-btn',
              CONTROL_BUTTON_LINE: 'minemap-draw_line',
              CONTROL_BUTTON_POLYGON: 'minemap-draw_polygon',
              CONTROL_BUTTON_POINT: 'minemap-draw_point',
              CONTROL_BUTTON_TRASH: 'minemap-draw_trash',
              CONTROL_BUTTON_COMBINE_FEATURES: 'minemap-draw_combine',
              CONTROL_BUTTON_UNCOMBINE_FEATURES: 'minemap-draw_uncombine',
              CONTROL_GROUP: 'minemap-ctrl-group',
              ATTRIBUTION: 'minemap-ctrl-attrib',
              ACTIVE_BUTTON: 'active',
              BOX_SELECT: 'minemap-draw_boxselect',
            },
            sources: {
              HOT: 'minemap-draw-hot',
              COLD: 'minemap-draw-cold',
              POLYGON_LINE_COLD: 'minemap-draw-polygon-line-cold',
              POLYGON_LINE_HOT: 'minemap-draw-polygon-line-hot',
            },
            cursors: { ADD: 'add', MOVE: 'move', DRAG: 'drag', POINTER: 'pointer', NONE: 'none' },
            types: {
              POLYGON: 'polygon',
              LINE: 'line_string',
              POINT: 'point',
              CIRCLE: 'circle',
              RECTANGLE: 'rectangle',
              TRIANGLE: 'triangle',
              SECTOR: 'sector',
              ELLIPSE: 'ellipse',
              ARC: 'arc',
              LINE_ARROW: 'line_arrow',
              THIN_STRAIGHT_ARROW: 'thin_straight_arrow',
              THIN_TAIL_ARROW: 'thin_tail_arrow',
              ATTACK_ARROW: 'attack_arrow',
              OFFENSIVE_ARROW: 'offensive_arrow',
              OFFENSIVE_TAIL_ARROW: 'offensive_tail_arrow',
              PINCER_ATTACK_ARROW: 'pincer_attack_arrow',
              CURVE_POLYGON: 'curve_polygon',
            },
            geojsonTypes: {
              FEATURE: 'Feature',
              POLYGON: 'Polygon',
              LINE_STRING: 'LineString',
              POINT: 'Point',
              FEATURE_COLLECTION: 'FeatureCollection',
              MULTI_PREFIX: 'Multi',
              MULTI_POINT: 'MultiPoint',
              MULTI_LINE_STRING: 'MultiLineString',
              MULTI_POLYGON: 'MultiPolygon',
            },
            modes: {
              DRAW_LINE_STRING: 'draw_line_string',
              DRAW_POLYGON: 'draw_polygon',
              DRAW_CIRCLE: 'draw_circle',
              DRAW_RECTANGLE: 'draw_rectangle',
              DRAW_TRIANGLE: 'draw_triangle',
              DRAW_SECTOR: 'draw_sector',
              DRAW_ELLIPSE: 'draw_ellipse',
              DRAW_ARC: 'draw_arc',
              DRAW_ICON: 'draw_icon',
              DRAW_POINT: 'draw_point',
              SPLIT_POLYGON: 'split_polygon',
              SIMPLE_SELECT: 'simple_select',
              DIRECT_SELECT: 'direct_select',
              FREE_DRAWING: 'free_drawing',
              DRAW_LINE_ARROW: 'draw_line_arrow',
              DRAW_THIN_STRAIGHT_ARROW: 'draw_thin_straight_arrow',
              DRAW_THIN_TAIL_ARROW: 'draw_thin_tail_arrow',
              DRAW_ATTACK_ARROW: 'draw_attack_arrow',
              DRAW_OFFENSIVE_ARROW: 'draw_offensive_arrow',
              DRAW_OFFENSIVE_TAIL_ARROW: 'draw_offensive_tail_arrow',
              DRAW_PINCER_ATTACK_ARROW: 'draw_pincer_attack_arrow',
              DRAW_CURVE_POLYGON: 'draw_curve_polygon',
              DRAW_PARALLEL_POLYGON: 'draw_parallel_polygon',
              DRAW_TEXT: 'draw_text',
              STATIC: 'static',
            },
            events: {
              CREATE: 'draw.create',
              DELETE: 'draw.delete',
              UPDATE: 'draw.update',
              SELECTION_CHANGE: 'draw.selectionchange',
              SELECTION_MOVE_CHANGE: 'draw.selectmovechange',
              MODE_CHANGE: 'draw.modechange',
              ACTIONABLE: 'draw.actionable',
              RENDER: 'draw.render',
              COMBINE_FEATURES: 'draw.combine',
              UNCOMBINE_FEATURES: 'draw.uncombine',
              REPLACE: 'draw.replace',
              RECORD_CREATE: 'edit.record.create',
              UNDO: 'edit.undo',
              REDO: 'edit.redo',
              SELECTED: 'edit.selected',
              UNSELECTED: 'edit.unselected',
            },
            updateActions: {
              MOVE: 'move',
              CHANGE_COORDINATES: 'change_coordinates',
              CHANGE_PROPERTIES: 'change_properties',
            },
            meta: { FEATURE: 'feature', MIDPOINT: 'midpoint', VERTEX: 'vertex' },
            activeStates: { ACTIVE: 'true', INACTIVE: 'false' },
            customStyle: { OPEN: 'true', CLOSE: 'false' },
            interactions: [
              'scrollZoom',
              'boxZoom',
              'dragRotate',
              'dragPan',
              'keyboard',
              'doubleClickZoom',
              'touchZoomRotate',
            ],
            LAT_MIN: -90,
            LAT_RENDERED_MIN: -85,
            LAT_MAX: 90,
            LAT_RENDERED_MAX: 85,
            LNG_MIN: -270,
            LNG_MAX: 270,
            MAXZOOM: 22,
            MINZOOM: 1,
          };
        },
        {},
      ],
      173: [
        function (e, t, r) {
          'use strict';
          var n = e('../constants');
          t.exports = function (e, t, r) {
            var o = 2 < arguments.length && void 0 !== r ? r : {};
            if (!1 != !!e.draw.options.drawEnabled)
              switch (t) {
                case 'text':
                  e.draw && e.draw.changeMode(n.modes.DRAW_TEXT, o);
                  break;
                case 'icon':
                  e.draw && e.draw.changeMode(n.modes.DRAW_ICON, o);
                  break;
                case 'point':
                  e.draw && e.draw.changeMode(n.modes.DRAW_POINT, o);
                  break;
                case 'line':
                  e.draw && e.draw.changeMode(n.modes.DRAW_LINE_STRING, o);
                  break;
                case 'polygon':
                  e.draw && e.draw.changeMode(n.modes.DRAW_POLYGON, o);
                  break;
                case 'rectangle':
                  e.draw && e.draw.changeMode(n.modes.DRAW_RECTANGLE, o);
                  break;
                case 'triangle':
                  e.draw && e.draw.changeMode(n.modes.DRAW_TRIANGLE, o);
                  break;
                case 'circle':
                  e.draw && e.draw.changeMode(n.modes.DRAW_CIRCLE, o);
                  break;
                case 'sector':
                  e.draw && e.draw.changeMode(n.modes.DRAW_SECTOR, o);
                  break;
                case 'ellipse':
                  e.draw && e.draw.changeMode(n.modes.DRAW_ELLIPSE, o);
                  break;
                case 'arc':
                  e.draw && e.draw.changeMode(n.modes.DRAW_ARC, o);
                  break;
                case 'parallel_polygon':
                  e.draw && e.draw.changeMode(n.modes.DRAW_PARALLEL_POLYGON, o);
                  break;
                case 'trash':
                  e.draw && e.draw.trash();
                  break;
                case 'combine':
                  e.draw && e.draw.combineFeatures();
                  break;
                case 'uncombine':
                  e.draw && e.draw.uncombineFeatures();
                  break;
                case 'union_polygon':
                  e.draw && e.draw.unionPolygon();
                  break;
                case 'split_polygon':
                  e.draw && e.draw.changeMode(n.modes.SPLIT_POLYGON, o);
                  break;
                case 'union_line':
                  e.draw && e.draw.unionLine();
                  break;
                case 'split_line':
                  e.draw && e.draw.splitLine();
                  break;
                case 'curve_line':
                  e.draw && e.draw.curveLine();
                  break;
                case 'parallel_line':
                  e.draw && e.draw.parallelLine(o);
                  break;
                case 'free_drawing':
                  e.draw && e.draw.changeMode(n.modes.FREE_DRAWING, o);
                  break;
                case 'line_arrow':
                  e.draw && e.draw.changeMode(n.modes.DRAW_LINE_ARROW, o);
                  break;
                case 'thin_straight_arrow':
                  e.draw && e.draw.changeMode(n.modes.DRAW_THIN_STRAIGHT_ARROW, o);
                  break;
                case 'thin_tail_arrow':
                  e.draw && e.draw.changeMode(n.modes.DRAW_THIN_TAIL_ARROW, o);
                  break;
                case 'attack_arrow':
                  e.draw && e.draw.changeMode(n.modes.DRAW_ATTACK_ARROW, o);
                  break;
                case 'offensive_arrow':
                  e.draw && e.draw.changeMode(n.modes.DRAW_OFFENSIVE_ARROW, o);
                  break;
                case 'offensive_tail_arrow':
                  e.draw && e.draw.changeMode(n.modes.DRAW_OFFENSIVE_TAIL_ARROW, o);
                  break;
                case 'pincer_attack_arrow':
                  e.draw && e.draw.changeMode(n.modes.DRAW_PINCER_ATTACK_ARROW, o);
                  break;
                case 'curve_polygon':
                  e.draw && e.draw.changeMode(n.modes.DRAW_CURVE_POLYGON, o);
                  break;
                case 'curve_feature':
                  e.draw && e.draw.curveFeature();
                  break;
                case 'clone_feature':
                  e.draw && e.draw.cloneFeature();
                  break;
                case 'undo':
                  e.event && e.event.undoHistory();
                  break;
                case 'redo':
                  e.event && e.event.redoHistory();
                  break;
                case 'static':
                  e.draw && e.draw.changeMode(n.modes.STATIC);
              }
          };
        },
        { '../constants': 172 },
      ],
      174: [
        function (e, t, r) {
          'use strict';
          var o = e('../setup'),
            n = e('../options'),
            i = e('../api'),
            s = e('../constants');
          t.exports = function (e) {
            var t, r;
            (r = this),
              (e = { options: (t = n((t = e))) }),
              (r = i(e, r)),
              (e.api = r),
              (e = o(e)),
              (r.onAdd = e.onAdd),
              (r.onRemove = e.onRemove),
              (r.types = s.types),
              (r.options = t);
          };
        },
        { '../api': 171, '../constants': 172, '../options': 262, '../setup': 264 },
      ],
      175: [
        function (e, t, r) {
          'use strict';
          var l = function (e, t) {
              if (Array.isArray(e)) return e;
              if (Symbol.iterator in Object(e))
                return (function (e, t) {
                  var r = [],
                    o = !0,
                    n = !1,
                    i = void 0;
                  try {
                    for (
                      var s, a = e[Symbol.iterator]();
                      !(o = (s = a.next()).done) && (r.push(s.value), !t || r.length !== t);
                      o = !0
                    );
                  } catch (e) {
                    (n = !0), (i = e);
                  } finally {
                    try {
                      !o && a.return && a.return();
                    } finally {
                      if (n) throw i;
                    }
                  }
                  return r;
                })(e, t);
              throw new TypeError('Invalid attempt to destructure non-iterable instance');
            },
            n = e('xtend'),
            i = e('./draw'),
            s = e('./events'),
            a = e('./history/history'),
            c = e('../constants'),
            p = e('./btn_ctrl');
          t.exports = function (u) {
            (u.map = null),
              (u.options = {}),
              (u.controlPosition = void 0),
              (u.events = null),
              (u.draw = null),
              (u.history = null),
              (u.container = null);
            function o() {
              return {
                options: u.options || {},
                controlPosition: u.controlPosition || void 0,
                draw: (e = u.draw)
                  ? n({
                      add: e.add,
                      get: e.get,
                      getFeatureIdsAt: e.getFeatureIdsAt,
                      getSelectedIds: e.getSelectedIds,
                      getSelected: e.getSelected,
                      getSelectedPoints: e.getSelectedPoints,
                      getAll: e.getAll,
                      delete: e.delete,
                      deleteAll: e.deleteAll,
                      set: e.set,
                      trash: e.trash,
                    })
                  : null,
              };
              var e;
            }
            return {
              init: function (e, t, r) {
                r = 2 < arguments.length && void 0 !== r ? r : void 0;
                return (
                  (u.draw = new i(t)),
                  (u.map = e),
                  u.map.addControl(u.draw, r),
                  (u.options = t),
                  (u.controlPosition = r),
                  (u.container = e.getContainer()),
                  u.history && (u.history = null),
                  u.event && (u.event.removeEventListeners(), (u.event = null)),
                  (u.history = new a()),
                  (u.event = new s(u.draw, u.map, u.history, u.container)),
                  u.event.addEventListeners(),
                  o()
                );
              },
              setOptions: function (e) {
                return (
                  u.draw && u.map && (u.map.removeControl(u.draw), (u.draw = null)),
                  (u.draw = new i(e)),
                  u.map.addControl(u.draw, u.controlPosition),
                  (u.options = e),
                  u.history && (u.history = null),
                  u.event && (u.event.removeEventListeners(), (u.event = null)),
                  (u.history = new a()),
                  (u.event = new s(u.draw, u.map, u.history, u.container)),
                  u.event.addEventListeners(),
                  o()
                );
              },
              dispose: function () {
                return (
                  u.draw && u.map && (u.map.removeControl(u.draw), (u.draw = null)),
                  u.history && (u.history = null),
                  u.event && (u.event.removeEventListeners(), (u.event = null)),
                  delete u.map,
                  delete u.options,
                  delete u.controlPosition,
                  delete u.history,
                  delete u.event,
                  delete u.draw,
                  delete u.container,
                  o()
                );
              },
              undoOperation: function () {
                u.event && u.event.undoHistory();
              },
              redoOperation: function () {
                u.event && u.event.redoHistory();
              },
              setFeatures: function (e) {
                return u.draw.changeMode(c.modes.SIMPLE_SELECT), u.draw.set(e);
              },
              removeFeatures: function (e) {
                if (!Array.isArray(e)) throw new Error('Invalid featureIds');
                if (0 === e.length) throw new Error('featureIds不能为空');
                return (
                  u.draw.changeMode(c.modes.SIMPLE_SELECT, { featureIds: e }), u.draw.trash(), e
                );
              },
              setSelected: function (e) {
                if (!Array.isArray(e)) throw new Error('Invalid featureIds');
                return u.draw.changeMode(c.modes.SIMPLE_SELECT, { featureIds: e }), e;
              },
              setFeatureProperties: function (e, t) {
                var r = 1 < arguments.length && void 0 !== t ? t : {},
                  o = !0,
                  n = !1,
                  i = void 0;
                try {
                  for (
                    var s = Object.entries(r)[Symbol.iterator]();
                    !(o = (c = s.next()).done);
                    o = !0
                  ) {
                    var a = l(c.value, 2),
                      c = a[0],
                      a = a[1];
                    u.draw.setFeatureProperty(e, c, a);
                  }
                } catch (e) {
                  (n = !0), (i = e);
                } finally {
                  try {
                    !o && s.return && s.return();
                  } finally {
                    if (n) throw i;
                  }
                }
                return u.draw.get(e);
              },
              setFeaturePropertiesByIds: function (e, t) {
                var a = 1 < arguments.length && void 0 !== t ? t : {};
                if (!Array.isArray(e)) throw new Error('Invalid featureIds');
                e.forEach(function (e) {
                  var t = !0,
                    r = !1,
                    o = void 0;
                  try {
                    for (
                      var n = Object.entries(a)[Symbol.iterator]();
                      !(t = (s = n.next()).done);
                      t = !0
                    ) {
                      var i = l(s.value, 2),
                        s = i[0],
                        i = i[1];
                      u.draw.setFeatureProperty(e, s, i, !0);
                    }
                  } catch (e) {
                    (r = !0), (o = e);
                  } finally {
                    try {
                      !t && n.return && n.return();
                    } finally {
                      if (r) throw o;
                    }
                  }
                });
              },
              setLockByIds: function (e, t) {
                var r = !(1 < arguments.length && void 0 !== t) || t;
                if (!Array.isArray(e)) throw new Error('Invalid featureIds');
                e.forEach(function (e) {
                  u.draw.setFeatureProperty(e, 'isLock', r);
                });
              },
              getAllHistoryRecords: function () {
                return u.history ? u.history.getAllRecords() : [];
              },
              clearHistoryRecords: function () {
                u.history && u.history.clear();
              },
              setCustomStyle: function (e, t) {
                u.draw && u.draw.setCustomStyle(e, t);
              },
              cancelCustomStyle: function (e) {
                u.draw && u.draw.cancelCustomStyle(e);
              },
              onBtnCtrlActive: function (e, t) {
                p(u, e, t);
              },
              isDrawEnabled: function () {
                return u.draw && !!u.draw.options.drawEnabled;
              },
              disableDraw: function () {
                u.draw && (u.draw.options.drawEnabled = !1);
              },
              enableDraw: function () {
                u.draw && (u.draw.options.drawEnabled = !0);
              },
              isAdsorbEnabled: function () {
                return u.draw && !!u.draw.options.adsorbEnabled;
              },
              disableAdsorb: function () {
                u.draw && (u.draw.options.adsorbEnabled = !1);
              },
              enableAdsorb: function () {
                u.draw && (u.draw.options.adsorbEnabled = !0);
              },
            };
          };
        },
        {
          '../constants': 172,
          './btn_ctrl': 173,
          './draw': 174,
          './events': 176,
          './history/history': 177,
          xtend: 170,
        },
      ],
      176: [
        function (e, t, r) {
          'use strict';
          function i(e, t, r) {
            return (
              t in e
                ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (e[t] = r),
              e
            );
          }
          var l = e('../constants'),
            p = e('xtend'),
            s = e('./history/record');
          t.exports = function (a, c, u, e) {
            var t,
              r = {
                type:
                  (i((t = {}), l.events.DELETE, 1),
                  i(t, l.events.UPDATE, 2),
                  i(t, l.events.CREATE, 3),
                  i(t, l.events.REPLACE, 4),
                  t),
                action:
                  (i((t = {}), l.updateActions.MOVE, 1),
                  i(t, l.updateActions.CHANGE_COORDINATES, 2),
                  i(t, l.updateActions.CHANGE_PROPERTIES, 3),
                  t),
              },
              o = {
                onDrawCreate: function (e) {
                  e = new s(3, 0, e.features);
                  u.addRecord(e), c.fire(l.events.RECORD_CREATE, { record: e });
                },
                onDrawUpdate: function (e) {
                  e = new s(2, r.action[e.action] || 0, e.features, e.prevFeatures);
                  u.addRecord(e), c.fire(l.events.RECORD_CREATE, { record: e });
                },
                onDrawDelete: function (e) {
                  e = new s(1, 0, e.features);
                  u.addRecord(e), c.fire(l.events.RECORD_CREATE, { record: e });
                },
                onDrawCombine: function (e) {
                  e = new s(4, 0, e.createdFeatures, e.deletedFeatures);
                  u.addRecord(e), c.fire(l.events.RECORD_CREATE, { record: e });
                },
                onDrawUncombine: function (e) {
                  e = new s(4, 0, e.createdFeatures, e.deletedFeatures);
                  u.addRecord(e), c.fire(l.events.RECORD_CREATE, { record: e });
                },
                onDrawReplace: function (e) {
                  e = new s(4, 0, e.createdFeatures, e.deletedFeatures);
                  u.addRecord(e), c.fire(l.events.RECORD_CREATE, { record: e });
                },
                onKeydown: function (e) {
                  'minemap-canvas' === (e.srcElement || e.target).classList[0] &&
                    (90 === e.keyCode
                      ? (e.preventDefault(), n.undoHistory())
                      : 89 === e.keyCode && (e.preventDefault(), n.redoHistory()));
                },
              },
              n = {
                addEventListeners: function () {
                  c &&
                    (c.on(l.events.CREATE, o.onDrawCreate),
                    c.on(l.events.UPDATE, o.onDrawUpdate),
                    c.on(l.events.DELETE, o.onDrawDelete),
                    c.on(l.events.COMBINE_FEATURES, o.onDrawCombine),
                    c.on(l.events.UNCOMBINE_FEATURES, o.onDrawUncombine),
                    c.on(l.events.REPLACE, o.onDrawReplace),
                    e.addEventListener('keydown', o.onKeydown));
                },
                removeEventListeners: function () {
                  c &&
                    (c.off(l.events.CREATE, o.onDrawCreate),
                    c.off(l.events.UPDATE, o.onDrawUpdate),
                    c.off(l.events.DELETE, o.onDrawDelete),
                    c.off(l.events.COMBINE_FEATURES, o.onDrawCombine),
                    c.off(l.events.UNCOMBINE_FEATURES, o.onDrawUncombine),
                    c.off(l.events.REPLACE, o.onDrawReplace),
                    e.removeEventListener('keydown', o.onKeydown));
                },
                undoHistory: function () {
                  var e, t, r, o, n, i, s;
                  a &&
                    u &&
                    (e = u.undoRecord()) &&
                    (1 === e.getType()
                      ? 0 < (t = e.getFeatures()).length &&
                        (t.map(function (e) {
                          a.add(p({}, e, { type: e.type || l.geojsonTypes.FEATURE }));
                        }),
                        (r = t.map(function (e) {
                          return e.id;
                        })),
                        a.changeMode(l.modes.SIMPLE_SELECT, { featureIds: r }))
                      : 2 === e.getType()
                      ? (0 < (r = e.getFeatures()).length &&
                          ((o = r.map(function (e) {
                            return e.id;
                          })),
                          a.delete(o)),
                        0 < (o = e.getPrevFeatures()).length &&
                          (o.map(function (e) {
                            a.add(p(e, { type: e.type || l.geojsonTypes.FEATURE }));
                          }),
                          (n = o.map(function (e) {
                            return e.id;
                          })),
                          a.changeMode(l.modes.SIMPLE_SELECT, { featureIds: n })))
                      : 3 === e.getType()
                      ? 0 < (n = e.getFeatures()).length &&
                        ((i = n.map(function (e) {
                          return e.id;
                        })),
                        a.delete(i))
                      : 4 === e.getType() &&
                        (0 < (i = e.getFeatures()).length &&
                          ((s = i.map(function (e) {
                            return e.id;
                          })),
                          a.delete(s)),
                        0 < (s = e.getPrevFeatures()).length &&
                          (s.map(function (e) {
                            a.add(p(e, { type: e.type || l.geojsonTypes.FEATURE }));
                          }),
                          (s = s.map(function (e) {
                            return e.id;
                          })),
                          a.changeMode(l.modes.SIMPLE_SELECT, { featureIds: s }))),
                    c.fire(l.events.UNDO, { record: e }));
                },
                redoHistory: function () {
                  var e, t, r, o, n, i, s;
                  a &&
                    u &&
                    (e = u.redoRecord()) &&
                    (a.getAll(),
                    3 === e.getType()
                      ? 0 < (t = e.getFeatures()).length &&
                        (t.map(function (e) {
                          a.add(p(e, { type: e.type || l.geojsonTypes.FEATURE }));
                        }),
                        (r = t.map(function (e) {
                          return e.id;
                        })),
                        a.changeMode(l.modes.SIMPLE_SELECT, { featureIds: r }))
                      : 2 === e.getType()
                      ? (0 < (r = e.getPrevFeatures()).length &&
                          ((o = r.map(function (e) {
                            return e.id;
                          })),
                          a.delete(o)),
                        0 < (o = e.getFeatures()).length &&
                          (o.map(function (e) {
                            a.add(p(e, { type: e.type || l.geojsonTypes.FEATURE }));
                          }),
                          (n = o.map(function (e) {
                            return e.id;
                          })),
                          a.changeMode(l.modes.SIMPLE_SELECT, { featureIds: n })))
                      : 1 === e.getType()
                      ? 0 < (n = e.getFeatures()).length &&
                        ((i = n.map(function (e) {
                          return e.id;
                        })),
                        a.delete(i))
                      : 4 === e.getType() &&
                        (0 < (i = e.getPrevFeatures()).length &&
                          ((s = i.map(function (e) {
                            return e.id;
                          })),
                          a.delete(s)),
                        0 < (s = e.getFeatures()).length &&
                          (s.map(function (e) {
                            a.add(p(e, { type: e.type || l.geojsonTypes.FEATURE }));
                          }),
                          (s = s.map(function (e) {
                            return e.id;
                          })),
                          a.changeMode(l.modes.SIMPLE_SELECT, { featureIds: s }))),
                    c.fire(l.events.REDO, { record: e }));
                },
              };
            return n;
          };
        },
        { '../constants': 172, './history/record': 178, xtend: 170 },
      ],
      177: [
        function (e, t, r) {
          'use strict';
          function o() {
            (this.cursor = -1), (this.recordes = []);
          }
          (o.prototype.addRecord = function (e) {
            return (
              e &&
                (this.cursor + 1 < this.recordes.length &&
                  (this.recordes = this.recordes.slice(0, this.cursor + 1)),
                this.recordes.push(e),
                (e = this.recordes.length),
                (this.cursor = e - 1)),
              this
            );
          }),
            (o.prototype.undoRecord = function () {
              var e = this.recordes.length,
                t = null;
              return (
                0 === e && (this.cursor = -1),
                0 < e &&
                  -1 < this.cursor &&
                  ((t = this.recordes[this.cursor]), (this.cursor = this.cursor - 1)),
                t
              );
            }),
            (o.prototype.redoRecord = function () {
              var e = this.recordes.length;
              0 === e && (this.cursor = -1);
              var t = null;
              return (
                0 < e &&
                  this.cursor < e - 1 &&
                  ((t = this.recordes[this.cursor + 1]), (this.cursor = this.cursor + 1)),
                t
              );
            }),
            (o.prototype.getCurrentRecord = function () {
              var e = this.recordes.length;
              if (0 === e) return null;
              var t = null;
              return -1 < this.cursor && this.cursor < e && (t = this.recordes[this.cursor]), t;
            }),
            (o.prototype.getAllRecords = function () {
              return this.recordes;
            }),
            (o.prototype.clear = function () {
              (this.cursor = -1), (this.recordes = []);
            }),
            (t.exports = o);
        },
        {},
      ],
      178: [
        function (e, t, r) {
          'use strict';
          function o(e, t, r, o) {
            (this.type = e || 0),
              (this.action = t || 0),
              (this.features = r || []),
              (this.prevFeatures = o || []);
          }
          (o.prototype.getType = function () {
            return this.type || 0;
          }),
            (o.prototype.getAction = function () {
              return this.action || 0;
            }),
            (o.prototype.getFeatures = function () {
              return this.features || [];
            }),
            (o.prototype.getPrevFeatures = function () {
              return this.prevFeatures || [];
            }),
            (t.exports = o);
        },
        {},
      ],
      179: [
        function (e, t, r) {
          'use strict';
          e('babel-plugin-transform-runtime');
          var i = e('xtend'),
            s = e('./edit_handler'),
            e = {
              init: function (e, t) {
                var r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : void 0,
                  o = { ctx: {} },
                  n = s(o.ctx);
                return (
                  (o.setOptions = function (e) {
                    return (o = i(o, n.setOptions(e)));
                  }),
                  (o.dispose = function () {
                    return (o = i(o, n.dispose()));
                  }),
                  (o.undoOperation = function () {
                    n.undoOperation();
                  }),
                  (o.redoOperation = function () {
                    n.redoOperation();
                  }),
                  (o.onBtnCtrlActive = function (e, t) {
                    n.onBtnCtrlActive(e, t);
                  }),
                  (o.setFeatures = function (e) {
                    return n.setFeatures(e);
                  }),
                  (o.removeFeatures = function (e) {
                    return n.removeFeatures(e);
                  }),
                  (o.setSelected = function (e) {
                    return n.setSelected(e);
                  }),
                  (o.setFeatureProperties = function (e, t) {
                    return n.setFeatureProperties(e, t);
                  }),
                  (o.setFeaturePropertiesByIds = function (e, t) {
                    n.setFeaturePropertiesByIds(e, t);
                  }),
                  (o.setLockByIds = function (e, t) {
                    n.setLockByIds(e, t);
                  }),
                  (o.getAllHistoryRecords = function () {
                    return n.getAllHistoryRecords();
                  }),
                  (o.clearHistoryRecords = function () {
                    return n.clearHistoryRecords();
                  }),
                  (o.setCustomStyle = function (e, t) {
                    return n.setCustomStyle(e, t);
                  }),
                  (o.cancelCustomStyle = function (e) {
                    return n.cancelCustomStyle(e);
                  }),
                  (o.isDrawEnabled = function () {
                    return n.isDrawEnabled();
                  }),
                  (o.disableDraw = function () {
                    n.disableDraw();
                  }),
                  (o.enableDraw = function () {
                    n.enableDraw();
                  }),
                  (o.isAdsorbEnabled = function () {
                    return n.isAdsorbEnabled();
                  }),
                  (o.disableAdsorb = function () {
                    n.disableAdsorb();
                  }),
                  (o.enableAdsorb = function () {
                    n.enableAdsorb();
                  }),
                  (o = i(o, n.init(e, t, r)))
                );
              },
            };
          window.minemap && (minemap.edit = e),
            window.minemap2d && (minemap2d.edit = e),
            window.minemap3d && (minemap3d.edit = e),
            (t.exports = e);
        },
        { './edit_handler': 175, 'babel-plugin-transform-runtime': 44, xtend: 170 },
      ],
      180: [
        function (e, t, r) {
          'use strict';
          function o(e) {
            if (Array.isArray(e)) {
              for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
              return r;
            }
            return Array.from(e);
          }
          var n = e('./theme/point'),
            i = e('./theme/line'),
            s = e('./theme/fill'),
            e = e('./theme/symbol'),
            e = [].concat(o(n), o(i), o(s), o(e));
          t.exports = e;
        },
        { './theme/fill': 182, './theme/line': 184, './theme/point': 186, './theme/symbol': 187 },
      ],
      181: [
        function (e, t, r) {
          'use strict';
          t.exports = [
            {
              id: 'gl-draw-polygon-fill-inactive',
              type: 'fill',
              filter: [
                'all',
                ['==', 'active', 'false'],
                ['==', '$type', 'Polygon'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'false'],
              ],
              paint: {
                'fill-color': '#55B1F3',
                'fill-outline-color': '#55B1F3',
                'fill-opacity': 0.1,
              },
            },
            {
              id: 'gl-draw-polygon-fill-inactive-custom',
              type: 'fill',
              filter: [
                'all',
                ['==', 'active', 'false'],
                ['==', '$type', 'Polygon'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'true'],
              ],
              paint: {
                'fill-color': { property: 'user_fillColor', type: 'identity', default: '#55B1F3' },
                'fill-outline-color': {
                  property: 'user_fillOutlineColor',
                  type: 'identity',
                  default: '#55B1F3',
                },
                'fill-opacity': { property: 'user_fillOpacity', type: 'identity', default: 0.1 },
              },
            },
            {
              id: 'gl-draw-polygon-fill-inactive-lock',
              type: 'fill',
              filter: [
                'all',
                ['==', 'active', 'true'],
                ['==', '$type', 'Polygon'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'false'],
                ['==', 'user_isLock', !0],
              ],
              paint: {
                'fill-color': '#55B1F3',
                'fill-outline-color': '#55B1F3',
                'fill-opacity': 0.1,
              },
            },
            {
              id: 'gl-draw-polygon-fill-inactive-custom-lock',
              type: 'fill',
              filter: [
                'all',
                ['==', 'active', 'true'],
                ['==', '$type', 'Polygon'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'true'],
                ['==', 'user_isLock', !0],
              ],
              paint: {
                'fill-color': { property: 'user_fillColor', type: 'identity', default: '#55B1F3' },
                'fill-outline-color': {
                  property: 'user_fillOutlineColor',
                  type: 'identity',
                  default: '#55B1F3',
                },
                'fill-opacity': { property: 'user_fillOpacity', type: 'identity', default: 0.1 },
              },
            },
          ];
        },
        {},
      ],
      182: [
        function (e, t, r) {
          'use strict';
          e = e('./fill-base');
          t.exports = [
            {
              id: 'gl-draw-polygon-fill-active',
              type: 'fill',
              filter: [
                'all',
                ['==', 'active', 'true'],
                ['in', 'meta:type', 'Polygon', 'MultiPolygon'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'false'],
                ['!=', 'user_isLock', !0],
              ],
              paint: {
                'fill-color': '#F05668',
                'fill-outline-color': '#F05668',
                'fill-opacity': 0.1,
              },
            },
            {
              id: 'gl-draw-polygon-fill-static',
              type: 'fill',
              filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']],
              paint: {
                'fill-color': '#404040',
                'fill-outline-color': '#404040',
                'fill-opacity': 0.1,
              },
            },
          ].concat(
            (function (e) {
              if (Array.isArray(e)) {
                for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
                return r;
              }
              return Array.from(e);
            })(e),
          );
        },
        { './fill-base': 181 },
      ],
      183: [
        function (e, t, r) {
          'use strict';
          t.exports = [
            {
              id: 'gl-draw-polygon-stroke-inactive',
              type: 'line',
              filter: [
                'all',
                ['==', 'active', 'false'],
                ['==', '$type', 'LineString'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'false'],
              ],
              layout: { 'line-cap': 'round', 'line-join': 'round' },
              paint: { 'line-color': '#55B1F3', 'line-width': 2, 'line-opacity': 1 },
            },
            {
              id: 'gl-draw-polygon-stroke-inactive-custom1',
              type: 'line',
              filter: [
                'all',
                ['==', 'active', 'false'],
                ['==', '$type', 'LineString'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'true'],
                ['!=', 'user_fillOutlineDasharray', 'true'],
              ],
              layout: { 'line-cap': 'round', 'line-join': 'round' },
              paint: {
                'line-color': {
                  property: 'user_fillOutlineColor',
                  type: 'identity',
                  default: '#55B1F3',
                },
                'line-width': { property: 'user_fillOutlineWidth', type: 'identity', default: 2 },
                'line-opacity': {
                  property: 'user_fillOutlineOpacity',
                  type: 'identity',
                  default: 1,
                },
              },
            },
            {
              id: 'gl-draw-polygon-stroke-inactive-custom2',
              type: 'line',
              filter: [
                'all',
                ['==', 'active', 'false'],
                ['==', '$type', 'LineString'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'true'],
                ['==', 'user_fillOutlineDasharray', 'true'],
              ],
              layout: { 'line-cap': 'round', 'line-join': 'round' },
              paint: {
                'line-color': {
                  property: 'user_fillOutlineColor',
                  type: 'identity',
                  default: '#55B1F3',
                },
                'line-width': { property: 'user_fillOutlineWidth', type: 'identity', default: 2 },
                'line-opacity': {
                  property: 'user_fillOutlineOpacity',
                  type: 'identity',
                  default: 1,
                },
                'line-dasharray': [0.2, 2],
              },
            },
            {
              id: 'gl-draw-line-inactive',
              type: 'line',
              filter: [
                'all',
                ['==', 'active', 'false'],
                ['==', '$type', 'LineString'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'false'],
              ],
              layout: { 'line-cap': 'round', 'line-join': 'round' },
              paint: { 'line-color': '#55B1F3', 'line-width': 2 },
            },
            {
              id: 'gl-draw-line-inactive-custom1',
              type: 'line',
              filter: [
                'all',
                ['==', 'active', 'false'],
                ['==', '$type', 'LineString'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'true'],
                ['!=', 'user_lineDasharray', 'true'],
              ],
              layout: { 'line-cap': 'round', 'line-join': 'round' },
              paint: {
                'line-color': { property: 'user_lineColor', type: 'identity', default: '#55B1F3' },
                'line-width': { property: 'user_lineWidth', type: 'identity', default: 2 },
                'line-opacity': { property: 'user_lineOpacity', type: 'identity', default: 1 },
              },
            },
            {
              id: 'gl-draw-line-inactive-custom2',
              type: 'line',
              filter: [
                'all',
                ['==', 'active', 'false'],
                ['==', '$type', 'LineString'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'true'],
                ['==', 'user_lineDasharray', 'true'],
              ],
              layout: { 'line-cap': 'round', 'line-join': 'round' },
              paint: {
                'line-color': { property: 'user_lineColor', type: 'identity', default: '#55B1F3' },
                'line-width': { property: 'user_lineWidth', type: 'identity', default: 2 },
                'line-opacity': { property: 'user_lineOpacity', type: 'identity', default: 1 },
                'line-dasharray': [0.2, 2],
              },
            },
            {
              id: 'gl-draw-polygon-stroke-inactive-lock',
              type: 'line',
              filter: [
                'all',
                ['==', 'active', 'true'],
                ['==', '$type', 'LineString'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'false'],
                ['==', 'user_isLock', !0],
              ],
              layout: { 'line-cap': 'round', 'line-join': 'round' },
              paint: { 'line-color': '#55B1F3', 'line-width': 2, 'line-opacity': 1 },
            },
            {
              id: 'gl-draw-polygon-stroke-inactive-custom1-lock',
              type: 'line',
              filter: [
                'all',
                ['==', 'active', 'true'],
                ['==', '$type', 'LineString'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'true'],
                ['!=', 'user_fillOutlineDasharray', 'true'],
                ['==', 'user_isLock', !0],
              ],
              layout: { 'line-cap': 'round', 'line-join': 'round' },
              paint: {
                'line-color': {
                  property: 'user_fillOutlineColor',
                  type: 'identity',
                  default: '#55B1F3',
                },
                'line-width': { property: 'user_fillOutlineWidth', type: 'identity', default: 2 },
                'line-opacity': {
                  property: 'user_fillOutlineOpacity',
                  type: 'identity',
                  default: 1,
                },
              },
            },
            {
              id: 'gl-draw-polygon-stroke-inactive-custom2-lock',
              type: 'line',
              filter: [
                'all',
                ['==', 'active', 'true'],
                ['==', '$type', 'LineString'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'true'],
                ['==', 'user_fillOutlineDasharray', 'true'],
                ['==', 'user_isLock', !0],
              ],
              layout: { 'line-cap': 'round', 'line-join': 'round' },
              paint: {
                'line-color': {
                  property: 'user_fillOutlineColor',
                  type: 'identity',
                  default: '#55B1F3',
                },
                'line-width': { property: 'user_fillOutlineWidth', type: 'identity', default: 2 },
                'line-opacity': {
                  property: 'user_fillOutlineOpacity',
                  type: 'identity',
                  default: 1,
                },
                'line-dasharray': [0.2, 2],
              },
            },
            {
              id: 'gl-draw-line-inactive-lock',
              type: 'line',
              filter: [
                'all',
                ['==', 'active', 'true'],
                ['==', '$type', 'LineString'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'false'],
                ['==', 'user_isLock', !0],
              ],
              layout: { 'line-cap': 'round', 'line-join': 'round' },
              paint: { 'line-color': '#55B1F3', 'line-width': 2 },
            },
            {
              id: 'gl-draw-line-inactive-custom1-lock',
              type: 'line',
              filter: [
                'all',
                ['==', 'active', 'true'],
                ['==', '$type', 'LineString'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'true'],
                ['!=', 'user_lineDasharray', 'true'],
                ['==', 'user_isLock', !0],
              ],
              layout: { 'line-cap': 'round', 'line-join': 'round' },
              paint: {
                'line-color': { property: 'user_lineColor', type: 'identity', default: '#55B1F3' },
                'line-width': { property: 'user_lineWidth', type: 'identity', default: 2 },
                'line-opacity': { property: 'user_lineOpacity', type: 'identity', default: 1 },
              },
            },
            {
              id: 'gl-draw-line-inactive-custom2-lock',
              type: 'line',
              filter: [
                'all',
                ['==', 'active', 'true'],
                ['==', '$type', 'LineString'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'true'],
                ['==', 'user_lineDasharray', 'true'],
                ['==', 'user_isLock', !0],
              ],
              layout: { 'line-cap': 'round', 'line-join': 'round' },
              paint: {
                'line-color': { property: 'user_lineColor', type: 'identity', default: '#55B1F3' },
                'line-width': { property: 'user_lineWidth', type: 'identity', default: 2 },
                'line-opacity': { property: 'user_lineOpacity', type: 'identity', default: 1 },
                'line-dasharray': [0.2, 2],
              },
            },
          ];
        },
        {},
      ],
      184: [
        function (e, t, r) {
          'use strict';
          e = e('./line-base');
          t.exports = [
            {
              id: 'gl-draw-polygon-stroke-active',
              type: 'line',
              filter: [
                'all',
                ['==', 'active', 'true'],
                ['==', '$type', 'Polygon'],
                ['!=', 'user_isLock', !0],
              ],
              layout: { 'line-cap': 'round', 'line-join': 'round' },
              paint: {
                'line-color': '#F05668',
                'line-dasharray': [0.2, 2],
                'line-width': 2,
                'line-opacity': 1,
              },
            },
            {
              id: 'gl-draw-line-active',
              type: 'line',
              filter: [
                'all',
                ['==', 'active', 'true'],
                ['in', '$type', 'Polygon', 'LineString'],
                ['!=', 'user_isLock', !0],
              ],
              layout: { 'line-cap': 'round', 'line-join': 'round' },
              paint: {
                'line-color': '#F05668',
                'line-dasharray': [0.2, 2],
                'line-width': 2,
                'line-opacity': 1,
              },
            },
            {
              id: 'gl-draw-polygon-stroke-static',
              type: 'line',
              filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'Polygon']],
              layout: { 'line-cap': 'round', 'line-join': 'round' },
              paint: { 'line-color': '#404040', 'line-width': 2, 'line-opacity': 1 },
            },
            {
              id: 'gl-draw-line-static',
              type: 'line',
              filter: ['all', ['==', 'mode', 'static'], ['==', '$type', 'LineString']],
              layout: { 'line-cap': 'round', 'line-join': 'round' },
              paint: { 'line-color': '#404040', 'line-width': 2 },
            },
          ].concat(
            (function (e) {
              if (Array.isArray(e)) {
                for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
                return r;
              }
              return Array.from(e);
            })(e),
          );
        },
        { './line-base': 183 },
      ],
      185: [
        function (e, t, r) {
          'use strict';
          t.exports = [
            {
              id: 'gl-draw-point-point-stroke-inactive',
              type: 'circle',
              filter: [
                'all',
                ['==', 'active', 'false'],
                ['==', '$type', 'Point'],
                ['==', 'meta', 'feature'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'false'],
                ['!=', 'feature_type', 'icon'],
                ['!=', 'feature_type', 'text'],
              ],
              paint: { 'circle-radius': 6, 'circle-opacity': 1, 'circle-color': '#fff' },
            },
            {
              id: 'gl-draw-point-point-stroke-inactive-custom',
              type: 'circle',
              filter: [
                'all',
                ['==', 'active', 'false'],
                ['==', '$type', 'Point'],
                ['==', 'meta', 'feature'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'true'],
                ['!=', 'feature_type', 'icon'],
                ['!=', 'feature_type', 'text'],
              ],
              paint: {
                'circle-radius': {
                  property: 'user_circleBorderRadius',
                  type: 'identity',
                  default: 6,
                },
                'circle-opacity': { property: 'user_circleOpacity', type: 'identity', default: 1 },
                'circle-color': {
                  property: 'user_circleBorderColor',
                  type: 'identity',
                  default: '#ffffff',
                },
              },
            },
            {
              id: 'gl-draw-point-inactive',
              type: 'circle',
              filter: [
                'all',
                ['==', 'active', 'false'],
                ['==', '$type', 'Point'],
                ['==', 'meta', 'feature'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'false'],
                ['!=', 'feature_type', 'icon'],
                ['!=', 'feature_type', 'text'],
              ],
              paint: { 'circle-radius': 4, 'circle-color': '#55B1F3' },
            },
            {
              id: 'gl-draw-point-inactive-custom',
              type: 'circle',
              filter: [
                'all',
                ['==', 'active', 'false'],
                ['==', '$type', 'Point'],
                ['==', 'meta', 'feature'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'true'],
                ['!=', 'feature_type', 'icon'],
                ['!=', 'feature_type', 'text'],
              ],
              paint: {
                'circle-radius': { property: 'user_circleRadius', type: 'identity', default: 4 },
                'circle-opacity': { property: 'user_circleOpacity', type: 'identity', default: 1 },
                'circle-color': {
                  property: 'user_circleColor',
                  type: 'identity',
                  default: '#55B1F3',
                },
              },
            },
            {
              id: 'gl-draw-point-point-stroke-inactive-lock',
              type: 'circle',
              filter: [
                'all',
                ['==', 'active', 'true'],
                ['==', '$type', 'Point'],
                ['==', 'meta', 'feature'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'false'],
                ['!=', 'feature_type', 'icon'],
                ['!=', 'feature_type', 'text'],
                ['==', 'user_isLock', !0],
              ],
              paint: { 'circle-radius': 6, 'circle-opacity': 1, 'circle-color': '#fff' },
            },
            {
              id: 'gl-draw-point-point-stroke-inactive-custom-lock',
              type: 'circle',
              filter: [
                'all',
                ['==', 'active', 'true'],
                ['==', '$type', 'Point'],
                ['==', 'meta', 'feature'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'true'],
                ['!=', 'feature_type', 'icon'],
                ['!=', 'feature_type', 'text'],
                ['==', 'user_isLock', !0],
              ],
              paint: {
                'circle-radius': {
                  property: 'user_circleBorderRadius',
                  type: 'identity',
                  default: 6,
                },
                'circle-opacity': { property: 'user_circleOpacity', type: 'identity', default: 1 },
                'circle-color': {
                  property: 'user_circleBorderColor',
                  type: 'identity',
                  default: '#ffffff',
                },
              },
            },
            {
              id: 'gl-draw-point-inactive-lock',
              type: 'circle',
              filter: [
                'all',
                ['==', 'active', 'true'],
                ['==', '$type', 'Point'],
                ['==', 'meta', 'feature'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'false'],
                ['!=', 'feature_type', 'icon'],
                ['!=', 'feature_type', 'text'],
                ['==', 'user_isLock', !0],
              ],
              paint: { 'circle-radius': 4, 'circle-color': '#55B1F3' },
            },
            {
              id: 'gl-draw-point-inactive-custom-lock',
              type: 'circle',
              filter: [
                'all',
                ['==', 'active', 'true'],
                ['==', '$type', 'Point'],
                ['==', 'meta', 'feature'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'true'],
                ['!=', 'feature_type', 'icon'],
                ['!=', 'feature_type', 'text'],
                ['==', 'user_isLock', !0],
              ],
              paint: {
                'circle-radius': { property: 'user_circleRadius', type: 'identity', default: 4 },
                'circle-opacity': { property: 'user_circleOpacity', type: 'identity', default: 1 },
                'circle-color': {
                  property: 'user_circleColor',
                  type: 'identity',
                  default: '#55B1F3',
                },
              },
            },
          ];
        },
        {},
      ],
      186: [
        function (e, t, r) {
          'use strict';
          e = e('./point-base');
          t.exports = [
            {
              id: 'gl-draw-polygon-and-line-vertex-stroke-inactive',
              type: 'circle',
              filter: [
                'all',
                ['==', 'meta', 'vertex'],
                ['==', '$type', 'Point'],
                ['!=', 'mode', 'static'],
                ['!=', 'feature_type', 'icon'],
                ['!=', 'feature_type', 'text'],
                ['!=', 'user_isLock', !0],
              ],
              paint: { 'circle-radius': 6, 'circle-color': '#fff' },
            },
            {
              id: 'gl-draw-polygon-and-line-vertex-inactive',
              type: 'circle',
              filter: [
                'all',
                ['==', 'meta', 'vertex'],
                ['==', '$type', 'Point'],
                ['!=', 'mode', 'static'],
                ['!=', 'feature_type', 'icon'],
                ['!=', 'feature_type', 'text'],
                ['!=', 'user_isLock', !0],
              ],
              paint: { 'circle-radius': 4, 'circle-color': '#F05668' },
            },
            {
              id: 'gl-draw-polygon-midpoint',
              type: 'circle',
              filter: [
                'all',
                ['==', '$type', 'Point'],
                ['==', 'meta', 'midpoint'],
                ['!=', 'feature_type', 'icon'],
                ['!=', 'user_isLock', !0],
              ],
              paint: { 'circle-radius': 4, 'circle-color': '#F05668' },
            },
            {
              id: 'gl-draw-point-stroke-active',
              type: 'circle',
              filter: [
                'all',
                ['==', '$type', 'Point'],
                ['==', 'active', 'true'],
                ['!=', 'meta', 'midpoint'],
                ['!=', 'feature_type', 'icon'],
                ['!=', 'feature_type', 'text'],
                ['!=', 'user_isLock', !0],
              ],
              paint: { 'circle-radius': 8, 'circle-color': '#fff' },
            },
            {
              id: 'gl-draw-point-active',
              type: 'circle',
              filter: [
                'all',
                ['==', '$type', 'Point'],
                ['!=', 'meta', 'midpoint'],
                ['==', 'active', 'true'],
                ['!=', 'feature_type', 'icon'],
                ['!=', 'feature_type', 'text'],
                ['!=', 'user_isLock', !0],
              ],
              paint: { 'circle-radius': 6, 'circle-color': '#F05668' },
            },
            {
              id: 'gl-draw-icon-stroke-active',
              type: 'circle',
              filter: [
                'all',
                ['==', 'active', 'true'],
                ['==', '$type', 'Point'],
                ['==', 'meta', 'feature'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'true'],
                ['==', 'feature_type', 'icon'],
              ],
              paint: {
                'circle-color': '#FFFFFF',
                'circle-radius': 32,
                'circle-blur': 1,
                'circle-stroke-width': 1,
                'circle-stroke-opacity': 0.5,
                'circle-stroke-color': '#FFFFFF',
              },
            },
            {
              id: 'gl-draw-point-static',
              type: 'circle',
              filter: [
                'all',
                ['==', 'mode', 'static'],
                ['==', '$type', 'Point'],
                ['!=', 'feature_type', 'icon'],
                ['!=', 'feature_type', 'text'],
              ],
              paint: { 'circle-radius': 4, 'circle-color': '#404040' },
            },
          ].concat(
            (function (e) {
              if (Array.isArray(e)) {
                for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
                return r;
              }
              return Array.from(e);
            })(e),
          );
        },
        { './point-base': 185 },
      ],
      187: [
        function (e, t, r) {
          'use strict';
          t.exports = [
            {
              id: 'gl-draw-icon-inactive',
              type: 'symbol',
              filter: [
                'all',
                ['==', 'active', 'false'],
                ['==', '$type', 'Point'],
                ['==', 'meta', 'feature'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'true'],
                ['==', 'feature_type', 'icon'],
              ],
              layout: {
                'icon-image': {
                  property: 'user_iconImage',
                  type: 'identity',
                  default: 'marker-15-6',
                },
                'icon-size': { property: 'user_iconSize', type: 'identity', default: 1 },
                'icon-rotate': { property: 'user_iconRotate', type: 'identity', default: 0 },
                'icon-allow-overlap': !0,
                'icon-ignore-placement': !0,
              },
              paint: {
                'icon-color': { property: 'user_iconColor', type: 'identity', default: '#000000' },
                'icon-opacity': { property: 'user_iconOpacity', type: 'identity', default: 1 },
              },
            },
            {
              id: 'gl-draw-icon-active',
              type: 'symbol',
              filter: [
                'all',
                ['==', 'active', 'true'],
                ['==', '$type', 'Point'],
                ['==', 'meta', 'feature'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'true'],
                ['==', 'feature_type', 'icon'],
              ],
              layout: {
                'icon-image': {
                  property: 'user_iconImage',
                  type: 'identity',
                  default: 'marker-15-6',
                },
                'icon-size': { property: 'user_iconSize', type: 'identity', default: 1 },
                'icon-rotate': { property: 'user_iconRotate', type: 'identity', default: 0 },
                'icon-allow-overlap': !0,
                'icon-ignore-placement': !0,
              },
              paint: {
                'icon-color': { property: 'user_iconColor', type: 'identity', default: '#FFFFFF' },
                'icon-opacity': { property: 'user_iconOpacity', type: 'identity', default: 1 },
              },
            },
            {
              id: 'gl-draw-text-inactive',
              type: 'symbol',
              filter: [
                'all',
                ['==', 'active', 'false'],
                ['==', '$type', 'Point'],
                ['==', 'meta', 'feature'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'true'],
                ['==', 'feature_type', 'text'],
              ],
              layout: {
                'text-field': { property: 'user_textField', type: 'identity', default: '文字标注' },
                'text-size': { property: 'user_textSize', type: 'identity', default: 11 },
                'text-rotate': { property: 'user_textRotate', type: 'identity', default: 0 },
              },
              paint: {
                'text-color': { property: 'user_textColor', type: 'identity', default: '#544946' },
                'text-halo-width': { property: 'user_textHaloWidth', type: 'identity', default: 1 },
                'text-halo-color': {
                  property: 'user_textHaloColor',
                  type: 'identity',
                  default: '#ffffff',
                },
              },
            },
            {
              id: 'gl-draw-text-active',
              type: 'symbol',
              filter: [
                'all',
                ['==', 'active', 'true'],
                ['==', '$type', 'Point'],
                ['==', 'meta', 'feature'],
                ['!=', 'mode', 'static'],
                ['==', 'custom_style', 'true'],
                ['==', 'feature_type', 'text'],
              ],
              layout: {
                'text-field': { property: 'user_textField', type: 'identity', default: '文字标注' },
                'text-size': { property: 'user_textSize', type: 'identity', default: 11 },
                'text-rotate': { property: 'user_textRotate', type: 'identity', default: 0 },
              },
              paint: {
                'text-color': { property: 'user_textColor', type: 'identity', default: '#544946' },
                'text-halo-width': { property: 'user_textHaloWidth', type: 'identity', default: 1 },
                'text-halo-color': {
                  property: 'user_textHaloColor',
                  type: 'identity',
                  default: '#ffffff',
                },
              },
            },
          ];
        },
        {},
      ],
      188: [
        function (e, t, r) {
          'use strict';
          function o(e, t) {
            if (null == e || isNaN(e)) throw new Error('num is required');
            if (t && !(0 <= t)) throw new Error('precision must be a positive number');
            t = Math.pow(10, t || 0);
            return Math.round(e * t) / t;
          }
          t.exports = function (e, t) {
            if (!e || !t) return !1;
            if (2 !== e.length || 2 !== t.length) return !1;
            (e = [o(e[0], 5), o(e[1], 5)]), (t = [o(t[0], 5), o(t[1], 5)]);
            return e[0] === t[0] && e[1] === t[1];
          };
        },
        {},
      ],
      189: [
        function (e, t, r) {
          'use strict';
          var p = e('./lib/mode_handler'),
            d = e('./lib/get_features_and_set_cursor'),
            h = e('./lib/features_at'),
            f = e('./lib/is_click'),
            y = e('./lib/is_tap'),
            g = e('./constants'),
            m = e('./modes/object_to_mode');
          t.exports = function (n) {
            var i = Object.keys(n.options.modes).reduce(function (e, t) {
                return (e[t] = m(n.options.modes[t])), e;
              }, {}),
              r = {},
              o = {},
              s = {},
              a = null,
              c = null;
            (s.drag = function (e, t) {
              t({ point: e.point, time: new Date().getTime() })
                ? (n.ui.queueMapClasses({ mouse: g.cursors.DRAG }), c.drag(e))
                : e.originalEvent.stopPropagation();
            }),
              (s.mousedrag = function (e) {
                s.drag(e, function (e) {
                  return !f(r, e);
                });
              }),
              (s.touchdrag = function (e) {
                s.drag(e, function (e) {
                  return !y(o, e);
                });
              }),
              (s.mousemove = function (e) {
                if (
                  1 ===
                  (void 0 !== (e = d(e, n)).originalEvent.buttons
                    ? e.originalEvent.buttons
                    : e.originalEvent.which)
                )
                  return s.mousedrag(e);
                c.mousemove(e);
              }),
              (s.mousedown = function (e) {
                (r = { time: new Date().getTime(), point: e.point }), (e = d(e, n)), c.mousedown(e);
              }),
              (s.mouseup = function (e) {
                var t = { point: (e = d(e, n)).point, time: new Date().getTime() };
                f(r, t) ? c.click(e) : c.mouseup(e);
              }),
              (s.mouseout = function (e) {
                c.mouseout(e);
              }),
              (s.touchstart = function (e) {
                var t;
                (e.originalEvent || e).preventDefault(),
                  n.options.touchEnabled &&
                    ((o = { time: new Date().getTime(), point: e.point }),
                    (t = h.touch(e, null, n)),
                    (e.featureTarget = t[0]),
                    (e.featureTargets = t),
                    c.touchstart(e));
              }),
              (s.touchmove = function (e) {
                if (((e.originalEvent || e).preventDefault(), n.options.touchEnabled))
                  return c.touchmove(e), s.touchdrag(e);
              }),
              (s.touchend = function (e) {
                var t;
                (e.originalEvent || e).preventDefault(),
                  n.options.touchEnabled &&
                    ((t = h.touch(e, null, n)),
                    (e.featureTarget = t[0]),
                    (e.featureTargets = t),
                    y(o, { time: new Date().getTime(), point: e.point })
                      ? c.tap(e)
                      : c.touchend(e));
              });
            function t(e) {
              return !(8 === e || 46 === e || (48 <= e && e <= 57));
            }
            function u(e, t) {
              var r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
              c.stop();
              var o = i[e];
              if (void 0 === o) throw new Error(e + ' is not valid');
              a = e;
              t = o(n, t);
              (c = p(t, n)),
                r.silent || n.map.fire(g.events.MODE_CHANGE, { mode: e }),
                n.store.setDirty(),
                n.store.render();
            }
            (s.keydown = function (e) {
              'minemap-canvas' === (e.srcElement || e.target).classList[0] &&
                ((8 !== e.keyCode && 46 !== e.keyCode) || !n.options.controls.trash
                  ? t(e.keyCode)
                    ? c.keydown(e)
                    : 49 === e.keyCode && n.options.controls.point
                    ? u(g.modes.DRAW_POINT)
                    : 50 === e.keyCode && n.options.controls.line_string
                    ? u(g.modes.DRAW_LINE_STRING)
                    : 51 === e.keyCode && n.options.controls.polygon && u(g.modes.DRAW_POLYGON)
                  : (e.preventDefault(), c.trash()));
            }),
              (s.keyup = function (e) {
                t(e.keyCode) && c.keyup(e);
              }),
              (s.zoomend = function () {
                n.store.changeZoom();
              });
            var l = {
              trash: !(s.data = function (e) {
                var t, r, o;
                'style' === e.dataType &&
                  ((t = n.setup),
                  (r = n.map),
                  (o = n.options),
                  (e = n.store),
                  o.styles.some(function (e) {
                    return r.getLayer(e.id);
                  }) || (t.addLayers(), e.setDirty(), e.render()));
              }),
              combineFeatures: !1,
              uncombineFeatures: !1,
            };
            return {
              start: function () {
                (a = n.options.defaultMode), (c = p(i[a](n), n));
              },
              changeMode: u,
              actionable: function (t) {
                var r = !1;
                Object.keys(t).forEach(function (e) {
                  if (void 0 === l[e]) throw new Error('Invalid action type');
                  l[e] !== t[e] && (r = !0), (l[e] = t[e]);
                }),
                  r && n.map.fire(g.events.ACTIONABLE, { actions: l });
              },
              currentModeName: function () {
                return a;
              },
              currentModeRender: function (e, t) {
                return c.render(e, t);
              },
              fire: function (e, t) {
                s[e] && s[e](t);
              },
              addEventListeners: function () {
                n.map.on('mousemove', s.mousemove),
                  n.map.on('mousedown', s.mousedown),
                  n.map.on('mouseup', s.mouseup),
                  n.map.on('data', s.data),
                  n.container.addEventListener('mouseout', s.mouseout),
                  n.options.keybindings &&
                    (n.container.addEventListener('keydown', s.keydown),
                    n.container.addEventListener('keyup', s.keyup));
              },
              removeEventListeners: function () {
                n.map.off('mousemove', s.mousemove),
                  n.map.off('mousedown', s.mousedown),
                  n.map.off('mouseup', s.mouseup),
                  n.map.off('data', s.data),
                  n.map.off('touchmove', s.touchmove),
                  n.map.off('touchstart', s.touchstart),
                  n.map.off('touchend', s.touchend),
                  n.container.removeEventListener('mouseout', s.mouseout),
                  n.options.keybindings &&
                    (n.container.removeEventListener('keydown', s.keydown),
                    n.container.removeEventListener('keyup', s.keyup));
              },
              trash: function (e) {
                c.trash(e);
              },
              combineFeatures: function () {
                c.combineFeatures();
              },
              uncombineFeatures: function () {
                c.uncombineFeatures();
              },
              unionPolygon: function () {
                c.unionPolygon();
              },
              unionLine: function () {
                c.unionLine();
              },
              splitLine: function () {
                c.splitLine();
              },
              curveLine: function () {
                c.curveLine();
              },
              parallelLine: function (e) {
                c.parallelLine(e);
              },
              curveFeature: function () {
                c.curveFeature();
              },
              cloneFeature: function () {
                c.cloneFeature();
              },
              getMode: function () {
                return a;
              },
            };
          };
        },
        {
          './constants': 172,
          './lib/features_at': 219,
          './lib/get_features_and_set_cursor': 220,
          './lib/is_click': 221,
          './lib/is_tap': 223,
          './lib/mode_handler': 225,
          './modes/object_to_mode': 258,
        },
      ],
      190: [
        function (e, t, r) {
          'use strict';
          var i = e('@turf/helpers').lineString,
            s = e('@turf/bezier-spline').default,
            o = e('./feature'),
            e = function (e, t) {
              o.call(this, e, t);
            };
          ((e.prototype = Object.create(o.prototype)).isValid = function () {
            return 1 < this.coordinates.length;
          }),
            (e.prototype.addCoordinate = function (e, t, r) {
              this.changed();
              e = parseInt(e, 10);
              (this.first = [t, r]), this.coordinates.splice(e, 0, [t, r]);
            }),
            (e.prototype.getCoordinate = function (e) {
              e = parseInt(e, 10);
              return JSON.parse(JSON.stringify(this.coordinates[e]));
            }),
            (e.prototype.removeCoordinate = function (e) {
              this.changed(), this.coordinates.splice(parseInt(e, 10), 1);
            }),
            (e.prototype.updateCoordinate = function (e, t, r) {
              var o = parseInt(e, 10);
              0 === o
                ? ((this.properties.feature_type = 'arc'),
                  (this.properties.first = [t, r]),
                  (this.coordinates[o] = [t, r]))
                : 1 === o
                ? ((this.properties.second = [t, r]), (this.coordinates[o] = [t, r]))
                : 2 === o &&
                  ((this.properties.end = [t, r]),
                  (this.coordinates =
                    ((e = this.properties.first),
                    (o = this.properties.second),
                    s(i([e, [t, r], o]), { resolution: 2e3, sharpness: 0.85 }).geometry
                      .coordinates)));
              for (var n = 0; n < this.coordinates.length - 1; n++)
                this.coordinates[n] &&
                  void 0 !== this.ctx.options.decimalPointNum &&
                  ((this.coordinates[n][0] = Number(
                    this.coordinates[n][0].toFixed(this.ctx.options.decimalPointNum),
                  )),
                  (this.coordinates[n][1] = Number(
                    this.coordinates[n][1].toFixed(this.ctx.options.decimalPointNum),
                  )));
              this.changed();
            }),
            (t.exports = e);
        },
        { './feature': 195, '@turf/bezier-spline': 13, '@turf/helpers': 21 },
      ],
      191: [
        function (e, t, r) {
          'use strict';
          var m = e('@turf/helpers').round,
            o = e('./feature'),
            e = function (e, t) {
              o.call(this, e, t),
                (this.coordinates = this.coordinates.map(function (e) {
                  return e.slice(0, -1);
                }));
            };
          ((e.prototype = Object.create(o.prototype)).isValid = function () {
            return (
              0 !== this.coordinates.length &&
              this.coordinates.every(function (e) {
                return 2 < e.length;
              })
            );
          }),
            (e.prototype.incomingCoords = function (e) {
              (this.coordinates = e.map(function (e) {
                return e.slice(0, -1);
              })),
                this.changed();
            }),
            (e.prototype.setCoordinates = function (e) {
              (this.coordinates = e), this.changed();
            }),
            (e.prototype.addCoordinate = function (e, t, r) {
              this.changed();
              e = e.split('.').map(function (e) {
                return parseInt(e, 10);
              });
              this.coordinates[e[0]].splice(e[1], 0, [t, r]);
            }),
            (e.prototype.removeCoordinate = function (e) {
              this.changed();
              var t = e.split('.').map(function (e) {
                  return parseInt(e, 10);
                }),
                e = this.coordinates[t[0]];
              e && (e.splice(t[1], 1), e.length < 3 && this.coordinates.splice(t[0], 1));
            }),
            (e.prototype.getCoordinate = function (e) {
              var t = e.split('.').map(function (e) {
                  return parseInt(e, 10);
                }),
                e = this.coordinates[t[0]];
              return JSON.parse(JSON.stringify(e[t[1]]));
            }),
            (e.prototype.getCoordinates = function () {
              return this.coordinates.map(function (e) {
                return e.concat([e[0]]);
              });
            }),
            (e.prototype.updateCoordinate = function (e, t, r) {
              this.changed();
              var o,
                n,
                i,
                s,
                a,
                c,
                u,
                l,
                p,
                d = e.split('.'),
                h = parseInt(d[0], 10),
                f = parseInt(d[1], 10);
              0 === f
                ? ((this.properties.feature_type = 'attack_arrow'),
                  (this.properties.start = [t, r]),
                  (this.coordinates[h][f] = [t, r]))
                : 1 <= f &&
                  ((this.properties.end = [t, r]),
                  (this.coordinates =
                    ((o = this.ctx.map),
                    (n = this.properties.start),
                    (i = this.properties.end),
                    (s = o.project(n)),
                    (a = o.project(i)),
                    (c = m(s.x, 2)),
                    (u = m(s.y, 2)),
                    (l = m(a.x, 2)),
                    (p = m(a.y, 2)),
                    (e = c + m((l - c) / 4, 2)),
                    (d = u + m((p - u) / 4, 2)),
                    (f = l - m((l - c) / 3, 2)),
                    (t = p - m((p - u) / 3, 2)),
                    (r = l - m((l - c) / 4, 2)),
                    (s = p - m((p - u) / 4, 2)),
                    (a = _(o, e, d, c, u, Math.PI / 2)),
                    (c = _(o, e, d, c, u, -Math.PI / 2)),
                    (u = _(o, f, t, l, p, Math.PI / 3)),
                    (f = _(o, f, t, l, p, -Math.PI / 3)),
                    (t = _(o, r, s, l, p, Math.PI / 4)),
                    (p = _(o, r, s, l, p, -Math.PI / 4)),
                    [[n, c, t, u, i, f, p, a]])));
              for (var y = 0; y < this.coordinates.length; y++)
                if (this.coordinates[y] && void 0 !== this.ctx.options.decimalPointNum)
                  for (var g = 0; g < this.coordinates[y].length; g++)
                    (this.coordinates[y][g][0] = Number(
                      this.coordinates[y][g][0].toFixed(this.ctx.options.decimalPointNum),
                    )),
                      (this.coordinates[y][g][1] = Number(
                        this.coordinates[y][g][1].toFixed(this.ctx.options.decimalPointNum),
                      ));
              void 0 === this.coordinates[h] && (this.coordinates[h] = []);
            });
          var _ = function (e, t, r, o, n, i) {
            (r = r),
              (n = n),
              (i = i),
              (n = [
                ((t = t) - (o = o)) * Math.cos(i) - (r - n) * Math.sin(i) + o,
                (t - o) * Math.sin(i) + (r - n) * Math.cos(i) + n,
              ]),
              (n = e.unproject(n));
            return [n.lng, n.lat];
          };
          t.exports = e;
        },
        { './feature': 195, '@turf/helpers': 21 },
      ],
      192: [
        function (e, t, r) {
          'use strict';
          var o = e('./feature'),
            e = function (e, t) {
              o.call(this, e, t),
                (this.coordinates = this.coordinates.map(function (e) {
                  return e.slice(0, -1);
                }));
            };
          ((e.prototype = Object.create(o.prototype)).isValid = function () {
            return (
              0 !== this.coordinates.length &&
              this.coordinates.every(function (e) {
                return 2 < e.length;
              })
            );
          }),
            (e.prototype.incomingCoords = function (e) {
              (this.coordinates = e.map(function (e) {
                return e.slice(0, -1);
              })),
                this.changed();
            }),
            (e.prototype.setCoordinates = function (e) {
              (this.coordinates = e), this.changed();
            }),
            (e.prototype.addCoordinate = function (e, t, r) {
              this.changed();
              e = e.split('.').map(function (e) {
                return parseInt(e, 10);
              });
              this.coordinates[e[0]].splice(e[1], 0, [t, r]);
            }),
            (e.prototype.removeCoordinate = function (e) {
              this.changed();
              var t = e.split('.').map(function (e) {
                  return parseInt(e, 10);
                }),
                e = this.coordinates[t[0]];
              e && (e.splice(t[1], 1), e.length < 3 && this.coordinates.splice(t[0], 1));
            }),
            (e.prototype.getCoordinate = function (e) {
              var t = e.split('.').map(function (e) {
                  return parseInt(e, 10);
                }),
                e = this.coordinates[t[0]];
              return JSON.parse(JSON.stringify(e[t[1]]));
            }),
            (e.prototype.getCoordinates = function () {
              return this.coordinates.map(function (e) {
                return e.concat([e[0]]);
              });
            }),
            (e.prototype.updateCoordinate = function (e, t, r) {
              this.changed();
              var o = e.split('.'),
                e = parseInt(o[0], 10),
                o = parseInt(o[1], 10);
              0 === o &&
                ((this.coordinates[e][o] = [t, r]),
                (this.properties.center = [t, r]),
                (this.properties.feature_type = 'circle'),
                (this.properties.radius = 100)),
                1 === o &&
                  ((this.properties.radius = s(this.properties.center, [t, r])),
                  (this.coordinates = (function (e, t, r) {
                    r = r || 64;
                    for (
                      var o = e[1],
                        n = e[0],
                        t = t,
                        i = [],
                        s = t / (111.32 * Math.cos((o * Math.PI) / 180)),
                        a = t / 110.574,
                        c = void 0,
                        u = void 0,
                        l = void 0,
                        p = 0;
                      p < r;
                      p++
                    )
                      (c = (p / r) * (2 * Math.PI)),
                        (u = s * Math.cos(c)),
                        (l = a * Math.sin(c)),
                        i.push([n + u, o + l]);
                    return i.push(i[0]), [i];
                  })(this.properties.center, s(this.properties.center, [t, r]))));
              for (var n = 0; n < this.coordinates.length; n++)
                if (this.coordinates[n] && void 0 !== this.ctx.options.decimalPointNum)
                  for (var i = 0; i < this.coordinates[n].length; i++)
                    (this.coordinates[n][i][0] = Number(
                      this.coordinates[n][i][0].toFixed(this.ctx.options.decimalPointNum),
                    )),
                      (this.coordinates[n][i][1] = Number(
                        this.coordinates[n][i][1].toFixed(this.ctx.options.decimalPointNum),
                      ));
              void 0 === this.coordinates[e] && (this.coordinates[e] = []);
            }),
            (t.exports = e);
          var i = {
            miles: 3960,
            nauticalmiles: 3441.145,
            degrees: 57.2957795,
            radians: 1,
            inches: 250905600,
            yards: 6969600,
            meters: 6373e3,
            metres: 6373e3,
            kilometers: 6373,
            kilometres: 6373,
          };
          function s(e, t) {
            var r = Math.PI / 180,
              o = r * (t[1] - e[1]),
              n = r * (t[0] - e[0]),
              e = r * e[1],
              t = r * t[1],
              t =
                Math.pow(Math.sin(o / 2), 2) +
                Math.pow(Math.sin(n / 2), 2) * Math.cos(e) * Math.cos(t);
            return (function (e, t) {
              if (void 0 === (t = i[t || 'kilometers'])) throw new Error('Invalid unit');
              return e * t;
            })(2 * Math.atan2(Math.sqrt(t), Math.sqrt(1 - t)), 'kilometers');
          }
        },
        { './feature': 195 },
      ],
      193: [
        function (e, t, r) {
          'use strict';
          function n(e) {
            if (Array.isArray(e)) {
              for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
              return r;
            }
            return Array.from(e);
          }
          var i = e('@turf/helpers').lineString,
            s = e('@turf/bezier-spline').default,
            o = e('./feature'),
            e = function (e, t) {
              o.call(this, e, t),
                (this.coordinates = this.coordinates.map(function (e) {
                  return e.slice(0, -1);
                }));
            };
          function a(e, t) {
            var r = 1 < arguments.length && void 0 !== t && t;
            if (!e) return [[]];
            t = e[0];
            if (t.length < 3) return e;
            if (r) {
              var o = t.length;
              if (
                (2 <= o &&
                  t[o - 2][0] === t[o - 1][0] &&
                  t[o - 2][1] === t[o - 1][1] &&
                  (t = t.slice(0, -1)),
                t.length < 3)
              )
                return e;
              o = s(i([].concat(n(t), [t[0]])), { resolution: 5e3, sharpness: 0.85 });
              return [[].concat(n(o.geometry.coordinates))];
            }
            (o = t.slice(0, -1)),
              (o = s(i(o), { resolution: 5e3, sharpness: 0.85 })),
              (o = [].concat(n(o.geometry.coordinates)));
            return [[].concat(n(o), [t[t.length - 1]])];
          }
          ((e.prototype = Object.create(o.prototype)).isValid = function () {
            return (
              0 !== this.coordinates.length &&
              this.coordinates.every(function (e) {
                return 2 < e.length;
              })
            );
          }),
            (e.prototype.incomingCoords = function (e) {
              (this.coordinates = e.map(function (e) {
                return e.slice(0, -1);
              })),
                this.changed();
            }),
            (e.prototype.setCoordinates = function (e) {
              (this.coordinates = e), this.changed();
            }),
            (e.prototype.addCoordinate = function (e, t, r) {
              this.changed();
              e = e.split('.').map(function (e) {
                return parseInt(e, 10);
              });
              this.coordinates[e[0]].splice(e[1], 0, [t, r]);
            }),
            (e.prototype.removeCoordinate = function (e) {
              this.changed();
              var t = e.split('.').map(function (e) {
                  return parseInt(e, 10);
                }),
                e = this.coordinates[t[0]];
              e && (e.splice(t[1], 1), e.length < 3 && this.coordinates.splice(t[0], 1));
            }),
            (e.prototype.getCoordinate = function (e) {
              var t = e.split('.').map(function (e) {
                  return parseInt(e, 10);
                }),
                e = this.coordinates[t[0]];
              return JSON.parse(JSON.stringify(e[t[1]]));
            }),
            (e.prototype.getCoordinates = function () {
              return this.coordinates.map(function (e) {
                return e.concat([e[0]]);
              });
            }),
            (e.prototype.updateCoordinate = function (e, t, r) {
              this.changed();
              var o = e.split('.'),
                e = parseInt(o[0], 10),
                o = parseInt(o[1], 10);
              void 0 === this.initCoordinates && (this.initCoordinates = []),
                void 0 === this.initCoordinates[e] && (this.initCoordinates[e] = []),
                0 === o
                  ? ((this.properties.feature_type = 'curve_polygon'),
                    (this.properties.start = [t, r]),
                    (this.initCoordinates[e][o] = [t, r]),
                    (this.coordinates[e][o] = [t, r]))
                  : 1 <= o &&
                    ((this.initCoordinates[e][o] = [t, r]),
                    (this.coordinates = a(this.initCoordinates)));
              for (var n = 0; n < this.coordinates.length; n++)
                if (this.coordinates[n] && void 0 !== this.ctx.options.decimalPointNum)
                  for (var i = 0; i < this.coordinates[n].length; i++)
                    (this.coordinates[n][i][0] = Number(
                      this.coordinates[n][i][0].toFixed(this.ctx.options.decimalPointNum),
                    )),
                      (this.coordinates[n][i][1] = Number(
                        this.coordinates[n][i][1].toFixed(this.ctx.options.decimalPointNum),
                      ));
              void 0 === this.coordinates[e] && (this.coordinates[e] = []);
            }),
            (e.prototype.updateCoordinate2 = function () {
              this.coordinates = a(this.initCoordinates, !0);
              for (var e = 0; e < this.coordinates.length; e++)
                if (this.coordinates[e] && void 0 !== this.ctx.options.decimalPointNum)
                  for (var t = 0; t < this.coordinates[e].length; t++)
                    (this.coordinates[e][t][0] = Number(
                      this.coordinates[e][t][0].toFixed(this.ctx.options.decimalPointNum),
                    )),
                      (this.coordinates[e][t][1] = Number(
                        this.coordinates[e][t][1].toFixed(this.ctx.options.decimalPointNum),
                      ));
            }),
            (t.exports = e);
        },
        { './feature': 195, '@turf/bezier-spline': 13, '@turf/helpers': 21 },
      ],
      194: [
        function (e, t, r) {
          'use strict';
          var m = e('@turf/helpers').round,
            _ = e('@turf/helpers').point,
            l = e('@turf/helpers').polygon,
            v = e('@turf/helpers').featureCollection,
            b = e('@turf/convex').default,
            p = e('@turf/bearing').default,
            d = e('@turf/distance').default,
            h = e('@turf/destination').default,
            f = e('@turf/transform-rotate').default,
            o = e('./feature'),
            e = function (e, t) {
              o.call(this, e, t),
                (this.coordinates = this.coordinates.map(function (e) {
                  return e.slice(0, -1);
                }));
            };
          ((e.prototype = Object.create(o.prototype)).isValid = function () {
            return (
              0 !== this.coordinates.length &&
              this.coordinates.every(function (e) {
                return 2 < e.length;
              })
            );
          }),
            (e.prototype.incomingCoords = function (e) {
              (this.coordinates = e.map(function (e) {
                return e.slice(0, -1);
              })),
                this.changed();
            }),
            (e.prototype.setCoordinates = function (e) {
              (this.coordinates = e), this.changed();
            }),
            (e.prototype.addCoordinate = function (e, t, r) {
              this.changed();
              e = e.split('.').map(function (e) {
                return parseInt(e, 10);
              });
              this.coordinates[e[0]].splice(e[1], 0, [t, r]);
            }),
            (e.prototype.removeCoordinate = function (e) {
              this.changed();
              var t = e.split('.').map(function (e) {
                  return parseInt(e, 10);
                }),
                e = this.coordinates[t[0]];
              e && (e.splice(t[1], 1), e.length < 3 && this.coordinates.splice(t[0], 1));
            }),
            (e.prototype.getCoordinate = function (e) {
              var t = e.split('.').map(function (e) {
                  return parseInt(e, 10);
                }),
                e = this.coordinates[t[0]];
              return JSON.parse(JSON.stringify(e[t[1]]));
            }),
            (e.prototype.getCoordinates = function () {
              return this.coordinates.map(function (e) {
                return e.concat([e[0]]);
              });
            }),
            (e.prototype.updateCoordinate = function (e, t, r) {
              this.changed();
              var o = e.split('.'),
                e = parseInt(o[0], 10),
                o = parseInt(o[1], 10);
              0 === o
                ? ((this.properties.feature_type = 'ellipse'),
                  (this.properties.first = [t, r]),
                  (this.coordinates[e][o] = [t, r]))
                : 1 === o
                ? ((this.properties.second = [t, r]), (this.coordinates[e][o] = [t, r]))
                : 2 === o &&
                  ((this.properties.end = [t, r]),
                  (this.coordinates = (function (e, t, r, o) {
                    var n = e.project(t),
                      i = e.project(r),
                      s = m(n.x, 2),
                      a = m(i.x, 2),
                      c = m(p(_(t), _(r))),
                      u = 90 === c || -90 === c ? r : null,
                      n = 90 === c || -90 === c ? o : null,
                      i = 0;
                    u ||
                      (180 < (i = (s <= a ? 90 : -90) - c) && (i -= 360),
                      i < -180 && (i += 360),
                      (i = 360 - i),
                      (r = d(_(t), _(r))),
                      (r = h(_(t), r, s <= a ? 90 : -90)),
                      (u = r.geometry.coordinates),
                      180 < (c = m(p(_(t), _(o))) + (s <= a ? 90 : -90) - c) && (c -= 360),
                      c < -180 && (c += 360),
                      (o = d(_(t), _(o))),
                      (c = h(_(t), o, c)),
                      (n = c.geometry.coordinates));
                    (n = (function (e, t, r, o) {
                      var n = e.project(t),
                        i = e.project(r),
                        s = e.project(o),
                        a = m(n.x, 2),
                        c = m(n.y, 2),
                        o = m(i.x, 2),
                        n = m(i.y, 2),
                        i = m((a + o) / 2, 2),
                        n = m((c + n) / 2, 2),
                        c = Math.round(Math.pow(a - i, 2) + Math.pow(c - n, 2)),
                        s = (function (e, t, r, o, n) {
                          (e = Math.pow(r - e, 2)), (t = Math.pow(o - t, 2));
                          return Math.abs(Math.round((n * t) / (n - e)));
                        })(i, n, s.x, s.y, c),
                        o = m((o - a) / 32, 2),
                        u = (function (e, t, r, o, n, i, s) {
                          for (var a = [], c = [], u = -1; u <= s + 1; u++) {
                            var l = u;
                            -1 === u
                              ? (l = 0.3)
                              : 0 === u
                              ? (l = 0.6)
                              : u === s
                              ? (l = s - 0.6)
                              : u === s + 1 && (l = s - 0.3);
                            var p = m(r + l * o, 2),
                              l = (function (e, t, r, o) {
                                return Math.abs(m(Math.sqrt(o - (o * Math.pow(t - e, 2)) / r), 2));
                              })(e, p, n, i);
                            a.push([p, m(t - l, 2)]), c.push([p, m(t + l, 2)]);
                          }
                          return [a, c];
                        })(i, n, a, o, c, s, 32),
                        l = [];
                      l.push(_(t));
                      for (var p = 0, d = u[0].length; p < d; p++) {
                        var h = e.unproject([u[0][p][0], u[0][p][1]]);
                        l.push(_([m(h.lng, 7), m(h.lat, 7)]));
                      }
                      l.push(_(r));
                      for (var f = 0, y = u[0].length; f < y; f++) {
                        var g = e.unproject([u[1][f][0], u[1][f][1]]);
                        l.push(_([m(g.lng, 7), m(g.lat, 7)]));
                      }
                      return b(v(l)).geometry.coordinates;
                    })(e, t, u, n)),
                      (n = l(n));
                    return [f(n, i, { pivot: t }).geometry.coordinates[0].slice(0, -1)];
                  })(
                    this.ctx.map,
                    this.properties.first,
                    this.properties.second,
                    this.properties.end,
                  )));
              for (var n = 0; n < this.coordinates.length; n++)
                if (this.coordinates[n] && void 0 !== this.ctx.options.decimalPointNum)
                  for (var i = 0; i < this.coordinates[n].length; i++)
                    (this.coordinates[n][i][0] = Number(
                      this.coordinates[n][i][0].toFixed(this.ctx.options.decimalPointNum),
                    )),
                      (this.coordinates[n][i][1] = Number(
                        this.coordinates[n][i][1].toFixed(this.ctx.options.decimalPointNum),
                      ));
              void 0 === this.coordinates[e] && (this.coordinates[e] = []);
            }),
            (t.exports = e);
        },
        {
          './feature': 195,
          '@turf/bearing': 12,
          '@turf/convex': 18,
          '@turf/destination': 19,
          '@turf/distance': 20,
          '@turf/helpers': 21,
          '@turf/transform-rotate': 39,
        },
      ],
      195: [
        function (e, t, r) {
          'use strict';
          var o = e('../third_party/hat/index'),
            n = e('../constants'),
            e = function (e, t) {
              (this.ctx = e),
                (this.properties = t.properties || {}),
                (this.coordinates = t.geometry.coordinates),
                (this.id = t.id || o()),
                (this.type = t.geometry.type);
            };
          (e.prototype.changed = function () {
            this.ctx.store.featureChanged(this.id);
          }),
            (e.prototype.incomingCoords = function (e) {
              this.setCoordinates(e);
            }),
            (e.prototype.setCoordinates = function (e) {
              (this.coordinates = e), this.changed();
            }),
            (e.prototype.getCoordinates = function () {
              return JSON.parse(JSON.stringify(this.coordinates));
            }),
            (e.prototype.setProperty = function (e, t) {
              this.properties[e] = t;
            }),
            (e.prototype.deleteProperty = function (e) {
              this.properties.hasOwnProperty(e) && delete this.properties[e];
            }),
            (e.prototype.toGeoJSON = function () {
              return JSON.parse(
                JSON.stringify({
                  id: this.id,
                  type: n.geojsonTypes.FEATURE,
                  properties: this.properties,
                  geometry: { coordinates: this.getCoordinates(), type: this.type },
                }),
              );
            }),
            (e.prototype.internal = function (e) {
              var t = {
                id: this.id,
                meta: n.meta.FEATURE,
                'meta:type': this.type,
                active: n.activeStates.INACTIVE,
                mode: e,
                custom_style: n.customStyle.CLOSE,
              };
              if (this.ctx.options.userProperties)
                for (var r in this.properties)
                  'custom_style' === r
                    ? (t.custom_style = this.properties[r] || n.customStyle.CLOSE)
                    : 'feature_type' === r
                    ? (t.feature_type = this.properties[r])
                    : (t['user_' + r] = this.properties[r]);
              return {
                type: n.geojsonTypes.FEATURE,
                properties: t,
                geometry: { coordinates: this.getCoordinates(), type: this.type },
              };
            }),
            (t.exports = e);
        },
        { '../constants': 172, '../third_party/hat/index': 266 },
      ],
      196: [
        function (e, t, r) {
          'use strict';
          function u(e) {
            if (Array.isArray(e)) {
              for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
              return r;
            }
            return Array.from(e);
          }
          var d = e('@turf/helpers').round,
            p = e('@turf/helpers').lineString,
            a = e('@turf/length').default,
            c = e('@turf/line-slice-along').default,
            h = e('@turf/bezier-spline').default,
            o = e('./feature'),
            e = function (e, t) {
              o.call(this, e, t);
            };
          ((e.prototype = Object.create(o.prototype)).isValid = function () {
            return 1 < this.coordinates.length;
          }),
            (e.prototype.addCoordinate = function (e, t, r) {
              this.changed();
              e = parseInt(e, 10);
              this.coordinates.splice(e, 0, [t, r]);
            }),
            (e.prototype.getCoordinate = function (e) {
              e = parseInt(e, 10);
              return JSON.parse(JSON.stringify(this.coordinates[e]));
            }),
            (e.prototype.removeCoordinate = function (e) {
              this.changed(), this.coordinates.splice(parseInt(e, 10), 1);
            }),
            (e.prototype.updateCoordinate = function (e, t, r, o, n) {
              var i = parseInt(e, 10);
              if (0 === i)
                (this.properties.feature_type = 'line_arrow'),
                  (this.properties.start = [t, r]),
                  (this.coordinates[i] = [t, r]);
              else if (1 <= i) {
                var s = null,
                  e = this.properties.start_knee_point,
                  i = this.properties.end_knee_point;
                o && n
                  ? this.properties.start &&
                    this.properties.start[0] === o &&
                    this.properties.start[1] === n
                    ? ((this.properties.start = [t, r]), (s = 'start'))
                    : this.properties.end &&
                      this.properties.end[0] === o &&
                      this.properties.end[1] === n
                    ? ((this.properties.end = [t, r]), (s = 'end'))
                    : e && e[0] === o && e[1] === n
                    ? ((e = [t, r]), (s = 'start_knee_point'))
                    : i && i[0] === o && i[1] === n
                    ? ((i = [t, r]), (s = 'end_knee_point'))
                    : ['curve', 'curve-dashed'].includes(this.properties.shape_line_type) &&
                      10 < this.coordinates.length
                    ? ((e = [t, r]), (i = [t, r]), (s = 'curve_knee_point'))
                    : (this.properties.end = [t, r])
                  : (this.properties.end = [t, r]);
                (r = {
                  startArrowType: this.properties.shape_start_arrow_type || 'none',
                  endArrowType: this.properties.shape_end_arrow_type || 'normal',
                  lineType: this.properties.shape_line_type || 'solid',
                }),
                  (s = (function (e, t, r, o, n, i, s) {
                    var a = [];
                    'solid' === t.lineType || 'dashed' === t.lineType
                      ? (a = [])
                      : 'elbow' === t.lineType || 'elbow-dashed' === t.lineType
                      ? ((a = (function (e, t, r, o, n, i) {
                          var s = e.project(t),
                            a = e.project(r),
                            t = d(s.x, 2),
                            r = d(s.y, 2),
                            s = d(a.x, 2),
                            a = d(a.y, 2),
                            s = d((s + t) / 2, 2),
                            a = d((a + r) / 2, 2),
                            t = s - d((s - t) / 2, 2),
                            r = a - d((a - r) / 2, 2),
                            o = o && 'start_knee_point' === i ? o : f(e, t, r, s, a, Math.PI / 2),
                            a = n && 'end_knee_point' === i ? n : f(e, t, r, s, a, -Math.PI / 2);
                          return [o, a];
                        })(e, r, o, n, i, s)),
                        (n = a[0]),
                        (i = a[1]))
                      : ('curve' !== t.lineType && 'curve-dashed' !== t.lineType) ||
                        ((c = (function (e, t, r, o, n, i) {
                          var s = e.project(t),
                            a = e.project(r),
                            c = d(s.x, 2),
                            u = d(s.y, 2),
                            l = d(a.x, 2),
                            s = d(a.y, 2),
                            a = d((l + c) / 2, 2),
                            l = d((s + u) / 2, 2),
                            s = a - d((a - c) / 3, 2),
                            c = l - d((l - u) / 3, 2),
                            u = f(e, s, c, a, l, Math.PI / 10),
                            a = f(e, s, c, a, l, (Math.PI / 10) * 11),
                            l = o && n && 'curve_knee_point' === i,
                            i = l ? y('curve', t, r, o, n) : y('curve', t, r, u, a);
                          if (i.start && i.end) {
                            (r = p(
                              l
                                ? [i.start, o, i.end]
                                : [i.start, u, [(t[0] + r[0]) / 2, (t[1] + r[1]) / 2], a, i.end],
                            )),
                              (r = h(r, { resolution: 2e3, sharpness: 0.85 }));
                            return {
                              kneePoints: l ? [o, n] : [i.start, i.end],
                              coords: r.geometry.coordinates,
                            };
                          }
                          return { kneePoints: [u, a], coords: [u, a] };
                        })(e, r, o, n, i, s)),
                        (a = c.coords),
                        (n = c.kneePoints[0]),
                        (i = c.kneePoints[1]));
                    s = [];
                    s =
                      'none' === t.startArrowType
                        ? l(0, 'start', t.lineType, r, o)
                        : 'normal' === t.startArrowType
                        ? m(e, 'start', t.lineType, r, o, n, i)
                        : 'hollow' === t.startArrowType
                        ? _(e, 'start', t.lineType, r, o, n, i)
                        : 'solid' === t.startArrowType
                        ? v(0, 'start', t.lineType, r, o)
                        : l(0, 'start', t.lineType, r, o);
                    var c = [];
                    c =
                      'none' === t.endArrowType
                        ? l(0, 'end', t.lineType, r, o)
                        : ('normal' === t.endArrowType
                            ? m
                            : 'hollow' === t.endArrowType
                            ? _
                            : 'solid' === t.endArrowType
                            ? v
                            : m)(e, 'end', t.lineType, r, o, n, i);
                    ('curve' !== t.lineType && 'curve-dashed' !== t.lineType) || (i = n = null);
                    return {
                      start_knee_point: n,
                      end_knee_point: i,
                      coords: [].concat(u(s), u(a), u(c)),
                    };
                  })(this.ctx.map, r, this.properties.start, this.properties.end, e, i, s));
                s.start_knee_point
                  ? (this.properties.start_knee_point = s.start_knee_point)
                  : delete this.properties.start_knee_point,
                  s.end_knee_point
                    ? (this.properties.end_knee_point = s.end_knee_point)
                    : delete this.properties.end_knee_point,
                  (this.coordinates = s.coords);
                for (var a = 0; a < this.coordinates.length - 1; a++)
                  this.coordinates[a] &&
                    void 0 !== this.ctx.options.decimalPointNum &&
                    ((this.coordinates[a][0] = Number(
                      this.coordinates[a][0].toFixed(this.ctx.options.decimalPointNum),
                    )),
                    (this.coordinates[a][1] = Number(
                      this.coordinates[a][1].toFixed(this.ctx.options.decimalPointNum),
                    )));
              }
              this.changed();
            });
          var f = function (e, t, r, o, n, i) {
              (r = r),
                (n = n),
                (i = i),
                (n = [
                  ((t = t) - (o = o)) * Math.cos(i) - (r - n) * Math.sin(i) + o,
                  (t - o) * Math.sin(i) + (r - n) * Math.cos(i) + n,
                ]),
                (n = e.unproject(n));
              return [n.lng, n.lat];
            },
            y = function (e, t, r, o, n) {
              var i = null,
                s = null;
              return (
                ['elbow', 'curve', 'elbow-dashed', 'curve-dashed'].includes(e) &&
                  t &&
                  r &&
                  t[0] !== r[0] &&
                  t[1] !== r[1] &&
                  o &&
                  n &&
                  ((n = o[0] === n[0] && o[1] === n[1] ? p([t, o, r]) : p([t, o, n, r])),
                  (r = a(n) / 10),
                  (r = c(n, r, 9 * r)) &&
                    0 < r.geometry.coordinates.length &&
                    ((i = r.geometry.coordinates[0]),
                    (s = r.geometry.coordinates[r.geometry.coordinates.length - 1]))),
                { start: i, end: s }
              );
            },
            g = function (e, t, r, o, n, i, s) {
              var a,
                c = 0,
                u = 0;
              return (
                'start' === t
                  ? (u = r.start
                      ? ((a = e.project(r.start)), (c = d(a.x, 2)), d(a.y, 2))
                      : ((c = o + d((i - o) / 10, 2)), n + d((s - n) / 10, 2)))
                  : 'end' === t &&
                    (u = r.end
                      ? ((r = e.project(r.end)), (c = d(r.x, 2)), d(r.y, 2))
                      : ((c = i - d((i - o) / 10, 2)), s - d((s - n) / 10, 2))),
                [c, u]
              );
            };
          function l(e, t, r, o, n) {
            return 'start' === t ? [o] : [n];
          }
          function m(e, t, r, o, n, i, s) {
            var a = e.project(o),
              c = e.project(n),
              u = d(a.x, 2),
              l = d(a.y, 2),
              a = d(c.x, 2),
              c = d(c.y, 2),
              i = y(r, o, n, i, s),
              s = g(e, t, i, u, l, a, c),
              i = s[0],
              s = s[1];
            return 'start' === t
              ? [o, f(e, i, s, u, l, Math.PI / 6), o, f(e, i, s, u, l, -Math.PI / 6), o]
              : [n, f(e, i, s, a, c, Math.PI / 6), n, f(e, i, s, a, c, -Math.PI / 6), n];
          }
          function _(e, t, r, o, n, i, s) {
            var a = e.project(o),
              c = e.project(n),
              u = d(a.x, 2),
              l = d(a.y, 2),
              a = d(c.x, 2),
              c = d(c.y, 2),
              i = y(r, o, n, i, s),
              s = g(e, t, i, u, l, a, c),
              i = s[0],
              s = s[1];
            if ('start' === t) {
              var t = f(e, i, s, u, l, Math.PI / 9),
                l = f(e, i, s, u, l, -Math.PI / 9),
                p = [(t[0] + l[0]) / 2, (t[1] + l[1]) / 2];
              return [p, t, o, l, p];
            }
            (p = f(e, i, s, a, c, Math.PI / 9)),
              (a = f(e, i, s, a, c, -Math.PI / 9)),
              (c = [(p[0] + a[0]) / 2, (p[1] + a[1]) / 2]);
            return [c, p, n, a, c];
          }
          function v(e, t, r, o, n) {
            return 'start' === t ? [o] : [n];
          }
          t.exports = e;
        },
        {
          './feature': 195,
          '@turf/bezier-spline': 13,
          '@turf/helpers': 21,
          '@turf/length': 24,
          '@turf/line-slice-along': 28,
        },
      ],
      197: [
        function (e, t, r) {
          'use strict';
          var o = e('./feature'),
            e = function (e, t) {
              o.call(this, e, t);
            };
          ((e.prototype = Object.create(o.prototype)).isValid = function () {
            return 1 < this.coordinates.length;
          }),
            (e.prototype.addCoordinate = function (e, t, r) {
              this.changed();
              e = parseInt(e, 10);
              this.coordinates.splice(e, 0, [t, r]);
            }),
            (e.prototype.getCoordinate = function (e) {
              e = parseInt(e, 10);
              return JSON.parse(JSON.stringify(this.coordinates[e]));
            }),
            (e.prototype.removeCoordinate = function (e) {
              this.changed(), this.coordinates.splice(parseInt(e, 10), 1);
            }),
            (e.prototype.updateCoordinate = function (e, t, r) {
              e = parseInt(e, 10);
              (this.properties.feature_type = 'line_string'), (this.coordinates[e] = [t, r]);
              for (var o = 0; o < this.coordinates.length - 1; o++)
                this.coordinates[o] &&
                  void 0 !== this.ctx.options.decimalPointNum &&
                  ((this.coordinates[o][0] = Number(
                    this.coordinates[o][0].toFixed(this.ctx.options.decimalPointNum),
                  )),
                  (this.coordinates[o][1] = Number(
                    this.coordinates[o][1].toFixed(this.ctx.options.decimalPointNum),
                  )));
              this.changed();
            }),
            (t.exports = e);
        },
        { './feature': 195 },
      ],
      198: [
        function (e, t, r) {
          'use strict';
          function o(e, t, r, o, n) {
            var i = r.split('.'),
              r = parseInt(i[0], 10),
              i = i[1] ? i.slice(1).join('.') : null;
            return e[r][t](i, o, n);
          }
          var n = e('./feature'),
            i = e('../constants'),
            s = e('../third_party/hat/index'),
            a = {
              MultiPoint: e('./point'),
              MultiLineString: e('./line_string'),
              MultiPolygon: e('./polygon'),
            },
            e = function (e, t) {
              if (
                (n.call(this, e, t),
                delete this.coordinates,
                (this.model = a[t.geometry.type]),
                void 0 === this.model)
              )
                throw new TypeError(t.geometry.type + ' is not a valid type');
              this.features = this._coordinatesToFeatures(t.geometry.coordinates);
            };
          ((e.prototype = Object.create(n.prototype))._coordinatesToFeatures = function (e) {
            var t = this,
              r = this.model.bind(this);
            return e.map(function (e) {
              return new r(t.ctx, {
                id: s(),
                type: i.geojsonTypes.FEATURE,
                properties: {},
                geometry: { coordinates: e, type: t.type.replace('Multi', '') },
              });
            });
          }),
            (e.prototype.isValid = function () {
              return this.features.every(function (e) {
                return e.isValid();
              });
            }),
            (e.prototype.setCoordinates = function (e) {
              (this.features = this._coordinatesToFeatures(e)), this.changed();
            }),
            (e.prototype.getCoordinate = function (e) {
              return o(this.features, 'getCoordinate', e);
            }),
            (e.prototype.getCoordinates = function () {
              return JSON.parse(
                JSON.stringify(
                  this.features.map(function (e) {
                    return e.type === i.geojsonTypes.POLYGON ? e.getCoordinates() : e.coordinates;
                  }),
                ),
              );
            }),
            (e.prototype.updateCoordinate = function (e, t, r) {
              o(this.features, 'updateCoordinate', e, t, r), this.changed();
            }),
            (e.prototype.addCoordinate = function (e, t, r) {
              o(this.features, 'addCoordinate', e, t, r), this.changed();
            }),
            (e.prototype.removeCoordinate = function (e) {
              o(this.features, 'removeCoordinate', e), this.changed();
            }),
            (e.prototype.getFeatures = function () {
              return this.features;
            }),
            (t.exports = e);
        },
        {
          '../constants': 172,
          '../third_party/hat/index': 266,
          './feature': 195,
          './line_string': 197,
          './point': 203,
          './polygon': 204,
        },
      ],
      199: [
        function (e, t, r) {
          'use strict';
          function S(e) {
            if (Array.isArray(e)) {
              for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
              return r;
            }
            return Array.from(e);
          }
          var w = e('@turf/helpers').round,
            I = e('@turf/helpers').lineString,
            T = e('@turf/bezier-spline').default,
            o = e('./feature'),
            e = function (e, t) {
              o.call(this, e, t),
                (this.coordinates = this.coordinates.map(function (e) {
                  return e.slice(0, -1);
                }));
            };
          ((e.prototype = Object.create(o.prototype)).isValid = function () {
            return (
              0 !== this.coordinates.length &&
              this.coordinates.every(function (e) {
                return 2 < e.length;
              })
            );
          }),
            (e.prototype.incomingCoords = function (e) {
              (this.coordinates = e.map(function (e) {
                return e.slice(0, -1);
              })),
                this.changed();
            }),
            (e.prototype.setCoordinates = function (e) {
              (this.coordinates = e), this.changed();
            }),
            (e.prototype.addCoordinate = function (e, t, r) {
              this.changed();
              e = e.split('.').map(function (e) {
                return parseInt(e, 10);
              });
              this.coordinates[e[0]].splice(e[1], 0, [t, r]);
            }),
            (e.prototype.removeCoordinate = function (e) {
              this.changed();
              var t = e.split('.').map(function (e) {
                  return parseInt(e, 10);
                }),
                e = this.coordinates[t[0]];
              e && (e.splice(t[1], 1), e.length < 3 && this.coordinates.splice(t[0], 1));
            }),
            (e.prototype.getCoordinate = function (e) {
              var t = e.split('.').map(function (e) {
                  return parseInt(e, 10);
                }),
                e = this.coordinates[t[0]];
              return JSON.parse(JSON.stringify(e[t[1]]));
            }),
            (e.prototype.getCoordinates = function () {
              return this.coordinates.map(function (e) {
                return e.concat([e[0]]);
              });
            }),
            (e.prototype.updateCoordinate = function (e, t, r) {
              this.changed();
              var o,
                n,
                i,
                s,
                a,
                c,
                u,
                l,
                p,
                d,
                h,
                f,
                y,
                g,
                m,
                _ = e.split('.'),
                v = parseInt(_[0], 10),
                b = parseInt(_[1], 10);
              0 === b
                ? ((this.properties.feature_type = 'offensive_arrow'),
                  (this.properties.start = [t, r]),
                  (this.coordinates[v][b] = [t, r]))
                : 1 === b
                ? ((this.properties.middle = [t, r]),
                  (this.coordinates =
                    ((n = this.ctx.map),
                    (i = this.properties.start),
                    (s = this.properties.middle),
                    (a = n.project(i)),
                    (c = n.project(s)),
                    (u = w(a.x, 2)),
                    (l = w(a.y, 2)),
                    (p = w(c.x, 2)),
                    (d = w(c.y, 2)),
                    (h = u + w((p - u) / 4, 2)),
                    (f = l + w((d - l) / 4, 2)),
                    (y = p - w((p - u) / 4, 2)),
                    (g = d - w((d - l) / 4, 2)),
                    (m = p - w((p - u) / 6, 2)),
                    (a = d - w((d - l) / 6, 2)),
                    (c = O(n, h, f, u, l, Math.PI / 2)),
                    (u = O(n, h, f, u, l, -Math.PI / 2)),
                    (l = O(n, y, g, p, d, Math.PI / 6)),
                    (y = O(n, y, g, p, d, -Math.PI / 6)),
                    (g = O(n, m, a, p, d, Math.PI / 9)),
                    (d = O(n, m, a, p, d, -Math.PI / 9)),
                    [[i, u, g, l, s, y, d, c]])))
                : 1 < b &&
                  ((this.properties.end = [t, r]),
                  (this.coordinates =
                    ((o = this.ctx.map),
                    (e = this.properties.start),
                    (_ = this.properties.middle),
                    (h = this.properties.end),
                    (f = o.project(e)),
                    (n = o.project(_)),
                    (m = o.project(h)),
                    (a = w(f.x, 2)),
                    (p = w(f.y, 2)),
                    (i = w(n.x, 2)),
                    (u = w(n.y, 2)),
                    (g = w(m.x, 2)),
                    (l = w(m.y, 2)),
                    (s = a + w((i - a) / 3, 2)),
                    (y = p + w((u - p) / 3, 2)),
                    (d = i - w((i - a) / 3, 2)),
                    (c = u - w((u - p) / 3, 2)),
                    (b = C(s, y, a, p, Math.PI / 2)),
                    (t = b[0]),
                    (r = b[1]),
                    (_ = o.unproject(b)),
                    (f = [_.lng, _.lat]),
                    (n = C(s, y, a, p, -Math.PI / 2)),
                    (m = n[0]),
                    (b = n[1]),
                    (_ = o.unproject(n)),
                    (s = [_.lng, _.lat]),
                    (y = C(d, c, i, u, Math.PI / 2)),
                    (a = y[0]),
                    (p = y[1]),
                    (n = o.unproject(y)),
                    (_ = [n.lng, n.lat]),
                    (y = C(d, c, i, u, -Math.PI / 2)),
                    (n = y[0]),
                    (d = y[1]),
                    (c = o.unproject(y)),
                    (y = [c.lng, c.lat]),
                    (c = m + w((a - m) / 2, 2)),
                    (m = b + w((p - b) / 2, 2)),
                    (b = o.unproject([c, m])),
                    (c = [b.lng, b.lat]),
                    (m = t + w((n - t) / 2, 2)),
                    (b = r + w((d - r) / 2, 2)),
                    (t = o.unproject([m, b])),
                    (r = [t.lng, t.lat]),
                    (m = g - w((g - i) / 4, 2)),
                    (b = l - w((l - u) / 4, 2)),
                    (t = g - w((g - i) / 6, 2)),
                    (i = l - w((l - u) / 6, 2)),
                    (u = O(o, m, b, g, l, Math.PI / 6)),
                    (m = O(o, m, b, g, l, -Math.PI / 6)),
                    (b = O(o, t, i, g, l, Math.PI / 9)),
                    (i = O(o, t, i, g, l, -Math.PI / 9)),
                    (p = Math.pow(a - g, 2) + Math.pow(p - l, 2)),
                    (l = Math.pow(n - g, 2) + Math.pow(d - l, 2)),
                    (b = T(I(l < p ? [s, _, b] : [s, c, b]), { resolution: 3e3, sharpness: 0.85 })),
                    (f = T(I(l < p ? [i, r, f] : [i, y, f]), { resolution: 3e3, sharpness: 0.85 })),
                    [
                      [e].concat(S(b.geometry.coordinates), [u, h, m], S(f.geometry.coordinates)),
                    ])));
              for (var E = 0; E < this.coordinates.length; E++)
                if (this.coordinates[E] && void 0 !== this.ctx.options.decimalPointNum)
                  for (var x = 0; x < this.coordinates[E].length; x++)
                    (this.coordinates[E][x][0] = Number(
                      this.coordinates[E][x][0].toFixed(this.ctx.options.decimalPointNum),
                    )),
                      (this.coordinates[E][x][1] = Number(
                        this.coordinates[E][x][1].toFixed(this.ctx.options.decimalPointNum),
                      ));
              void 0 === this.coordinates[v] && (this.coordinates[v] = []);
            });
          var C = function (e, t, r, o, n) {
              return [
                (e - r) * Math.cos(n) - (t - o) * Math.sin(n) + r,
                (e - r) * Math.sin(n) + (t - o) * Math.cos(n) + o,
              ];
            },
            O = function (e, t, r, o, n, i) {
              (i = C(t, r, o, n, i)), (i = e.unproject(i));
              return [i.lng, i.lat];
            };
          t.exports = e;
        },
        { './feature': 195, '@turf/bezier-spline': 13, '@turf/helpers': 21 },
      ],
      200: [
        function (e, t, r) {
          'use strict';
          function S(e) {
            if (Array.isArray(e)) {
              for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
              return r;
            }
            return Array.from(e);
          }
          var w = e('@turf/helpers').round,
            I = e('@turf/helpers').lineString,
            T = e('@turf/bezier-spline').default,
            o = e('./feature'),
            e = function (e, t) {
              o.call(this, e, t),
                (this.coordinates = this.coordinates.map(function (e) {
                  return e.slice(0, -1);
                }));
            };
          ((e.prototype = Object.create(o.prototype)).isValid = function () {
            return (
              0 !== this.coordinates.length &&
              this.coordinates.every(function (e) {
                return 2 < e.length;
              })
            );
          }),
            (e.prototype.incomingCoords = function (e) {
              (this.coordinates = e.map(function (e) {
                return e.slice(0, -1);
              })),
                this.changed();
            }),
            (e.prototype.setCoordinates = function (e) {
              (this.coordinates = e), this.changed();
            }),
            (e.prototype.addCoordinate = function (e, t, r) {
              this.changed();
              e = e.split('.').map(function (e) {
                return parseInt(e, 10);
              });
              this.coordinates[e[0]].splice(e[1], 0, [t, r]);
            }),
            (e.prototype.removeCoordinate = function (e) {
              this.changed();
              var t = e.split('.').map(function (e) {
                  return parseInt(e, 10);
                }),
                e = this.coordinates[t[0]];
              e && (e.splice(t[1], 1), e.length < 3 && this.coordinates.splice(t[0], 1));
            }),
            (e.prototype.getCoordinate = function (e) {
              var t = e.split('.').map(function (e) {
                  return parseInt(e, 10);
                }),
                e = this.coordinates[t[0]];
              return JSON.parse(JSON.stringify(e[t[1]]));
            }),
            (e.prototype.getCoordinates = function () {
              return this.coordinates.map(function (e) {
                return e.concat([e[0]]);
              });
            }),
            (e.prototype.updateCoordinate = function (e, t, r) {
              this.changed();
              var o,
                n,
                i,
                s,
                a,
                c,
                u,
                l,
                p,
                d,
                h,
                f,
                y,
                g,
                m,
                _ = e.split('.'),
                v = parseInt(_[0], 10),
                b = parseInt(_[1], 10);
              0 === b
                ? ((this.properties.feature_type = 'offensive_tail_arrow'),
                  (this.properties.start = [t, r]),
                  (this.coordinates[v][b] = [t, r]))
                : 1 === b
                ? ((this.properties.middle = [t, r]),
                  (this.coordinates =
                    ((n = this.ctx.map),
                    (i = this.properties.start),
                    (s = this.properties.middle),
                    (a = n.project(i)),
                    (c = n.project(s)),
                    (u = w(a.x, 2)),
                    (l = w(a.y, 2)),
                    (p = w(c.x, 2)),
                    (d = w(c.y, 2)),
                    (h = u + w((p - u) / 4, 2)),
                    (f = l + w((d - l) / 4, 2)),
                    (y = p - w((p - u) / 4, 2)),
                    (g = d - w((d - l) / 4, 2)),
                    (m = p - w((p - u) / 6, 2)),
                    (i = d - w((d - l) / 6, 2)),
                    (a = n.unproject([h, f])),
                    (c = [a.lng, a.lat]),
                    (a = O(n, h, f, u, l, Math.PI / 2)),
                    (u = O(n, h, f, u, l, -Math.PI / 2)),
                    (l = O(n, y, g, p, d, Math.PI / 6)),
                    (y = O(n, y, g, p, d, -Math.PI / 6)),
                    (g = O(n, m, i, p, d, Math.PI / 9)),
                    (d = O(n, m, i, p, d, -Math.PI / 9)),
                    [[c, u, g, l, s, y, d, a]])))
                : 1 < b &&
                  ((this.properties.end = [t, r]),
                  (this.coordinates =
                    ((o = this.ctx.map),
                    (e = this.properties.start),
                    (_ = this.properties.middle),
                    (h = this.properties.end),
                    (f = o.project(e)),
                    (n = o.project(_)),
                    (m = o.project(h)),
                    (i = w(f.x, 2)),
                    (p = w(f.y, 2)),
                    (c = w(n.x, 2)),
                    (u = w(n.y, 2)),
                    (g = w(m.x, 2)),
                    (l = w(m.y, 2)),
                    (s = i + w((c - i) / 3, 2)),
                    (y = p + w((u - p) / 3, 2)),
                    (d = c - w((c - i) / 3, 2)),
                    (a = u - w((u - p) / 3, 2)),
                    (b = o.unproject([s, y])),
                    (t = [b.lng, b.lat]),
                    (r = C(s, y, i, p, Math.PI / 2)),
                    (e = r[0]),
                    (_ = r[1]),
                    (f = o.unproject(r)),
                    (n = [f.lng, f.lat]),
                    (m = C(s, y, i, p, -Math.PI / 2)),
                    (b = m[0]),
                    (r = m[1]),
                    (f = o.unproject(m)),
                    (s = [f.lng, f.lat]),
                    (y = C(d, a, c, u, Math.PI / 2)),
                    (i = y[0]),
                    (p = y[1]),
                    (m = o.unproject(y)),
                    (f = [m.lng, m.lat]),
                    (y = C(d, a, c, u, -Math.PI / 2)),
                    (m = y[0]),
                    (d = y[1]),
                    (a = o.unproject(y)),
                    (y = [a.lng, a.lat]),
                    (a = b + w((i - b) / 2, 2)),
                    (b = r + w((p - r) / 2, 2)),
                    (r = o.unproject([a, b])),
                    (a = [r.lng, r.lat]),
                    (b = e + w((m - e) / 2, 2)),
                    (r = _ + w((d - _) / 2, 2)),
                    (e = o.unproject([b, r])),
                    (_ = [e.lng, e.lat]),
                    (b = g - w((g - c) / 4, 2)),
                    (r = l - w((l - u) / 4, 2)),
                    (e = g - w((g - c) / 6, 2)),
                    (c = l - w((l - u) / 6, 2)),
                    (u = O(o, b, r, g, l, Math.PI / 6)),
                    (b = O(o, b, r, g, l, -Math.PI / 6)),
                    (r = O(o, e, c, g, l, Math.PI / 9)),
                    (c = O(o, e, c, g, l, -Math.PI / 9)),
                    (p = Math.pow(i - g, 2) + Math.pow(p - l, 2)),
                    (l = Math.pow(m - g, 2) + Math.pow(d - l, 2)),
                    (r = T(I(l < p ? [s, f, r] : [s, a, r]), { resolution: 3e3, sharpness: 0.85 })),
                    (n = T(I(l < p ? [c, _, n] : [c, y, n]), { resolution: 3e3, sharpness: 0.85 })),
                    [
                      [t].concat(S(r.geometry.coordinates), [u, h, b], S(n.geometry.coordinates)),
                    ])));
              for (var E = 0; E < this.coordinates.length; E++)
                if (this.coordinates[E] && void 0 !== this.ctx.options.decimalPointNum)
                  for (var x = 0; x < this.coordinates[E].length; x++)
                    (this.coordinates[E][x][0] = Number(
                      this.coordinates[E][x][0].toFixed(this.ctx.options.decimalPointNum),
                    )),
                      (this.coordinates[E][x][1] = Number(
                        this.coordinates[E][x][1].toFixed(this.ctx.options.decimalPointNum),
                      ));
              void 0 === this.coordinates[v] && (this.coordinates[v] = []);
            });
          var C = function (e, t, r, o, n) {
              return [
                (e - r) * Math.cos(n) - (t - o) * Math.sin(n) + r,
                (e - r) * Math.sin(n) + (t - o) * Math.cos(n) + o,
              ];
            },
            O = function (e, t, r, o, n, i) {
              (i = C(t, r, o, n, i)), (i = e.unproject(i));
              return [i.lng, i.lat];
            };
          t.exports = e;
        },
        { './feature': 195, '@turf/bezier-spline': 13, '@turf/helpers': 21 },
      ],
      201: [
        function (e, t, r) {
          'use strict';
          function i(e) {
            if (Array.isArray(e)) {
              for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
              return r;
            }
            return Array.from(e);
          }
          var s = e('@turf/helpers').lineString,
            a = e('@turf/helpers').point,
            c = e('@turf/bearing').default,
            u = e('@turf/transform-translate').default,
            o = e('./feature'),
            e = function (e, t) {
              o.call(this, e, t),
                (this.coordinates = this.coordinates.map(function (e) {
                  return e.slice(0, -1);
                }));
            };
          function l(e, t, r) {
            var o = 2 < arguments.length && void 0 !== r && r;
            if (!e) return [[]];
            r = e[0];
            if (r.length < 2) return e;
            !o ||
              (2 <= (n = r.length) &&
                r[n - 2][0] === r[n - 1][0] &&
                r[n - 2][1] === r[n - 1][1] &&
                (r = r.slice(0, -1)));
            var o = c(a(r[1]), a(r[0])),
              n = 2 < r.length ? c(a(r[1]), a(r[2])) : c(a(r[0]), a(r[1])),
              o = 360 <= o + n ? (o + n - 360) / 2 : (o + n) / 2,
              n = t.distance,
              t = t.isClockwise;
            t && o < 0 ? (o += 180) : !t && 0 < o && (o -= 180);
            (o = u(s([].concat(i(r))), n / 1e3, o)),
              (o = [].concat(i(o.geometry.coordinates)).reverse());
            return [[].concat(i(r), i(o))];
          }
          ((e.prototype = Object.create(o.prototype)).isValid = function () {
            return (
              0 !== this.coordinates.length &&
              this.coordinates.every(function (e) {
                return 2 < e.length;
              })
            );
          }),
            (e.prototype.incomingCoords = function (e) {
              (this.coordinates = e.map(function (e) {
                return e.slice(0, -1);
              })),
                this.changed();
            }),
            (e.prototype.setCoordinates = function (e) {
              (this.coordinates = e), this.changed();
            }),
            (e.prototype.addCoordinate = function (e, t, r) {
              this.changed();
              e = e.split('.').map(function (e) {
                return parseInt(e, 10);
              });
              this.coordinates[e[0]].splice(e[1], 0, [t, r]);
            }),
            (e.prototype.removeCoordinate = function (e) {
              this.changed();
              var t = e.split('.').map(function (e) {
                  return parseInt(e, 10);
                }),
                e = this.coordinates[t[0]];
              e && (e.splice(t[1], 1), e.length < 3 && this.coordinates.splice(t[0], 1));
            }),
            (e.prototype.getCoordinate = function (e) {
              var t = e.split('.').map(function (e) {
                  return parseInt(e, 10);
                }),
                e = this.coordinates[t[0]];
              return JSON.parse(JSON.stringify(e[t[1]]));
            }),
            (e.prototype.getCoordinates = function () {
              return this.coordinates.map(function (e) {
                return e.concat([e[0]]);
              });
            }),
            (e.prototype.updateCoordinate = function (e, t, r) {
              this.changed();
              var o = e.split('.'),
                e = parseInt(o[0], 10),
                o = parseInt(o[1], 10);
              void 0 === this.initCoordinates && (this.initCoordinates = []),
                void 0 === this.initCoordinates[e] && (this.initCoordinates[e] = []),
                0 === o
                  ? ((this.properties.feature_type = 'parallel_polygon'),
                    (this.initCoordinates[e][o] = [t, r]),
                    (this.coordinates[e][o] = [t, r]))
                  : 1 <= o &&
                    ((this.initCoordinates[e][o] = [t, r]),
                    (this.coordinates = l(this.initCoordinates, this.properties)));
              for (var n = 0; n < this.coordinates.length; n++)
                if (this.coordinates[n] && void 0 !== this.ctx.options.decimalPointNum)
                  for (var i = 0; i < this.coordinates[n].length; i++)
                    (this.coordinates[n][i][0] = Number(
                      this.coordinates[n][i][0].toFixed(this.ctx.options.decimalPointNum),
                    )),
                      (this.coordinates[n][i][1] = Number(
                        this.coordinates[n][i][1].toFixed(this.ctx.options.decimalPointNum),
                      ));
              void 0 === this.coordinates[e] && (this.coordinates[e] = []);
            }),
            (e.prototype.updateCoordinate2 = function () {
              this.coordinates = l(this.initCoordinates, this.properties, !0);
              for (var e = 0; e < this.coordinates.length; e++)
                if (this.coordinates[e] && void 0 !== this.ctx.options.decimalPointNum)
                  for (var t = 0; t < this.coordinates[e].length; t++)
                    (this.coordinates[e][t][0] = Number(
                      this.coordinates[e][t][0].toFixed(this.ctx.options.decimalPointNum),
                    )),
                      (this.coordinates[e][t][1] = Number(
                        this.coordinates[e][t][1].toFixed(this.ctx.options.decimalPointNum),
                      ));
            }),
            (t.exports = e);
        },
        {
          './feature': 195,
          '@turf/bearing': 12,
          '@turf/helpers': 21,
          '@turf/transform-translate': 40,
        },
      ],
      202: [
        function (e, t, r) {
          'use strict';
          function J(e) {
            if (Array.isArray(e)) {
              for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
              return r;
            }
            return Array.from(e);
          }
          var W = e('@turf/helpers').round,
            Y = e('@turf/helpers').lineString,
            K = e('@turf/bezier-spline').default,
            o = e('./feature'),
            e = function (e, t) {
              o.call(this, e, t),
                (this.coordinates = this.coordinates.map(function (e) {
                  return e.slice(0, -1);
                }));
            };
          ((e.prototype = Object.create(o.prototype)).isValid = function () {
            return (
              0 !== this.coordinates.length &&
              this.coordinates.every(function (e) {
                return 2 < e.length;
              })
            );
          }),
            (e.prototype.incomingCoords = function (e) {
              (this.coordinates = e.map(function (e) {
                return e.slice(0, -1);
              })),
                this.changed();
            }),
            (e.prototype.setCoordinates = function (e) {
              (this.coordinates = e), this.changed();
            }),
            (e.prototype.addCoordinate = function (e, t, r) {
              this.changed();
              e = e.split('.').map(function (e) {
                return parseInt(e, 10);
              });
              this.coordinates[e[0]].splice(e[1], 0, [t, r]);
            }),
            (e.prototype.removeCoordinate = function (e) {
              this.changed();
              var t = e.split('.').map(function (e) {
                  return parseInt(e, 10);
                }),
                e = this.coordinates[t[0]];
              e && (e.splice(t[1], 1), e.length < 3 && this.coordinates.splice(t[0], 1));
            }),
            (e.prototype.getCoordinate = function (e) {
              var t = e.split('.').map(function (e) {
                  return parseInt(e, 10);
                }),
                e = this.coordinates[t[0]];
              return JSON.parse(JSON.stringify(e[t[1]]));
            }),
            (e.prototype.getCoordinates = function () {
              return this.coordinates.map(function (e) {
                return e.concat([e[0]]);
              });
            }),
            (e.prototype.updateCoordinate = function (e, t, r, o, n) {
              this.changed();
              var i = e.split('.'),
                s = parseInt(i[0], 10),
                a = parseInt(i[1], 10);
              0 === a
                ? ((this.properties.feature_type = 'pincer_attack_arrow'),
                  (this.properties.start = [t, r]),
                  (this.coordinates[s][a] = [t, r]))
                : 1 === a
                ? ((this.properties.middle = [t, r]), (this.coordinates[s][a] = [t, r]))
                : 1 < a &&
                  ((a = i = e = null),
                  this.properties.arrow1 &&
                    this.properties.arrow2 &&
                    2 === this.properties.arrow1.length &&
                    2 === this.properties.arrow2.length &&
                    this.properties.end &&
                    (this.properties.arrow1[0] === o && this.properties.arrow1[1] === n
                      ? ((e = [t, r]), (i = this.properties.arrow2), (a = this.properties.end))
                      : this.properties.arrow2[0] === o &&
                        this.properties.arrow2[1] === n &&
                        ((e = this.properties.arrow1), (i = [t, r]), (a = this.properties.end))),
                  (a = a || [t, r]),
                  (this.properties.end = a),
                  (i = (function (e, t, r, o, n, i) {
                    var s = e.project(t),
                      a = e.project(r),
                      c = e.project(o),
                      u = W(s.x, 2),
                      l = W(s.y, 2),
                      p = W(a.x, 2),
                      d = W(a.y, 2),
                      h = W((u + p) / 2, 2),
                      f = W((l + d) / 2, 2),
                      y = W(c.x, 2),
                      g = W(c.y, 2),
                      m = p + y - h,
                      _ = d + g - f,
                      v = u + y - h,
                      b = l + g - f,
                      E = p + W((h - p) / 2, 2),
                      x = d + W((f - d) / 2, 2),
                      S = u + W((h - u) / 2, 2),
                      w = l + W((f - l) / 2, 2),
                      I = y - W((y - m) / 3, 2),
                      T = g - W((g - _) / 3, 2),
                      C = y - W((y - v) / 3, 2),
                      O = g - W((g - b) / 3, 2);
                    n &&
                      i &&
                      ((B = e.project(n)),
                      (z = e.project(i)),
                      (I = W(B.x, 2)),
                      (T = W(B.y, 2)),
                      (C = W(z.x, 2)),
                      (O = W(z.y, 2)));
                    var P = h + W((y - h) / 4, 2),
                      A = f + W((g - f) / 4, 2),
                      M = e.unproject([h, f]),
                      L = [M.lng, M.lat],
                      N = e.unproject([P, A]),
                      F = [N.lng, N.lat],
                      R = e.unproject([I, T]),
                      j = [R.lng, R.lat],
                      k = e.unproject([C, O]),
                      D = [k.lng, k.lat],
                      U = I - W((I - p) / 6, 2),
                      G = T - W((T - d) / 6, 2),
                      V = I - W((I - p) / 9, 2),
                      o = T - W((T - d) / 9, 2),
                      s = H(U, G, I, T, Math.PI / 4),
                      a = H(U, G, I, T, -Math.PI / 4),
                      c = s[0],
                      m = s[1],
                      _ = a[0],
                      v = a[1],
                      b = $(e, U, G, I, T, Math.PI / 9),
                      n = $(e, U, G, I, T, -Math.PI / 9),
                      i = H(V, o, I, T, Math.PI / 18),
                      B = H(V, o, I, T, -Math.PI / 18),
                      z = i[0],
                      y = i[1],
                      g = B[0],
                      h = B[1],
                      f = e.unproject([z, y]),
                      M = [f.lng, f.lat],
                      N = e.unproject([g, h]),
                      R = [N.lng, N.lat],
                      k = C - W((C - u) / 6, 2),
                      s = O - W((O - l) / 6, 2),
                      a = C - W((C - u) / 9, 2),
                      U = O - W((O - l) / 9, 2),
                      G = H(k, s, C, O, Math.PI / 4),
                      V = H(k, s, C, O, -Math.PI / 4),
                      o = G[0],
                      I = G[1],
                      T = V[0],
                      i = V[1],
                      B = H(k, s, C, O, Math.PI / 9),
                      f = H(k, s, C, O, -Math.PI / 9),
                      N = B[0],
                      G = B[1],
                      V = f[0],
                      k = f[1],
                      s = e.unproject([N, G]),
                      B = [s.lng, s.lat],
                      f = e.unproject([V, k]),
                      N = [f.lng, f.lat],
                      G = H(a, U, C, O, Math.PI / 18),
                      s = H(a, U, C, O, -Math.PI / 18),
                      V = G[0],
                      k = G[1],
                      f = s[0],
                      a = s[1],
                      U = e.unproject([V, k]),
                      C = [U.lng, U.lat],
                      O = e.unproject([f, a]),
                      G = [O.lng, O.lat],
                      s = Math.pow(z - P, 2) + Math.pow(y - A, 2),
                      U = Math.pow(g - P, 2) + Math.pow(h - A, 2),
                      O = Math.pow(V - P, 2) + Math.pow(k - A, 2),
                      A = Math.pow(f - P, 2) + Math.pow(a - A, 2),
                      p = U < s ? p + W((c - p) / 2, 2) : p + W((_ - p) / 2, 2),
                      d = U < s ? d + W((m - d) / 2, 2) : d + W((v - d) / 2, 2),
                      d = e.unproject([p, d]),
                      d = [d.lng, d.lat],
                      u = O < A ? u + W((T - u) / 2, 2) : u + W((o - u) / 2, 2),
                      l = O < A ? l + W((i - l) / 2, 2) : l + W((I - l) / 2, 2),
                      l = e.unproject([u, l]),
                      l = [l.lng, l.lat],
                      M = U < s ? [r, d, M, b, j, n, R] : [r, d, R, n, j, b, M],
                      t = O < A ? [C, B, D, N, G, l, t] : [G, N, D, B, C, l, t],
                      z = U < s ? g + W((E - g) / 2, 2) : z + W((E - z) / 2, 2),
                      y = U < s ? h + W((x - h) / 2, 2) : y + W((x - y) / 2, 2),
                      y = e.unproject([z, y]),
                      y = [y.lng, y.lat],
                      f = O < A ? V + W((S - V) / 2, 2) : f + W((S - f) / 2, 2),
                      a = O < A ? k + W((w - k) / 2, 2) : a + W((w - a) / 2, 2),
                      f = e.unproject([f, a]),
                      a = [f.lng, f.lat],
                      f = K(Y([M[0], M[1], M[2]]), { resolution: 3e3, sharpness: 0.85 }),
                      F = K(Y([M[6], y, F, a, t[0]]), { resolution: 3e3, sharpness: 0.85 }),
                      a = K(Y([t[4], t[5], t[6]]), { resolution: 3e3, sharpness: 0.85 }),
                      a = [
                        [L].concat(
                          J(f.geometry.coordinates),
                          [M[3], M[4], M[5]],
                          J(F.geometry.coordinates),
                          [t[1], t[2], t[3]],
                          J(a.geometry.coordinates),
                        ),
                      ];
                    return { arrow1: j, arrow2: D, coords: a };
                  })(
                    this.ctx.map,
                    this.properties.start,
                    this.properties.middle,
                    this.properties.end,
                    e,
                    i,
                  )),
                  (this.properties.arrow1 = i.arrow1),
                  (this.properties.arrow2 = i.arrow2),
                  (this.coordinates = i.coords));
              for (var c = 0; c < this.coordinates.length; c++)
                if (this.coordinates[c] && void 0 !== this.ctx.options.decimalPointNum)
                  for (var u = 0; u < this.coordinates[c].length; u++)
                    (this.coordinates[c][u][0] = Number(
                      this.coordinates[c][u][0].toFixed(this.ctx.options.decimalPointNum),
                    )),
                      (this.coordinates[c][u][1] = Number(
                        this.coordinates[c][u][1].toFixed(this.ctx.options.decimalPointNum),
                      ));
              void 0 === this.coordinates[s] && (this.coordinates[s] = []);
            });
          var H = function (e, t, r, o, n) {
              return [
                (e - r) * Math.cos(n) - (t - o) * Math.sin(n) + r,
                (e - r) * Math.sin(n) + (t - o) * Math.cos(n) + o,
              ];
            },
            $ = function (e, t, r, o, n, i) {
              (i = H(t, r, o, n, i)), (i = e.unproject(i));
              return [i.lng, i.lat];
            };
          t.exports = e;
        },
        { './feature': 195, '@turf/bezier-spline': 13, '@turf/helpers': 21 },
      ],
      203: [
        function (e, t, r) {
          'use strict';
          var o = e('./feature'),
            e = function (e, t) {
              o.call(this, e, t);
            };
          ((e.prototype = Object.create(o.prototype)).isValid = function () {
            return 'number' == typeof this.coordinates[0] && 'number' == typeof this.coordinates[1];
          }),
            (e.prototype.updateCoordinate = function (e, t, r) {
              (this.coordinates = 3 === arguments.length ? [t, r] : [e, t]),
                void 0 !== this.ctx.options.decimalPointNum &&
                  ((this.coordinates[0] = Number(
                    this.coordinates[0].toFixed(this.ctx.options.decimalPointNum),
                  )),
                  (this.coordinates[1] = Number(
                    this.coordinates[1].toFixed(this.ctx.options.decimalPointNum),
                  ))),
                this.changed();
            }),
            (e.prototype.getCoordinate = function () {
              return this.getCoordinates();
            }),
            (t.exports = e);
        },
        { './feature': 195 },
      ],
      204: [
        function (e, t, r) {
          'use strict';
          var o = e('./feature'),
            e = function (e, t) {
              o.call(this, e, t),
                (this.coordinates = this.coordinates.map(function (e) {
                  return e.slice(0, -1);
                }));
            };
          ((e.prototype = Object.create(o.prototype)).isValid = function () {
            return (
              0 !== this.coordinates.length &&
              this.coordinates.every(function (e) {
                return 2 < e.length;
              })
            );
          }),
            (e.prototype.incomingCoords = function (e) {
              (this.coordinates = e.map(function (e) {
                return e.slice(0, -1);
              })),
                this.changed();
            }),
            (e.prototype.setCoordinates = function (e) {
              (this.coordinates = e), this.changed();
            }),
            (e.prototype.addCoordinate = function (e, t, r) {
              this.changed();
              e = e.split('.').map(function (e) {
                return parseInt(e, 10);
              });
              this.coordinates[e[0]].splice(e[1], 0, [t, r]);
            }),
            (e.prototype.removeCoordinate = function (e) {
              this.changed();
              var t = e.split('.').map(function (e) {
                  return parseInt(e, 10);
                }),
                e = this.coordinates[t[0]];
              e && (e.splice(t[1], 1), e.length < 3 && this.coordinates.splice(t[0], 1));
            }),
            (e.prototype.getCoordinate = function (e) {
              var t = e.split('.').map(function (e) {
                  return parseInt(e, 10);
                }),
                e = this.coordinates[t[0]];
              return JSON.parse(JSON.stringify(e[t[1]]));
            }),
            (e.prototype.getCoordinates = function () {
              return this.coordinates.map(function (e) {
                return e.concat([e[0]]);
              });
            }),
            (e.prototype.updateCoordinate = function (e, t, r) {
              this.changed(), (this.properties.feature_type = 'polygon');
              var o = e.split('.'),
                e = parseInt(o[0], 10),
                o = parseInt(o[1], 10);
              void 0 === this.coordinates[e] && (this.coordinates[e] = []),
                (this.coordinates[e][o] = [t, r]);
              for (var n = 0; n < this.coordinates.length; n++)
                if (this.coordinates[n] && void 0 !== this.ctx.options.decimalPointNum)
                  for (var i = 0; i < this.coordinates[n].length; i++)
                    (this.coordinates[n][i][0] = Number(
                      this.coordinates[n][i][0].toFixed(this.ctx.options.decimalPointNum),
                    )),
                      (this.coordinates[n][i][1] = Number(
                        this.coordinates[n][i][1].toFixed(this.ctx.options.decimalPointNum),
                      ));
            }),
            (t.exports = e);
        },
        { './feature': 195 },
      ],
      205: [
        function (e, t, r) {
          'use strict';
          var o = e('./feature'),
            e = function (e, t) {
              o.call(this, e, t),
                (this.coordinates = this.coordinates.map(function (e) {
                  return e.slice(0, -1);
                }));
            };
          ((e.prototype = Object.create(o.prototype)).isValid = function () {
            return (
              0 !== this.coordinates.length &&
              this.coordinates.every(function (e) {
                return 2 < e.length;
              })
            );
          }),
            (e.prototype.incomingCoords = function (e) {
              (this.coordinates = e.map(function (e) {
                return e.slice(0, -1);
              })),
                this.changed();
            }),
            (e.prototype.setCoordinates = function (e) {
              (this.coordinates = e), this.changed();
            }),
            (e.prototype.addCoordinate = function (e, t, r) {
              this.changed();
              e = e.split('.').map(function (e) {
                return parseInt(e, 10);
              });
              this.coordinates[e[0]].splice(e[1], 0, [t, r]);
            }),
            (e.prototype.removeCoordinate = function (e) {
              this.changed();
              var t = e.split('.').map(function (e) {
                  return parseInt(e, 10);
                }),
                e = this.coordinates[t[0]];
              e && (e.splice(t[1], 1), e.length < 3 && this.coordinates.splice(t[0], 1));
            }),
            (e.prototype.getCoordinate = function (e) {
              var t = e.split('.').map(function (e) {
                  return parseInt(e, 10);
                }),
                e = this.coordinates[t[0]];
              return JSON.parse(JSON.stringify(e[t[1]]));
            }),
            (e.prototype.getCoordinates = function () {
              return this.coordinates.map(function (e) {
                return e.concat([e[0]]);
              });
            }),
            (e.prototype.updateCoordinate = function (e, t, r) {
              this.changed();
              var o = e.split('.'),
                e = parseInt(o[0], 10),
                o = parseInt(o[1], 10);
              0 === o
                ? ((this.properties.feature_type = 'rectangle'),
                  (this.properties.start = [t, r]),
                  (this.coordinates[e][o] = [t, r]))
                : 1 === o &&
                  ((this.properties.end = [t, r]),
                  (this.coordinates = (function (r, e) {
                    var t = r[0],
                      o = r[1],
                      n = e[0],
                      e = e[1];
                    n < t && ((i = t), (t = n), (n = i));
                    {
                      var i;
                      e < o && ((i = o), (o = e), (e = i));
                    }
                    var e = [t, o, n, e],
                      s = [
                        [e[0], e[1]],
                        [e[2], e[1]],
                        [e[2], e[3]],
                        [e[0], e[3]],
                      ],
                      a = 0;
                    s.map(function (e, t) {
                      return r[0] === e[0] && r[1] === e[1] && (a = t), null;
                    });
                    for (var c = [], u = a; u < s.length; u++) c.push(s[u]);
                    for (var l = 0; l < a; l++) c.push(s[l]);
                    return [c];
                  })(this.properties.start, [t, r])));
              for (var n = 0; n < this.coordinates.length; n++)
                if (this.coordinates[n] && void 0 !== this.ctx.options.decimalPointNum)
                  for (var i = 0; i < this.coordinates[n].length; i++)
                    (this.coordinates[n][i][0] = Number(
                      this.coordinates[n][i][0].toFixed(this.ctx.options.decimalPointNum),
                    )),
                      (this.coordinates[n][i][1] = Number(
                        this.coordinates[n][i][1].toFixed(this.ctx.options.decimalPointNum),
                      ));
              void 0 === this.coordinates[e] && (this.coordinates[e] = []);
            }),
            (t.exports = e);
        },
        { './feature': 195 },
      ],
      206: [
        function (e, t, r) {
          'use strict';
          var a = e('@turf/bearing').default,
            c = e('@turf/sector').default,
            u = e('@turf/distance').default,
            o = e('./feature'),
            e = function (e, t) {
              o.call(this, e, t),
                (this.coordinates = this.coordinates.map(function (e) {
                  return e.slice(0, -1);
                }));
            };
          ((e.prototype = Object.create(o.prototype)).isValid = function () {
            return (
              0 !== this.coordinates.length &&
              this.coordinates.every(function (e) {
                return 2 < e.length;
              })
            );
          }),
            (e.prototype.incomingCoords = function (e) {
              (this.coordinates = e.map(function (e) {
                return e.slice(0, -1);
              })),
                this.changed();
            }),
            (e.prototype.setCoordinates = function (e) {
              (this.coordinates = e), this.changed();
            }),
            (e.prototype.addCoordinate = function (e, t, r) {
              this.changed();
              e = e.split('.').map(function (e) {
                return parseInt(e, 10);
              });
              this.coordinates[e[0]].splice(e[1], 0, [t, r]);
            }),
            (e.prototype.removeCoordinate = function (e) {
              this.changed();
              var t = e.split('.').map(function (e) {
                  return parseInt(e, 10);
                }),
                e = this.coordinates[t[0]];
              e && (e.splice(t[1], 1), e.length < 3 && this.coordinates.splice(t[0], 1));
            }),
            (e.prototype.getCoordinate = function (e) {
              var t = e.split('.').map(function (e) {
                  return parseInt(e, 10);
                }),
                e = this.coordinates[t[0]];
              return JSON.parse(JSON.stringify(e[t[1]]));
            }),
            (e.prototype.getCoordinates = function () {
              return this.coordinates.map(function (e) {
                return e.concat([e[0]]);
              });
            }),
            (e.prototype.updateCoordinate = function (e, t, r) {
              this.changed();
              var o = e.split('.'),
                n = parseInt(o[0], 10),
                e = parseInt(o[1], 10);
              0 === e
                ? ((this.properties.feature_type = 'sector'),
                  (this.properties.center = [t, r]),
                  (this.coordinates[n][e] = [t, r]))
                : 1 === e
                ? ((this.properties.start = [t, r]), (this.coordinates[n][e] = [t, r]))
                : 2 === e &&
                  ((this.properties.end = [t, r]),
                  (this.coordinates =
                    ((o = this.properties.center),
                    (e = this.properties.start),
                    (t = [t, r]),
                    (r = a(o, e)),
                    (t = a(o, t)),
                    (e = u(o, e)),
                    [c(o, e, r, t).geometry.coordinates[0].slice(0, -1)])));
              for (var i = 0; i < this.coordinates.length; i++)
                if (this.coordinates[i] && void 0 !== this.ctx.options.decimalPointNum)
                  for (var s = 0; s < this.coordinates[i].length; s++)
                    (this.coordinates[i][s][0] = Number(
                      this.coordinates[i][s][0].toFixed(this.ctx.options.decimalPointNum),
                    )),
                      (this.coordinates[i][s][1] = Number(
                        this.coordinates[i][s][1].toFixed(this.ctx.options.decimalPointNum),
                      ));
              void 0 === this.coordinates[n] && (this.coordinates[n] = []);
            }),
            (t.exports = e);
        },
        { './feature': 195, '@turf/bearing': 12, '@turf/distance': 20, '@turf/sector': 37 },
      ],
      207: [
        function (e, t, r) {
          'use strict';
          var m = e('@turf/helpers').round,
            o = e('./feature'),
            e = function (e, t) {
              o.call(this, e, t),
                (this.coordinates = this.coordinates.map(function (e) {
                  return e.slice(0, -1);
                }));
            };
          ((e.prototype = Object.create(o.prototype)).isValid = function () {
            return (
              0 !== this.coordinates.length &&
              this.coordinates.every(function (e) {
                return 2 < e.length;
              })
            );
          }),
            (e.prototype.incomingCoords = function (e) {
              (this.coordinates = e.map(function (e) {
                return e.slice(0, -1);
              })),
                this.changed();
            }),
            (e.prototype.setCoordinates = function (e) {
              (this.coordinates = e), this.changed();
            }),
            (e.prototype.addCoordinate = function (e, t, r) {
              this.changed();
              e = e.split('.').map(function (e) {
                return parseInt(e, 10);
              });
              this.coordinates[e[0]].splice(e[1], 0, [t, r]);
            }),
            (e.prototype.removeCoordinate = function (e) {
              this.changed();
              var t = e.split('.').map(function (e) {
                  return parseInt(e, 10);
                }),
                e = this.coordinates[t[0]];
              e && (e.splice(t[1], 1), e.length < 3 && this.coordinates.splice(t[0], 1));
            }),
            (e.prototype.getCoordinate = function (e) {
              var t = e.split('.').map(function (e) {
                  return parseInt(e, 10);
                }),
                e = this.coordinates[t[0]];
              return JSON.parse(JSON.stringify(e[t[1]]));
            }),
            (e.prototype.getCoordinates = function () {
              return this.coordinates.map(function (e) {
                return e.concat([e[0]]);
              });
            }),
            (e.prototype.updateCoordinate = function (e, t, r) {
              this.changed();
              var o,
                n,
                i,
                s,
                a,
                c,
                u,
                l,
                p,
                d = e.split('.'),
                h = parseInt(d[0], 10),
                f = parseInt(d[1], 10);
              0 === f
                ? ((this.properties.feature_type = 'thin_straight_arrow'),
                  (this.properties.start = [t, r]),
                  (this.coordinates[h][f] = [t, r]))
                : 1 <= f &&
                  ((this.properties.end = [t, r]),
                  (this.coordinates =
                    ((o = this.ctx.map),
                    (n = this.properties.start),
                    (i = this.properties.end),
                    (s = o.project(n)),
                    (a = o.project(i)),
                    (c = m(s.x, 2)),
                    (u = m(s.y, 2)),
                    (l = m(a.x, 2)),
                    (p = m(a.y, 2)),
                    (e = c + m((l - c) / 6, 2)),
                    (d = u + m((p - u) / 6, 2)),
                    (f = l - m((l - c) / 4, 2)),
                    (t = p - m((p - u) / 4, 2)),
                    (r = l - m((l - c) / 6, 2)),
                    (s = p - m((p - u) / 6, 2)),
                    (a = _(o, e, d, c, u, Math.PI / 2)),
                    (c = _(o, e, d, c, u, -Math.PI / 2)),
                    (u = _(o, f, t, l, p, Math.PI / 6)),
                    (f = _(o, f, t, l, p, -Math.PI / 6)),
                    (t = _(o, r, s, l, p, Math.PI / 9)),
                    (p = _(o, r, s, l, p, -Math.PI / 9)),
                    [[n, c, t, u, i, f, p, a]])));
              for (var y = 0; y < this.coordinates.length; y++)
                if (this.coordinates[y] && void 0 !== this.ctx.options.decimalPointNum)
                  for (var g = 0; g < this.coordinates[y].length; g++)
                    (this.coordinates[y][g][0] = Number(
                      this.coordinates[y][g][0].toFixed(this.ctx.options.decimalPointNum),
                    )),
                      (this.coordinates[y][g][1] = Number(
                        this.coordinates[y][g][1].toFixed(this.ctx.options.decimalPointNum),
                      ));
              void 0 === this.coordinates[h] && (this.coordinates[h] = []);
            });
          var _ = function (e, t, r, o, n, i) {
            (r = r),
              (n = n),
              (i = i),
              (n = [
                ((t = t) - (o = o)) * Math.cos(i) - (r - n) * Math.sin(i) + o,
                (t - o) * Math.sin(i) + (r - n) * Math.cos(i) + n,
              ]),
              (n = e.unproject(n));
            return [n.lng, n.lat];
          };
          t.exports = e;
        },
        { './feature': 195, '@turf/helpers': 21 },
      ],
      208: [
        function (e, t, r) {
          'use strict';
          var m = e('@turf/helpers').round,
            o = e('./feature'),
            e = function (e, t) {
              o.call(this, e, t),
                (this.coordinates = this.coordinates.map(function (e) {
                  return e.slice(0, -1);
                }));
            };
          ((e.prototype = Object.create(o.prototype)).isValid = function () {
            return (
              0 !== this.coordinates.length &&
              this.coordinates.every(function (e) {
                return 2 < e.length;
              })
            );
          }),
            (e.prototype.incomingCoords = function (e) {
              (this.coordinates = e.map(function (e) {
                return e.slice(0, -1);
              })),
                this.changed();
            }),
            (e.prototype.setCoordinates = function (e) {
              (this.coordinates = e), this.changed();
            }),
            (e.prototype.addCoordinate = function (e, t, r) {
              this.changed();
              e = e.split('.').map(function (e) {
                return parseInt(e, 10);
              });
              this.coordinates[e[0]].splice(e[1], 0, [t, r]);
            }),
            (e.prototype.removeCoordinate = function (e) {
              this.changed();
              var t = e.split('.').map(function (e) {
                  return parseInt(e, 10);
                }),
                e = this.coordinates[t[0]];
              e && (e.splice(t[1], 1), e.length < 3 && this.coordinates.splice(t[0], 1));
            }),
            (e.prototype.getCoordinate = function (e) {
              var t = e.split('.').map(function (e) {
                  return parseInt(e, 10);
                }),
                e = this.coordinates[t[0]];
              return JSON.parse(JSON.stringify(e[t[1]]));
            }),
            (e.prototype.getCoordinates = function () {
              return this.coordinates.map(function (e) {
                return e.concat([e[0]]);
              });
            }),
            (e.prototype.updateCoordinate = function (e, t, r) {
              this.changed();
              var o,
                n,
                i,
                s,
                a,
                c,
                u,
                l,
                p,
                d = e.split('.'),
                h = parseInt(d[0], 10),
                f = parseInt(d[1], 10);
              0 === f
                ? ((this.properties.feature_type = 'thin_tail_arrow'),
                  (this.properties.start = [t, r]),
                  (this.coordinates[h][f] = [t, r]))
                : 1 <= f &&
                  ((this.properties.end = [t, r]),
                  (this.coordinates =
                    ((o = this.ctx.map),
                    (n = this.properties.start),
                    (i = this.properties.end),
                    (s = o.project(n)),
                    (a = o.project(i)),
                    (c = m(s.x, 2)),
                    (u = m(s.y, 2)),
                    (l = m(a.x, 2)),
                    (p = m(a.y, 2)),
                    (e = c + m((l - c) / 6, 2)),
                    (d = u + m((p - u) / 6, 2)),
                    (f = l - m((l - c) / 4, 2)),
                    (t = p - m((p - u) / 4, 2)),
                    (r = l - m((l - c) / 6, 2)),
                    (n = p - m((p - u) / 6, 2)),
                    (s = o.unproject([e, d])),
                    (a = [s.lng, s.lat]),
                    (s = _(o, e, d, c, u, Math.PI / 2)),
                    (c = _(o, e, d, c, u, -Math.PI / 2)),
                    (u = _(o, f, t, l, p, Math.PI / 6)),
                    (f = _(o, f, t, l, p, -Math.PI / 6)),
                    (t = _(o, r, n, l, p, Math.PI / 9)),
                    (p = _(o, r, n, l, p, -Math.PI / 9)),
                    [[a, c, t, u, i, f, p, s]])));
              for (var y = 0; y < this.coordinates.length; y++)
                if (this.coordinates[y] && void 0 !== this.ctx.options.decimalPointNum)
                  for (var g = 0; g < this.coordinates[y].length; g++)
                    (this.coordinates[y][g][0] = Number(
                      this.coordinates[y][g][0].toFixed(this.ctx.options.decimalPointNum),
                    )),
                      (this.coordinates[y][g][1] = Number(
                        this.coordinates[y][g][1].toFixed(this.ctx.options.decimalPointNum),
                      ));
              void 0 === this.coordinates[h] && (this.coordinates[h] = []);
            });
          var _ = function (e, t, r, o, n, i) {
            (r = r),
              (n = n),
              (i = i),
              (n = [
                ((t = t) - (o = o)) * Math.cos(i) - (r - n) * Math.sin(i) + o,
                (t - o) * Math.sin(i) + (r - n) * Math.cos(i) + n,
              ]),
              (n = e.unproject(n));
            return [n.lng, n.lat];
          };
          t.exports = e;
        },
        { './feature': 195, '@turf/helpers': 21 },
      ],
      209: [
        function (e, t, r) {
          'use strict';
          var o = e('./feature'),
            e = function (e, t) {
              o.call(this, e, t),
                (this.coordinates = this.coordinates.map(function (e) {
                  return e.slice(0, -1);
                }));
            };
          ((e.prototype = Object.create(o.prototype)).isValid = function () {
            return (
              0 !== this.coordinates.length &&
              this.coordinates.every(function (e) {
                return 2 < e.length;
              })
            );
          }),
            (e.prototype.incomingCoords = function (e) {
              (this.coordinates = e.map(function (e) {
                return e.slice(0, -1);
              })),
                this.changed();
            }),
            (e.prototype.setCoordinates = function (e) {
              (this.coordinates = e), this.changed();
            }),
            (e.prototype.addCoordinate = function (e, t, r) {
              this.changed();
              e = e.split('.').map(function (e) {
                return parseInt(e, 10);
              });
              this.coordinates[e[0]].splice(e[1], 0, [t, r]);
            }),
            (e.prototype.removeCoordinate = function (e) {
              this.changed();
              var t = e.split('.').map(function (e) {
                  return parseInt(e, 10);
                }),
                e = this.coordinates[t[0]];
              e && (e.splice(t[1], 1), e.length < 3 && this.coordinates.splice(t[0], 1));
            }),
            (e.prototype.getCoordinate = function (e) {
              var t = e.split('.').map(function (e) {
                  return parseInt(e, 10);
                }),
                e = this.coordinates[t[0]];
              return JSON.parse(JSON.stringify(e[t[1]]));
            }),
            (e.prototype.getCoordinates = function () {
              return this.coordinates.map(function (e) {
                return e.concat([e[0]]);
              });
            }),
            (e.prototype.updateCoordinate = function (e, t, r) {
              this.changed();
              var o = e.split('.'),
                e = parseInt(o[0], 10),
                o = parseInt(o[1], 10);
              0 === o
                ? ((this.properties.feature_type = 'triangle'),
                  (this.properties.start = [t, r]),
                  (this.coordinates[e][o] = [t, r]))
                : 1 === o
                ? ((this.properties.middle = [t, r]), (this.coordinates[e][o] = [t, r]))
                : 2 === o && ((this.properties.end = [t, r]), (this.coordinates[e][o] = [t, r]));
              for (var n = 0; n < this.coordinates.length; n++)
                if (this.coordinates[n] && void 0 !== this.ctx.options.decimalPointNum)
                  for (var i = 0; i < this.coordinates[n].length; i++)
                    (this.coordinates[n][i][0] = Number(
                      this.coordinates[n][i][0].toFixed(this.ctx.options.decimalPointNum),
                    )),
                      (this.coordinates[n][i][1] = Number(
                        this.coordinates[n][i][1].toFixed(this.ctx.options.decimalPointNum),
                      ));
              void 0 === this.coordinates[e] && (this.coordinates[e] = []);
            }),
            (t.exports = e);
        },
        { './feature': 195 },
      ],
      210: [
        function (e, t, r) {
          'use strict';
          var p = function (e, t) {
              if (Array.isArray(e)) return e;
              if (Symbol.iterator in Object(e))
                return (function (e, t) {
                  var r = [],
                    o = !0,
                    n = !1,
                    i = void 0;
                  try {
                    for (
                      var s, a = e[Symbol.iterator]();
                      !(o = (s = a.next()).done) && (r.push(s.value), !t || r.length !== t);
                      o = !0
                    );
                  } catch (e) {
                    (n = !0), (i = e);
                  } finally {
                    try {
                      !o && a.return && a.return();
                    } finally {
                      if (n) throw i;
                    }
                  }
                  return r;
                })(e, t);
              throw new TypeError('Invalid attempt to destructure non-iterable instance');
            },
            d = e('../constants').customStyle,
            h = {
              color: [
                'fillColor',
                'fillOutlineColor',
                'lineColor',
                'circleBorderColor',
                'circleColor',
              ],
              opacity: ['fillOpacity', 'lineOpacity', 'fillOutlineOpacity'],
              width: ['fillOutlineWidth', 'lineWidth', 'circleBorderRadius', 'circleRadius'],
              dasharray: ['fillOutlineDasharray', 'lineDasharray'],
              icon: ['iconImage', 'iconSize', 'iconRotate'],
            };
          t.exports = {
            setStyleProperties: function (e) {
              var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
              e.setProperty('custom_style', d.OPEN);
              var r = !0,
                o = !1,
                n = void 0;
              try {
                for (
                  var i = Object.entries(t)[Symbol.iterator]();
                  !(r = (l = i.next()).done);
                  r = !0
                ) {
                  var s,
                    a,
                    c = p(l.value, 2),
                    u = c[0],
                    l = c[1];
                  h.color.includes(u) && e.setProperty(u, l || '#55B1F3'),
                    h.opacity.includes(u) &&
                      ((s = void 0 === l ? 0.1 : parseFloat(l)) < 0 && (s = 0),
                      e.setProperty(u, s)),
                    h.width.includes(u) &&
                      ((c = void 0 === l ? 1 : parseFloat(l)) < 0 && (c = 0),
                      'circleBorderRadius' === u &&
                        ((s = void 0 === t.circleRadius ? void 0 : parseFloat(t.circleRadius)),
                        (c += parseFloat(s || e.properties.circleRadius || 4))),
                      e.setProperty(u, c)),
                    h.dasharray.includes(u) && e.setProperty(u, l || d.CLOSE),
                    h.icon.includes(u) &&
                      ('iconImage' === u
                        ? ((a = void 0 === l ? '' : l), e.setProperty(u, a))
                        : 'iconSize' === u
                        ? ((a = void 0 === l ? 1 : parseFloat(l)) < 0 && (a = 0),
                          e.setProperty(u, a))
                        : 'iconRotate' === u &&
                          ((l = void 0 === l ? 0 : parseFloat(l)), e.setProperty(u, l)));
                }
              } catch (e) {
                (o = !0), (n = e);
              } finally {
                try {
                  !r && i.return && i.return();
                } finally {
                  if (o) throw n;
                }
              }
            },
            deleteAllStyleProperties: function (t) {
              t.deleteProperty('custom_style'),
                h.color.forEach(function (e) {
                  t.deleteProperty(e);
                }),
                h.opacity.forEach(function (e) {
                  t.deleteProperty(e);
                }),
                h.width.forEach(function (e) {
                  t.deleteProperty(e);
                }),
                h.dasharray.forEach(function (e) {
                  t.deleteProperty(e);
                });
            },
          };
        },
        { '../constants': 172 },
      ],
      211: [
        function (e, t, r) {
          'use strict';
          function i(e, t, r) {
            return (
              t in e
                ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0,
                  })
                : (e[t] = r),
              e
            );
          }
          function o(e, t, r, o, n) {
            return (
              (e = 0 < arguments.length && void 0 !== e ? e : {}),
              (r = 2 < arguments.length && void 0 !== r ? r : {}),
              (n = 4 < arguments.length && void 0 !== n ? n : 4),
              'circle-radius' === t && 'circleBorderRadius' === o
                ? void 0 !== r.circleBorderRadius
                  ? i(
                      {},
                      t,
                      void 0 !== r.circleRadius
                        ? r.circleRadius + r.circleBorderRadius
                        : n + r.circleBorderRadius,
                    )
                  : {}
                : i({}, t, void 0 !== r[o] ? r[o] : e[t])
            );
          }
          var n = e('xtend');
          t.exports = function () {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            return arguments[1].map(function (e) {
              switch (e.id) {
                case 'gl-draw-polygon-fill-inactive':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'fill-color', t.inactive, 'fillColor'),
                      o(e.paint, 'fill-outline-color', t.inactive, 'fillOutlineColor'),
                      o(e.paint, 'fill-opacity', t.inactive, 'fillOpacity'),
                    ),
                  });
                case 'gl-draw-polygon-fill-inactive-custom':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'fill-color', t.inactive, 'user_fillColor'),
                      o(e.paint, 'fill-outline-color', t.inactive, 'user_fillOutlineColor'),
                      o(e.paint, 'fill-opacity', t.inactive, 'user_fillOpacity'),
                    ),
                  });
                case 'gl-draw-polygon-fill-inactive-lock':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'fill-color', t.inactive, 'fillColor'),
                      o(e.paint, 'fill-outline-color', t.inactive, 'fillOutlineColor'),
                      o(e.paint, 'fill-opacity', t.inactive, 'fillOpacity'),
                    ),
                  });
                case 'gl-draw-polygon-fill-inactive-custom-lock':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'fill-color', t.inactive, 'user_fillColor'),
                      o(e.paint, 'fill-outline-color', t.inactive, 'user_fillOutlineColor'),
                      o(e.paint, 'fill-opacity', t.inactive, 'user_fillOpacity'),
                    ),
                  });
                case 'gl-draw-polygon-fill-active':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'fill-color', t.active, 'fillColor'),
                      o(e.paint, 'fill-outline-color', t.active, 'fillOutlineColor'),
                      o(e.paint, 'fill-opacity', t.active, 'fillOpacity'),
                    ),
                  });
                case 'gl-draw-polygon-stroke-inactive':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'line-color', t.inactive, 'fillOutlineColor'),
                      o(e.paint, 'line-width', t.inactive, 'fillOutlineWidth'),
                      o(e.paint, 'line-opacity', t.inactive, 'fillOutlineOpacity'),
                    ),
                  });
                case 'gl-draw-polygon-stroke-inactive-custom1':
                case 'gl-draw-polygon-stroke-inactive-custom2':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'line-color', t.inactive, 'user_fillOutlineColor'),
                      o(e.paint, 'line-width', t.inactive, 'user_fillOutlineWidth'),
                      o(e.paint, 'line-opacity', t.inactive, 'user_fillOutlineOpacity'),
                    ),
                  });
                case 'gl-draw-polygon-stroke-inactive-lock':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'line-color', t.inactive, 'fillOutlineColor'),
                      o(e.paint, 'line-width', t.inactive, 'fillOutlineWidth'),
                      o(e.paint, 'line-opacity', t.inactive, 'fillOutlineOpacity'),
                    ),
                  });
                case 'gl-draw-polygon-stroke-inactive-custom1-lock':
                case 'gl-draw-polygon-stroke-inactive-custom2-lock':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'line-color', t.inactive, 'user_fillOutlineColor'),
                      o(e.paint, 'line-width', t.inactive, 'user_fillOutlineWidth'),
                      o(e.paint, 'line-opacity', t.inactive, 'user_fillOutlineOpacity'),
                    ),
                  });
                case 'gl-draw-polygon-stroke-active':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'line-color', t.active, 'fillOutlineColor'),
                      o(e.paint, 'line-width', t.active, 'fillOutlineWidth'),
                      o(e.paint, 'line-opacity', t.active, 'fillOutlineOpacity'),
                    ),
                  });
                case 'gl-draw-line-inactive':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'line-color', t.inactive, 'lineColor'),
                      o(e.paint, 'line-width', t.inactive, 'lineWidth'),
                    ),
                  });
                case 'gl-draw-line-inactive-custom1':
                case 'gl-draw-line-inactive-custom2':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'line-color', t.inactive, 'user_lineColor'),
                      o(e.paint, 'line-opacity', t.inactive, 'user_lineOpacity'),
                      o(e.paint, 'line-width', t.inactive, 'user_lineWidth'),
                    ),
                  });
                case 'gl-draw-line-inactive-lock':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'line-color', t.inactive, 'lineColor'),
                      o(e.paint, 'line-width', t.inactive, 'lineWidth'),
                    ),
                  });
                case 'gl-draw-line-inactive-custom1-lock':
                case 'gl-draw-line-inactive-custom2-lock':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'line-color', t.inactive, 'user_lineColor'),
                      o(e.paint, 'line-opacity', t.inactive, 'user_lineOpacity'),
                      o(e.paint, 'line-width', t.inactive, 'user_lineWidth'),
                    ),
                  });
                case 'gl-draw-line-active':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'line-color', t.active, 'lineColor'),
                      o(e.paint, 'line-width', t.active, 'lineWidth'),
                    ),
                  });
                case 'gl-draw-polygon-midpoint':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'circle-color', t.active, 'circleColor'),
                      o(e.paint, 'circle-radius', t.inactive, 'circleRadius', 4),
                    ),
                  });
                case 'gl-draw-polygon-and-line-vertex-stroke-inactive':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'circle-color', t.inactive, 'circleBorderColor'),
                      o(e.paint, 'circle-radius', t.inactive, 'circleBorderRadius', 4),
                    ),
                  });
                case 'gl-draw-polygon-and-line-vertex-inactive':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'circle-color', t.active, 'circleColor'),
                      o(e.paint, 'circle-radius', t.inactive, 'circleRadius', 4),
                    ),
                  });
                case 'gl-draw-point-point-stroke-inactive':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'circle-color', t.inactive, 'circleBorderColor'),
                      o(e.paint, 'circle-radius', t.inactive, 'circleBorderRadius', 4),
                    ),
                  });
                case 'gl-draw-point-point-stroke-inactive-custom':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'circle-color', t.inactive, 'user_circleBorderColor'),
                      o(e.paint, 'circle-opacity', t.inactive, 'user_circleOpacity'),
                      o(e.paint, 'circle-radius', t.inactive, 'user_circleBorderRadius', 4),
                    ),
                  });
                case 'gl-draw-point-point-stroke-inactive-lock':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'circle-color', t.inactive, 'circleBorderColor'),
                      o(e.paint, 'circle-radius', t.inactive, 'circleBorderRadius', 4),
                    ),
                  });
                case 'gl-draw-point-point-stroke-inactive-custom-lock':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'circle-color', t.inactive, 'user_circleBorderColor'),
                      o(e.paint, 'circle-opacity', t.inactive, 'user_circleOpacity'),
                      o(e.paint, 'circle-radius', t.inactive, 'user_circleBorderRadius', 4),
                    ),
                  });
                case 'gl-draw-point-inactive':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'circle-color', t.inactive, 'circleColor'),
                      o(e.paint, 'circle-radius', t.inactive, 'circleRadius'),
                    ),
                  });
                case 'gl-draw-point-inactive-custom':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'circle-color', t.inactive, 'circluser_circleBorderColoreColor'),
                      o(e.paint, 'circle-opacity', t.inactive, 'user_circleOpacity'),
                      o(e.paint, 'circle-radius', t.inactive, 'user_circleBorderRadius'),
                    ),
                  });
                case 'gl-draw-point-inactive-lock':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'circle-color', t.inactive, 'circleColor'),
                      o(e.paint, 'circle-radius', t.inactive, 'circleRadius'),
                    ),
                  });
                case 'gl-draw-point-inactive-custom-lock':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'circle-color', t.inactive, 'circluser_circleBorderColoreColor'),
                      o(e.paint, 'circle-opacity', t.inactive, 'user_circleOpacity'),
                      o(e.paint, 'circle-radius', t.inactive, 'user_circleBorderRadius'),
                    ),
                  });
                case 'gl-draw-point-stroke-active':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'circle-color', t.active, 'circleBorderColor'),
                      o(e.paint, 'circle-radius', t.active, 'circleBorderRadius', 6),
                    ),
                  });
                case 'gl-draw-point-active':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'circle-color', t.active, 'circleColor'),
                      o(e.paint, 'circle-radius', t.active, 'circleRadius'),
                    ),
                  });
                case 'gl-draw-icon-stroke-active':
                  return n(e, {
                    paint: n(e.paint, o(e.paint, 'circle-color', t.active, 'circleColor')),
                  });
                case 'gl-draw-polygon-fill-static':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'fill-color', t.static, 'fillColor'),
                      o(e.paint, 'fill-outline-color', t.static, 'fillOutlineColor'),
                      o(e.paint, 'fill-opacity', t.static, 'fillOpacity'),
                    ),
                  });
                case 'gl-draw-polygon-stroke-static':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'line-color', t.static, 'fillOutlineColor'),
                      o(e.paint, 'line-width', t.static, 'fillOutlineWidth'),
                      o(e.paint, 'line-opacity', t.static, 'fillOutlineOpacity'),
                    ),
                  });
                case 'gl-draw-line-static':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'line-color', t.static, 'lineColor'),
                      o(e.paint, 'line-width', t.static, 'lineWidth'),
                    ),
                  });
                case 'gl-draw-point-static':
                  return n(e, {
                    paint: n(
                      e.paint,
                      o(e.paint, 'circle-color', t.static, 'circleColor'),
                      o(e.paint, 'circle-radius', t.static, 'circleRadius'),
                    ),
                  });
                case 'gl-draw-text-inactive':
                case 'gl-draw-text-active':
                  return n(e, {
                    layout: n(
                      e.layout,
                      o(e.layout, 'text-field', t.static, 'user_textField'),
                      o(e.layout, 'text-size', t.static, 'user_textSize'),
                      o(e.layout, 'text-rotate', t.static, 'user_textRotate'),
                    ),
                    paint: n(
                      e.paint,
                      o(e.paint, 'text-color', t.static, 'user_textColor'),
                      o(e.paint, 'text-halo-width', t.static, 'user_textHaloWidth'),
                      o(e.paint, 'text-halo-color', t.static, 'user_textHaloColor'),
                    ),
                  });
              }
              return e;
            });
          };
        },
        { xtend: 170 },
      ],
      212: [
        function (e, t, r) {
          'use strict';
          var o = e('../constants');
          t.exports = {
            isOfMetaType: function (t) {
              return function (e) {
                e = e.featureTarget;
                return !!e && !!e.properties && e.properties.meta === t;
              };
            },
            isShiftMousedown: function (e) {
              return (
                !!e.originalEvent && !!e.originalEvent.shiftKey && 0 === e.originalEvent.button
              );
            },
            isActiveFeature: function (e) {
              return (
                !!e.featureTarget &&
                !!e.featureTarget.properties &&
                e.featureTarget.properties.active === o.activeStates.ACTIVE &&
                e.featureTarget.properties.meta === o.meta.FEATURE
              );
            },
            isInactiveFeature: function (e) {
              return (
                !!e.featureTarget &&
                !!e.featureTarget.properties &&
                e.featureTarget.properties.active === o.activeStates.INACTIVE &&
                e.featureTarget.properties.meta === o.meta.FEATURE
              );
            },
            noTarget: function (e) {
              return void 0 === e.featureTarget;
            },
            isFeature: function (e) {
              return (
                !!e.featureTarget &&
                !!e.featureTarget.properties &&
                e.featureTarget.properties.meta === o.meta.FEATURE
              );
            },
            isVertex: function (e) {
              e = e.featureTarget;
              return !!e && !!e.properties && e.properties.meta === o.meta.VERTEX;
            },
            isShiftDown: function (e) {
              return !!e.originalEvent && !0 === e.originalEvent.shiftKey;
            },
            isEscapeKey: function (e) {
              return 27 === e.keyCode;
            },
            isEnterKey: function (e) {
              return 13 === e.keyCode;
            },
            true: function () {
              return !0;
            },
          };
        },
        { '../constants': 172 },
      ],
      213: [
        function (e, t, r) {
          'use strict';
          var l = e('@mapbox/geojson-extent'),
            e = e('../constants'),
            o = e.LAT_MIN,
            p = e.LAT_MAX,
            d = e.LAT_RENDERED_MIN,
            h = e.LAT_RENDERED_MAX,
            f = e.LNG_MIN,
            y = e.LNG_MAX;
          t.exports = function (e, t) {
            var n = o,
              i = p,
              s = o,
              a = p,
              c = y,
              u = f;
            e.forEach(function (e) {
              var t = l(e),
                r = t[1],
                o = t[3],
                e = t[0],
                t = t[2];
              n < r && (n = r),
                o < i && (i = o),
                s < o && (s = o),
                r < a && (a = r),
                e < c && (c = e),
                u < t && (u = t);
            });
            return (
              n + t.lat > h && (t.lat = h - n),
              s + t.lat > p && (t.lat = p - s),
              i + t.lat < d && (t.lat = d - i),
              a + t.lat < o && (t.lat = o - a),
              c + t.lng <= f && (t.lng += 360 * Math.ceil(Math.abs(t.lng) / 360)),
              u + t.lng >= y && (t.lng -= 360 * Math.ceil(Math.abs(t.lng) / 360)),
              t
            );
          };
        },
        { '../constants': 172, '@mapbox/geojson-extent': 5 },
      ],
      214: [
        function (e, t, r) {
          'use strict';
          var s = e('../constants');
          t.exports = function (e, t, r, o, n) {
            var i = t.geometry.coordinates,
              t = r.geometry.coordinates;
            if (
              i[1] > s.LAT_RENDERED_MAX ||
              i[1] < s.LAT_RENDERED_MIN ||
              t[1] > s.LAT_RENDERED_MAX ||
              t[1] < s.LAT_RENDERED_MIN
            )
              return null;
            (i = o.project([i[0], i[1]])),
              (t = o.project([t[0], t[1]])),
              (t = o.unproject([(i.x + t.x) / 2, (i.y + t.y) / 2]));
            return {
              type: s.geojsonTypes.FEATURE,
              properties: {
                meta: s.meta.MIDPOINT,
                parent: e,
                lng: t.lng,
                lat: t.lat,
                user_isLock: n.properties.user_isLock || !1,
                coord_path: r.properties.coord_path,
              },
              geometry: { type: s.geojsonTypes.POINT, coordinates: [t.lng, t.lat] },
            };
          };
        },
        { '../constants': 172 },
      ],
      215: [
        function (e, t, r) {
          'use strict';
          var d = e('./create_vertex'),
            h = e('./create_midpoint'),
            s = e('../constants');
          t.exports = function r(a) {
            var o,
              c = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
              n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null,
              e = a.geometry,
              t = e.type,
              e = e.coordinates,
              u = a.properties && a.properties.id,
              l = [];
            function i(e, n) {
              var i = '',
                s = null;
              e.forEach(function (e, t) {
                var r = null != n ? n + '.' + t : String(t),
                  o = d(u, e, r, p(r), a);
                c.midpoints && s && (r = h(u, s, o, c.map, a)) && l.push(r),
                  (s = o),
                  (e = JSON.stringify(e)),
                  i !== e && l.push(o),
                  0 === t && (i = e);
              });
            }
            function p(e) {
              return !!c.selectedPaths && -1 !== c.selectedPaths.indexOf(e);
            }
            return (
              t === s.geojsonTypes.POINT
                ? l.push(d(u, e, n, p(n), a))
                : t === s.geojsonTypes.POLYGON
                ? e.forEach(function (e, t) {
                    i(e, null !== n ? n + '.' + t : String(t));
                  })
                : t === s.geojsonTypes.LINE_STRING
                ? i(e, n)
                : 0 === t.indexOf(s.geojsonTypes.MULTI_PREFIX) &&
                  ((o = t.replace(s.geojsonTypes.MULTI_PREFIX, '')),
                  e.forEach(function (e, t) {
                    (e = {
                      type: s.geojsonTypes.FEATURE,
                      properties: a.properties,
                      geometry: { type: o, coordinates: e },
                    }),
                      (l = l.concat(r(e, c, t)));
                  })),
              l
            );
          };
        },
        { '../constants': 172, './create_midpoint': 214, './create_vertex': 216 },
      ],
      216: [
        function (e, t, r) {
          'use strict';
          var i = e('../constants');
          t.exports = function (e, t, r, o, n) {
            return {
              type: i.geojsonTypes.FEATURE,
              properties: {
                meta: i.meta.VERTEX,
                parent: e,
                coord_path: r,
                user_isLock: n.properties.user_isLock || !1,
                active: o ? i.activeStates.ACTIVE : i.activeStates.INACTIVE,
              },
              geometry: { type: i.geojsonTypes.POINT, coordinates: t },
            };
          };
        },
        { '../constants': 172 },
      ],
      217: [
        function (e, t, r) {
          'use strict';
          t.exports = {
            enable: function (e) {
              setTimeout(function () {
                e.map &&
                  e.map.doubleClickZoom &&
                  e._ctx &&
                  e._ctx.store &&
                  e._ctx.store.getInitialConfigValue &&
                  e._ctx.store.getInitialConfigValue('doubleClickZoom') &&
                  e.map.doubleClickZoom.enable();
              }, 0);
            },
            disable: function (e) {
              setTimeout(function () {
                e.map && e.map.doubleClickZoom && e.map.doubleClickZoom.disable();
              }, 0);
            },
          };
        },
        {},
      ],
      218: [
        function (e, t, r) {
          'use strict';
          t.exports = function (e, t) {
            var r = e.x - t.x,
              t = e.y - t.y;
            return Math.sqrt(r * r + t * t);
          };
        },
        {},
      ],
      219: [
        function (e, t, r) {
          'use strict';
          var l = e('./sort_features'),
            p = e('./map_event_to_bounding_box'),
            o = e('../constants'),
            d = e('./string_set'),
            h = [o.meta.FEATURE, o.meta.MIDPOINT, o.meta.VERTEX];
          function n(e, t, r, o) {
            if (null === r.map) return [];
            if (!1 == !!r.options.drawEnabled) return [];
            (o = e ? p(e, o) : t), (t = {});
            r.options.styles &&
              (t.layers = r.options.styles.map(function (e) {
                return e.id;
              }));
            var n = r.map.queryRenderedFeatures(o, t);
            if (r.options.decimalPointNum)
              for (var i = 0; i < n.length; i++)
                if (n[i].geometry)
                  if ('Point' === n[i].geometry.type)
                    (n[i].geometry.coordinates[0] = Number(
                      n[i].geometry.coordinates[0].toFixed(r.options.decimalPointNum),
                    )),
                      (n[i].geometry.coordinates[1] = Number(
                        n[i].geometry.coordinates[1].toFixed(r.options.decimalPointNum),
                      ));
                  else if ('LineString' === n[i].geometry.type)
                    for (var s = 0; s < n[i].geometry.coordinates.length; s++)
                      (n[i].geometry.coordinates[s][0] = Number(
                        n[i].geometry.coordinates[s][0].toFixed(r.options.decimalPointNum),
                      )),
                        (n[i].geometry.coordinates[s][1] = Number(
                          n[i].geometry.coordinates[s][1].toFixed(r.options.decimalPointNum),
                        ));
                  else if ('Polygon' === n[i].geometry.type)
                    for (var a = 0; a < n[i].geometry.coordinates[0].length; a++)
                      (n[i].geometry.coordinates[0][a][0] = Number(
                        n[i].geometry.coordinates[0][a][0].toFixed(r.options.decimalPointNum),
                      )),
                        (n[i].geometry.coordinates[0][a][1] = Number(
                          n[i].geometry.coordinates[0][a][1].toFixed(r.options.decimalPointNum),
                        ));
            n.filter(function (e) {
              return -1 !== h.indexOf(e.properties.meta);
            });
            var c = new d(),
              u = [];
            return (
              n.forEach(function (e) {
                var t = e.properties.id;
                c.has(t) || (c.add(t), u.push(e));
              }),
              l(u)
            );
          }
          t.exports = {
            click: function (e, t, r) {
              return n(
                e,
                t,
                r,
                (r.options.adsorbEnabled && r.options.adsorbBuffer) || r.options.clickBuffer,
              );
            },
            touch: function (e, t, r) {
              return n(e, t, r, r.options.touchBuffer);
            },
          };
        },
        {
          '../constants': 172,
          './map_event_to_bounding_box': 224,
          './sort_features': 228,
          './string_set': 229,
        },
      ],
      220: [
        function (e, t, r) {
          'use strict';
          var i = e('./features_at'),
            s = e('../constants'),
            a = e('lodash/cloneDeep');
          t.exports = function (e, t) {
            var r = i.click(e, null, t),
              o = { mouse: s.cursors.NONE };
            -1 !== t.events.currentModeName().indexOf('draw') && (o.mouse = s.cursors.ADD),
              t.ui.queueMapClasses(o),
              t.ui.updateMapClasses(),
              (e.adsorbFeatureTargets = a(r));
            for (var n = 0; n < r.length; n++) r[n].properties.user_isLock && (r.splice(n, 1), n--);
            return (
              (e.featureTarget = a(r[0])),
              (e.featureTargets = a(r)),
              e.featureTarget &&
                ((o.mouse =
                  e.featureTarget.properties.active === s.activeStates.ACTIVE
                    ? s.cursors.MOVE
                    : s.cursors.POINTER),
                (o.feature = e.featureTarget.properties.meta)),
              e
            );
          };
        },
        { '../constants': 172, './features_at': 219, 'lodash/cloneDeep': 142 },
      ],
      221: [
        function (e, t, r) {
          'use strict';
          var s = e('./euclidean_distance');
          t.exports = function (e, t, r) {
            var o = 2 < arguments.length && void 0 !== r ? r : {},
              n = null != o.fineTolerance ? o.fineTolerance : 4,
              i = null != o.grossTolerance ? o.grossTolerance : 12,
              r = null != o.interval ? o.interval : 500;
            (e.point = e.point || t.point), (e.time = e.time || t.time);
            o = s(e.point, t.point);
            return o < n || (o < i && t.time - e.time < r);
          };
        },
        { './euclidean_distance': 218 },
      ],
      222: [
        function (e, t, r) {
          'use strict';
          t.exports = function (e, t) {
            return !!e.lngLat && e.lngLat.lng === t[0] && e.lngLat.lat === t[1];
          };
        },
        {},
      ],
      223: [
        function (e, t, r) {
          'use strict';
          var n = e('./euclidean_distance');
          t.exports = function (e, t, r) {
            var o = 2 < arguments.length && void 0 !== r ? r : {},
              r = null != o.tolerance ? o.tolerance : 25,
              o = null != o.interval ? o.interval : 250;
            return (
              (e.point = e.point || t.point),
              (e.time = e.time || t.time),
              n(e.point, t.point) < r && t.time - e.time < o
            );
          };
        },
        { './euclidean_distance': 218 },
      ],
      224: [
        function (e, t, r) {
          'use strict';
          t.exports = function (e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0;
            return [
              [e.point.x - t, e.point.y - t],
              [e.point.x + t, e.point.y + t],
            ];
          };
        },
        {},
      ],
      225: [
        function (e, t, r) {
          'use strict';
          t.exports = function (t, i) {
            function r(e, t) {
              for (var r = s[e], o = r.length; o--; ) {
                var n = r[o];
                if (n.selector(t)) {
                  n.fn.call(a, t), i.store.render(), i.ui.updateMapClasses();
                  break;
                }
              }
            }
            var s = {
                drag: [],
                click: [],
                mousemove: [],
                mousedown: [],
                mouseup: [],
                mouseout: [],
                keydown: [],
                keyup: [],
                touchstart: [],
                touchmove: [],
                touchend: [],
                tap: [],
              },
              a = {
                on: function (e, t, r) {
                  if (void 0 === s[e]) throw new Error('Invalid event type: ' + e);
                  s[e].push({ selector: t, fn: r });
                },
                render: function (e) {
                  i.store.featureChanged(e);
                },
              };
            return (
              t.start.call(a),
              {
                render: t.render,
                stop: function () {
                  t.stop && t.stop();
                },
                trash: function () {
                  t.trash && (t.trash(), i.store.render());
                },
                combineFeatures: function () {
                  t.combineFeatures && t.combineFeatures();
                },
                uncombineFeatures: function () {
                  t.uncombineFeatures && t.uncombineFeatures();
                },
                unionPolygon: function () {
                  t.unionPolygon && t.unionPolygon();
                },
                unionLine: function () {
                  t.unionLine && t.unionLine();
                },
                splitLine: function () {
                  t.splitLine && t.splitLine();
                },
                curveLine: function () {
                  t.curveLine && t.curveLine();
                },
                parallelLine: function (e) {
                  t.parallelLine && t.parallelLine(e);
                },
                curveFeature: function () {
                  t.curveFeature && t.curveFeature();
                },
                cloneFeature: function () {
                  t.cloneFeature && t.cloneFeature();
                },
                drag: function (e) {
                  r('drag', e);
                },
                click: function (e) {
                  r('click', e);
                },
                mousemove: function (e) {
                  r('mousemove', e);
                },
                mousedown: function (e) {
                  r('mousedown', e);
                },
                mouseup: function (e) {
                  r('mouseup', e);
                },
                mouseout: function (e) {
                  r('mouseout', e);
                },
                keydown: function (e) {
                  r('keydown', e);
                },
                keyup: function (e) {
                  r('keyup', e);
                },
                touchstart: function (e) {
                  r('touchstart', e);
                },
                touchmove: function (e) {
                  r('touchmove', e);
                },
                touchend: function (e) {
                  r('touchend', e);
                },
                tap: function (e) {
                  r('tap', e);
                },
              }
            );
          };
        },
        {},
      ],
      226: [
        function (e, t, r) {
          'use strict';
          var o = e('@mapbox/point-geometry');
          t.exports = function (e, t) {
            var r = t.getBoundingClientRect();
            return new o(
              e.clientX - r.left - (t.clientLeft || 0),
              e.clientY - r.top - (t.clientTop || 0),
            );
          };
        },
        { '@mapbox/point-geometry': 10 },
      ],
      227: [
        function (e, t, r) {
          'use strict';
          var o = e('./constrain_feature_movement'),
            i = e('../constants'),
            s = e('../feature_types/circle'),
            a = e('../feature_types/rectangle'),
            c = (e('../feature_types/rectangle'), e('../feature_types/triangle')),
            u = e('../feature_types/sector'),
            f = e('../feature_types/ellipse'),
            y = e('../feature_types/arc'),
            g = e('../feature_types/line_arrow'),
            m = e('../feature_types/thin_straight_arrow'),
            _ = e('../feature_types/thin_tail_arrow'),
            v = e('../feature_types/attack_arrow'),
            b = e('../feature_types/offensive_arrow'),
            E = e('../feature_types/offensive_tail_arrow'),
            x = e('../feature_types/pincer_attack_arrow'),
            S = e('../feature_types/curve_polygon');
          t.exports = function (e, t) {
            function d(e) {
              return e && Array.isArray(e);
            }
            function h(e) {
              return e && Array.isArray(e) && 2 === e.length && !isNaN(e[0]) && !isNaN(e[1]);
            }
            var n = o(
              e.map(function (e) {
                return e.toGeoJSON();
              }),
              t,
            );
            e.forEach(function (e) {
              function l(e) {
                return [(e = { lng: e[0] + n.lng, lat: e[1] + n.lat }).lng, e.lat];
              }
              function p(e) {
                return e.map(l);
              }
              function t(e, t, r, o) {
                var n,
                  i,
                  s = 1 < arguments.length && void 0 !== t ? t : [],
                  a = 2 < arguments.length && void 0 !== r ? r : [],
                  c = 3 < arguments.length && void 0 !== o ? o : [],
                  u = e.properties;
                for (n in u)
                  s.includes(n) && h(u[n]) && e.setProperty(n, l(u[n])),
                    a.includes(n) && d(u[n]) && e.setProperty(n, u[n].map(l)),
                    c.includes(n) && d(u[n]) && e.setProperty(n, u[n].map(p));
                for (i in e)
                  s.includes(i) && h(e[i]) && (e[i] = l(e[i])),
                    a.includes(i) && d(e[i]) && (e[i] = u[i].map(l)),
                    c.includes(i) && d(e[i]) && (e[i] = u[i].map(p));
              }
              var r = e.getCoordinates(),
                o = void 0;
              e.type === i.geojsonTypes.POINT
                ? (o = l(r))
                : e.type === i.geojsonTypes.LINE_STRING || e.type === i.geojsonTypes.MULTI_POINT
                ? (o = r.map(l))
                : e.type === i.geojsonTypes.POLYGON || e.type === i.geojsonTypes.MULTI_LINE_STRING
                ? (o = r.map(p))
                : e.type === i.geojsonTypes.MULTI_POLYGON &&
                  (o = r.map(function (e) {
                    return e.map(p);
                  })),
                e.incomingCoords(o),
                e instanceof s ||
                (e.properties && 'circle' === e.properties.feature_type && e.properties.radius)
                  ? t(e, ['center'])
                  : e instanceof a || (e.properties && 'rectangle' === e.properties.feature_type)
                  ? t(e, ['start', 'end'])
                  : e instanceof c || (e.properties && 'triangle' === e.properties.feature_type)
                  ? t(e, ['start', 'middle', 'end'])
                  : e instanceof u || (e.properties && 'sector' === e.properties.feature_type)
                  ? t(e, ['center', 'start', 'end'])
                  : e instanceof f ||
                    (e.properties && 'ellipse' === e.properties.feature_type) ||
                    e instanceof y ||
                    (e.properties && 'arc' === e.properties.feature_type)
                  ? t(e, ['first', 'second', 'end'])
                  : e instanceof g ||
                    (e.properties && 'line_arrow' === e.properties.feature_type) ||
                    e instanceof m ||
                    (e.properties && 'thin_straight_arrow' === e.properties.feature_type) ||
                    e instanceof _ ||
                    (e.properties && 'thin_tail_arrow' === e.properties.feature_type) ||
                    e instanceof v ||
                    (e.properties && 'attack_arrow' === e.properties.feature_type)
                  ? t(e, ['start', 'end'])
                  : e instanceof b ||
                    (e.properties && 'offensive_arrow' === e.properties.feature_type) ||
                    e instanceof E ||
                    (e.properties && 'offensive_tail_arrow' === e.properties.feature_type)
                  ? t(e, ['start', 'middle', 'end'])
                  : e instanceof x ||
                    (e.properties && 'pincer_attack_arrow' === e.properties.feature_type)
                  ? t(e, ['start', 'second', 'end', 'arrow1', 'arrow2'])
                  : (e instanceof S ||
                      (e.properties && 'curve_polygon' === e.properties.feature_type)) &&
                    t(e, ['start']);
            });
          };
        },
        {
          '../constants': 172,
          '../feature_types/arc': 190,
          '../feature_types/attack_arrow': 191,
          '../feature_types/circle': 192,
          '../feature_types/curve_polygon': 193,
          '../feature_types/ellipse': 194,
          '../feature_types/line_arrow': 196,
          '../feature_types/offensive_arrow': 199,
          '../feature_types/offensive_tail_arrow': 200,
          '../feature_types/pincer_attack_arrow': 202,
          '../feature_types/rectangle': 205,
          '../feature_types/sector': 206,
          '../feature_types/thin_straight_arrow': 207,
          '../feature_types/thin_tail_arrow': 208,
          '../feature_types/triangle': 209,
          './constrain_feature_movement': 213,
        },
      ],
      228: [
        function (e, t, r) {
          'use strict';
          var o = e('@mapbox/geojson-area'),
            n = e('../constants'),
            i = { Point: 0, LineString: 1, Polygon: 2 };
          function s(e, t) {
            var r = i[e.geometry.type] - i[t.geometry.type];
            return 0 == r && e.geometry.type === n.geojsonTypes.POLYGON ? e.area - t.area : r;
          }
          t.exports = function (e) {
            return e
              .map(function (e) {
                return (
                  e.geometry.type === n.geojsonTypes.POLYGON &&
                    (e.area = o.geometry({
                      type: n.geojsonTypes.FEATURE,
                      property: {},
                      geometry: e.geometry,
                    })),
                  e
                );
              })
              .sort(s)
              .map(function (e) {
                return delete e.area, e;
              });
          };
        },
        { '../constants': 172, '@mapbox/geojson-area': 2 },
      ],
      229: [
        function (e, t, r) {
          'use strict';
          function o(e) {
            if (((this._items = {}), (this._length = e ? e.length : 0), e))
              for (var t = 0, r = e.length; t < r; t++) void 0 !== e[t] && (this._items[e[t]] = t);
          }
          (o.prototype.add = function (e) {
            return (
              (this._length = this._items[e] ? this._length : this._length + 1),
              (this._items[e] = this._items[e] || this._length),
              this
            );
          }),
            (o.prototype.delete = function (e) {
              return (
                (this._length = this._items[e] ? this._length - 1 : this._length),
                delete this._items[e],
                this
              );
            }),
            (o.prototype.has = function (e) {
              return void 0 !== this._items[e];
            }),
            (o.prototype.values = function () {
              var r = this;
              return Object.keys(this._items).sort(function (e, t) {
                return r._items[e] - r._items[t];
              });
            }),
            (o.prototype.clear = function () {
              return (this._length = 0), (this._items = {}), this;
            }),
            (t.exports = o);
        },
        {},
      ],
      230: [
        function (e, t, r) {
          'use strict';
          t.exports = function (e, t) {
            return (
              e.length === t.length &&
              JSON.stringify(
                e
                  .map(function (e) {
                    return e;
                  })
                  .sort(),
              ) ===
                JSON.stringify(
                  t
                    .map(function (e) {
                      return e;
                    })
                    .sort(),
                )
            );
          };
        },
        {},
      ],
      231: [
        function (e, t, r) {
          'use strict';
          t.exports = function (e, t, r) {
            var o = void 0,
              n = void 0;
            function i() {
              o
                ? (n = arguments)
                : ((o = !0), e.apply(r, arguments), (o = !1), n && (i.apply(r, n), (n = !1)));
            }
            return i;
          };
        },
        {},
      ],
      232: [
        function (e, t, r) {
          'use strict';
          t.exports = function (e) {
            return [].concat(e).filter(function (e) {
              return void 0 !== e;
            });
          };
        },
        {},
      ],
      233: [
        function (e, t, r) {
          'use strict';
          function a(e) {
            if (Array.isArray(e)) {
              for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
              return r;
            }
            return Array.from(e);
          }
          var o = e('../lib/common_selectors'),
            n = o.noTarget,
            i = o.isOfMetaType,
            s = o.isInactiveFeature,
            c = o.isShiftDown,
            u = e('../lib/create_supplementary_points'),
            p = e('../lib/constrain_feature_movement'),
            l = e('../lib/double_click_zoom'),
            d = e('../constants'),
            h = e('../lib/features_at'),
            f = e('../lib/common_selectors'),
            y = e('../lib/move_features'),
            g = e('@turf/bezier-spline').default,
            m = e('@turf/helpers').lineString,
            _ = e('@turf/line-split').default,
            v = i(d.meta.VERTEX),
            b = i(d.meta.MIDPOINT),
            i = {
              onSetup: function (e) {
                var t = e.featureId,
                  r = this.getFeature(t);
                if (!r) throw new Error('You must provide a featureId to enter direct_select mode');
                if (r.type === d.geojsonTypes.POINT)
                  throw new TypeError("direct_select mode doesn't handle point features");
                e = {
                  featureId: t,
                  feature: r,
                  dragMoveLocation: e.startPos || null,
                  dragMoving: !1,
                  canDragMove: !1,
                  selectedCoordPaths: e.coordPath ? [e.coordPath] : [],
                  initiallySelectedFeatures: [],
                };
                return (
                  this.setSelectedCoordinates(this.pathsToCoordinates(t, e.selectedCoordPaths)),
                  this.setSelected(t),
                  (e.initiallySelectedFeatures = this.getSelected().map(function (e) {
                    return e.toGeoJSON();
                  })),
                  l.disable(this),
                  this.setActionableState({ trash: !0 }),
                  e
                );
              },
              fireUpdate: function (e) {
                this.map.fire(d.events.UPDATE, {
                  action: d.updateActions.CHANGE_COORDINATES,
                  prevFeatures: e.initiallySelectedFeatures || [],
                  features: this.getSelected().map(function (e) {
                    return e.toGeoJSON();
                  }),
                }),
                  (e.initiallySelectedFeatures = this.getSelected().map(function (e) {
                    return e.toGeoJSON();
                  }));
              },
              fireActionable: function (e) {
                this.setActionableState({
                  combineFeatures: !1,
                  uncombineFeatures: !1,
                  trash: 0 < e.selectedCoordPaths.length,
                });
              },
              startDragging: function (e, t) {
                this.map.dragPan.disable(), (e.canDragMove = !0), (e.dragMoveLocation = t.lngLat);
              },
              stopDragging: function (e) {
                this.map.dragPan.enable(),
                  (e.dragMoving = !1),
                  (e.canDragMove = !1),
                  (e.dragMoveLocation = null);
              },
              onVertex: function (e, t) {
                this.startDragging(e, t);
                var r = t.featureTarget.properties,
                  o = e.selectedCoordPaths.indexOf(r.coord_path);
                c(t) || -1 !== o
                  ? c(t) && -1 === o && e.selectedCoordPaths.push(r.coord_path)
                  : (e.selectedCoordPaths = [r.coord_path]);
                e = this.pathsToCoordinates(e.featureId, e.selectedCoordPaths);
                this.setSelectedCoordinates(e);
              },
              onMidpoint: function (e, t) {
                this.startDragging(e, t);
                t = t.featureTarget.properties;
                e.feature.addCoordinate(t.coord_path, t.lng, t.lat),
                  this.fireUpdate(e),
                  (e.selectedCoordPaths = [t.coord_path]);
              },
              pathsToCoordinates: function (t, e) {
                return e.map(function (e) {
                  return { feature_id: t, coord_path: e };
                });
              },
              onFeature: function (e, t) {
                0 === e.selectedCoordPaths.length ? this.startDragging(e, t) : this.stopDragging(e);
              },
              dragFeature: function (e, t, r) {
                y(this.getSelected(), r), (e.dragMoveLocation = t.lngLat);
              },
              dragVertex: function (t, e, r) {
                for (
                  var o = t.selectedCoordPaths.map(function (e) {
                      return t.feature.getCoordinate(e);
                    }),
                    n = o.map(function (e) {
                      return {
                        type: d.geojsonTypes.FEATURE,
                        properties: {},
                        geometry: { type: d.geojsonTypes.POINT, coordinates: e },
                      };
                    }),
                    i = p(n, r),
                    s = 0;
                  s < o.length;
                  s++
                ) {
                  var a,
                    c,
                    u = o[s],
                    l = [u[0] + i.lng, u[1] + i.lat];
                  this._ctx.options.adsorbEnabled &&
                    ((a = { point: this.map.project(l), lngLat: { lng: l[0], lat: l[1] } }),
                    (c = h.click(a, null, this._ctx)),
                    (c = this.getAdsorbCoord(t, a, c || [], t.featureId)) &&
                      ((e.lngLat.lng = e.lngLat.lng + (c[0] - l[0])),
                      (e.lngLat.lat = e.lngLat.lat + (c[1] - l[1])),
                      (e.point = this.map.project([e.lngLat.lng, e.lngLat.lat])),
                      (l = c),
                      this.updateUIClasses({ mouse: d.cursors.POINTER }))),
                    t.feature.updateCoordinate(t.selectedCoordPaths[s], l[0], l[1], u[0], u[1]);
                }
              },
              clickNoTarget: function () {
                this.changeMode(d.modes.SIMPLE_SELECT);
              },
              clickInactive: function () {
                this.changeMode(d.modes.SIMPLE_SELECT);
              },
              clickActiveFeature: function (e) {
                (e.selectedCoordPaths = []), this.clearSelectedCoordinates(), e.feature.changed();
              },
              onStop: function () {
                l.enable(this), this.clearSelectedCoordinates();
              },
              toDisplayFeatures: function (e, t, r) {
                e.featureId === t.properties.id
                  ? ((t.properties.active = d.activeStates.ACTIVE),
                    r(t),
                    u(t, {
                      map: this.map,
                      midpoints: !0,
                      selectedPaths: e.selectedCoordPaths,
                    }).forEach(r))
                  : ((t.properties.active = d.activeStates.INACTIVE), r(t)),
                  this.fireActionable(e);
              },
              onTrash: function (t) {
                t.selectedCoordPaths
                  .sort()
                  .reverse()
                  .forEach(function (e) {
                    return t.feature.removeCoordinate(e);
                  }),
                  this.map.fire(d.events.UPDATE, {
                    action: d.updateActions.CHANGE_COORDINATES,
                    prevFeatures: t.initiallySelectedFeatures || [],
                    features: this.getSelected().map(function (e) {
                      return e.toGeoJSON();
                    }),
                  }),
                  (t.initiallySelectedFeatures = this.getSelected().map(function (e) {
                    return e.toGeoJSON();
                  })),
                  (t.selectedCoordPaths = []),
                  this.clearSelectedCoordinates(),
                  this.fireActionable(t),
                  !1 === t.feature.isValid() &&
                    (this.deleteFeature([t.featureId]), this.changeMode(d.modes.SIMPLE_SELECT, {}));
              },
              onMouseMove: function (e, t) {
                var r = f.isActiveFeature(t),
                  o = v(t),
                  t = 0 === e.selectedCoordPaths.length;
                (r && t) || (o && !t)
                  ? this.updateUIClasses({ mouse: d.cursors.MOVE })
                  : this.updateUIClasses({ mouse: d.cursors.NONE }),
                  this.stopDragging(e);
              },
              onMouseOut: function (e) {
                e.dragMoving && this.fireUpdate(e);
              },
            };
          (i.onTouchStart = i.onMouseDown =
            function (e, t) {
              return v(t)
                ? this.onVertex(e, t)
                : f.isActiveFeature(t)
                ? this.onFeature(e, t)
                : b(t)
                ? this.onMidpoint(e, t)
                : void 0;
            }),
            (i.onDrag = function (e, t) {
              var r;
              !0 === e.canDragMove &&
                ((e.dragMoving = !0),
                t.originalEvent.stopPropagation(),
                (r = {
                  lng: t.lngLat.lng - e.dragMoveLocation.lng,
                  lat: t.lngLat.lat - e.dragMoveLocation.lat,
                }),
                0 < e.selectedCoordPaths.length
                  ? this.dragVertex(e, t, r)
                  : this.dragFeature(e, t, r),
                (e.dragMoveLocation = t.lngLat));
            }),
            (i.onClick = function (e, t) {
              return n(t)
                ? this.clickNoTarget(e, t)
                : f.isActiveFeature(t)
                ? this.clickActiveFeature(e, t)
                : s(t)
                ? this.clickInactive(e, t)
                : void this.stopDragging(e);
            }),
            (i.onTap = function (e, t) {
              return n(t)
                ? this.clickNoTarget(e, t)
                : f.isActiveFeature(t)
                ? this.clickActiveFeature(e, t)
                : s(t)
                ? this.clickInactive(e, t)
                : void 0;
            }),
            (i.onTouchEnd = i.onMouseUp =
              function (e) {
                e.dragMoving && this.fireUpdate(e), this.stopDragging(e);
              }),
            (i.onCurveFeature = function (e) {
              var t = this.getSelected();
              if (1 !== t.length) throw new Error('您需要且只需选择一条线或面');
              if (![d.geojsonTypes.LINE_STRING, d.geojsonTypes.POLYGON].includes(t[0].type))
                throw new Error('您选择必须是线或面');
              var r = this.getSelectedCoordPaths();
              if (r.length < 3) throw new Error('您需要至少连续选择三个断点');
              var o,
                n,
                i = [],
                s = [];
              t[0].type === d.geojsonTypes.LINE_STRING
                ? ((n = r
                    .map(function (e) {
                      return parseInt(e);
                    })
                    .sort()),
                  (o = g(
                    m(
                      n.map(function (e) {
                        return t[0].coordinates[e];
                      }),
                    ),
                    { resolution: 5e3, sharpness: 0.85 },
                  )),
                  (n = [].concat(
                    a(t[0].coordinates.slice(0, n[0])),
                    a(o.geometry.coordinates),
                    a(t[0].coordinates.slice(n[n.length - 1] + 1)),
                  )),
                  (n = this.newFeature({
                    id: t[0].id,
                    type: d.geojsonTypes.FEATURE,
                    properties: t[0].properties,
                    geometry: { type: d.geojsonTypes.LINE_STRING, coordinates: n },
                  })),
                  this.deleteFeature(t[0].id, { silent: !0 }),
                  this.addFeature(n),
                  i.push(n.toGeoJSON()),
                  s.push(n.id))
                : t[0].type === d.geojsonTypes.POLYGON &&
                  ((n = r
                    .map(function (e) {
                      return e.split('.').map(function (e) {
                        return parseInt(e, 10);
                      })[1];
                    })
                    .sort()),
                  (r = g(
                    m(
                      n.map(function (e) {
                        return t[0].coordinates[0][e];
                      }),
                    ),
                    { resolution: 5e3, sharpness: 0.85 },
                  )),
                  (n = [].concat(
                    a(t[0].coordinates[0].slice(0, n[0])),
                    a(r.geometry.coordinates),
                    a(t[0].coordinates[0].slice(n[n.length - 1] + 1)),
                  )),
                  (n = this.newFeature({
                    id: t[0].id,
                    type: d.geojsonTypes.FEATURE,
                    properties: t[0].properties,
                    geometry: { type: d.geojsonTypes.POLYGON, coordinates: [n] },
                  })),
                  this.deleteFeature(t[0].id, { silent: !0 }),
                  this.addFeature(n),
                  i.push(n.toGeoJSON()),
                  s.push(n.id)),
                i.length &&
                  (this.map.fire(d.events.UPDATE, {
                    action: d.updateActions.CHANGE_COORDINATES,
                    prevFeatures: [t[0].toGeoJSON()],
                    features: i,
                  }),
                  this.changeMode(d.modes.SIMPLE_SELECT, { featureIds: s })),
                this.fireActionable(e);
            }),
            (i.onSplitLine = function (e) {
              var t = this.getSelected();
              if (1 !== t.length) throw new Error('您需要且只需选择一条线');
              if (t[0].type !== d.geojsonTypes.LINE_STRING) throw new Error('您选择必须是线');
              var r = this.getSelectedCoordinates();
              if (1 !== r.length) throw new Error('您需要且只需选择一个断点');
              var r = {
                  type: d.geojsonTypes.FEATURE,
                  properties: {},
                  geometry: { type: d.geojsonTypes.POINT, coordinates: r[0].coordinates },
                },
                o = _(t[0].toGeoJSON(), r);
              if (o && o.features && 0 < o.features.length) {
                for (var n = [], i = [], s = 0, a = o.features.length; s < a; s++) {
                  var c = o.features[s],
                    c = this.newFeature({
                      type: d.geojsonTypes.FEATURE,
                      properties: t[0].properties,
                      geometry: c.geometry,
                    });
                  this.addFeature(c), n.push(c.toGeoJSON()), i.push(c.id);
                }
                this.deleteFeature(t[0].id, { silent: !0 }),
                  this.map.fire(d.events.REPLACE, {
                    createdFeatures: n,
                    deletedFeatures: [t[0].toGeoJSON()],
                  }),
                  this.changeMode(d.modes.SIMPLE_SELECT, { featureIds: i });
              }
              this.fireActionable(e);
            }),
            (t.exports = i);
        },
        {
          '../constants': 172,
          '../lib/common_selectors': 212,
          '../lib/constrain_feature_movement': 213,
          '../lib/create_supplementary_points': 215,
          '../lib/double_click_zoom': 217,
          '../lib/features_at': 219,
          '../lib/move_features': 227,
          '@turf/bezier-spline': 13,
          '@turf/helpers': 21,
          '@turf/line-split': 29,
        },
      ],
      234: [
        function (e, t, r) {
          'use strict';
          var o = e('../lib/common_selectors'),
            i = e('../lib/double_click_zoom'),
            s = e('../constants'),
            e = {
              onSetup: function (e) {
                e = e || {};
                var t,
                  r = null,
                  o = [];
                this.drawConfig.secondEdit &&
                  ((t =
                    (n = 1 === (t = this.getSelectedIds()).length ? this.getFeature(t[0]) : null) &&
                    n.properties
                      ? n.properties
                      : {}),
                  (r = n && 'arc' === t.feature_type && t.first && t.second && t.end ? n : null) &&
                    o.push(r.toGeoJSON()));
                var n = r
                  ? this.newArc({
                      id: r.id,
                      type: s.geojsonTypes.FEATURE,
                      properties: r.properties,
                      geometry: {
                        type: s.geojsonTypes.LINE_STRING,
                        coordinates: r.getCoordinates(),
                      },
                    })
                  : this.newArc({
                      type: s.geojsonTypes.FEATURE,
                      properties: {},
                      geometry: { type: s.geojsonTypes.LINE_STRING, coordinates: [] },
                    });
                return (
                  this.preSettingStyle(n, e.style || {}),
                  this.addFeature(n),
                  this.clearSelectedFeatures(),
                  i.disable(this),
                  this.updateUIClasses({ mouse: s.cursors.ADD }),
                  this.activateUIButton(s.types.LINE),
                  this.setActionableState({ trash: !0 }),
                  {
                    initiallyFeatures: o,
                    line: n,
                    direction: 'forward',
                    currentVertexPosition: r ? 2 : 0,
                  }
                );
              },
              clickAnywhere: function (e, t) {
                if (1 < e.currentVertexPosition)
                  return this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.line.id] });
                this.updateUIClasses({ mouse: s.cursors.ADD }),
                  e.line.updateCoordinate(e.currentVertexPosition, t.lngLat.lng, t.lngLat.lat),
                  'forward' === e.direction
                    ? (e.currentVertexPosition++,
                      e.line.updateCoordinate(e.currentVertexPosition, t.lngLat.lng, t.lngLat.lat))
                    : e.line.addCoordinate(0, t.lngLat.lng, t.lngLat.lat);
              },
              clickOnVertex: function (e) {
                return this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.line.id] });
              },
            };
          (e.onTouchMove = e.onMouseMove =
            function (e, t) {
              e.line.updateCoordinate(e.currentVertexPosition, t.lngLat.lng, t.lngLat.lat),
                o.isVertex(t) && this.updateUIClasses({ mouse: s.cursors.POINTER });
            }),
            (e.onTap = e.onClick =
              function (e, t) {
                if (o.isVertex(t)) return this.clickOnVertex(e, t);
                this.clickAnywhere(e, t);
              }),
            (e.onKeyUp = function (e, t) {
              o.isEnterKey(t)
                ? this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.line.id] })
                : o.isEscapeKey(t) &&
                  (this.deleteFeature([e.line.id], { silent: !0 }),
                  this.changeMode(s.modes.SIMPLE_SELECT));
            }),
            (e.onStop = function (e) {
              i.enable(this),
                this.activateUIButton(),
                void 0 !== this.getFeature(e.line.id) &&
                  (e.line.removeCoordinate('' + e.currentVertexPosition),
                  e.line.isValid()
                    ? e.initiallyFeatures && 0 < e.initiallyFeatures.length
                      ? this.map.fire(s.events.UPDATE, {
                          action: s.updateActions.CHANGE_COORDINATES,
                          prevFeatures: e.initiallyFeatures,
                          features: [e.line.toGeoJSON()],
                        })
                      : this.map.fire(s.events.CREATE, { features: [e.line.toGeoJSON()] })
                    : (this.deleteFeature([e.line.id], { silent: !0 }),
                      this.changeMode(s.modes.SIMPLE_SELECT, {}, { silent: !0 })));
            }),
            (e.onTrash = function (e) {
              this.deleteFeature([e.line.id], { silent: !0 }),
                this.changeMode(s.modes.SIMPLE_SELECT);
            }),
            (e.toDisplayFeatures = function (e, t, r) {
              e = t.properties.id === e.line.id;
              if (((t.properties.active = e ? s.activeStates.ACTIVE : s.activeStates.INACTIVE), !e))
                return r(t);
              t.geometry.coordinates.length < 2 || ((t.properties.meta = s.meta.FEATURE), r(t));
            }),
            (t.exports = e);
        },
        { '../constants': 172, '../lib/common_selectors': 212, '../lib/double_click_zoom': 217 },
      ],
      235: [
        function (e, t, r) {
          'use strict';
          var o = e('../lib/common_selectors'),
            i = e('../lib/double_click_zoom'),
            s = e('../constants'),
            a = e('../lib/create_vertex'),
            e = {
              onSetup: function (e) {
                e = e || {};
                var t = null,
                  r = [];
                this.drawConfig.secondEdit &&
                  ((o =
                    (n = 1 === (o = this.getSelectedIds()).length ? this.getFeature(o[0]) : null) &&
                    n.properties
                      ? n.properties
                      : {}),
                  (t = n && 'attack_arrow' === o.feature_type && o.start && o.end ? n : null) &&
                    r.push(t.toGeoJSON()));
                var o = void 0,
                  n = void 0,
                  n = t
                    ? ((o = this.newAttackArrow({
                        id: t.id,
                        type: s.geojsonTypes.FEATURE,
                        properties: t.properties,
                        geometry: { type: s.geojsonTypes.POLYGON, coordinates: t.getCoordinates() },
                      })),
                      1)
                    : ((o = this.newAttackArrow({
                        type: s.geojsonTypes.FEATURE,
                        properties: {},
                        geometry: { type: s.geojsonTypes.POLYGON, coordinates: [[]] },
                      })),
                      this.preSettingStyle(o, e.style || {}),
                      0);
                return (
                  this.addFeature(o),
                  this.clearSelectedFeatures(),
                  i.disable(this),
                  this.updateUIClasses({ mouse: s.cursors.ADD }),
                  this.activateUIButton(s.types.POLYGON),
                  this.setActionableState({ trash: !0 }),
                  { polygon: o, currentVertexPosition: n, initiallyFeatures: r }
                );
              },
              clickAnywhere: function (e, t) {
                if (1 <= e.currentVertexPosition)
                  return this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
                this.updateUIClasses({ mouse: s.cursors.ADD }),
                  e.polygon.updateCoordinate(
                    '0.' + e.currentVertexPosition,
                    t.lngLat.lng,
                    t.lngLat.lat,
                  ),
                  e.currentVertexPosition++;
              },
              clickOnVertex: function (e) {
                return this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
              },
            };
          (e.onTouchMove = e.onMouseMove =
            function (e, t) {
              e.polygon.updateCoordinate(
                '0.' + e.currentVertexPosition,
                t.lngLat.lng,
                t.lngLat.lat,
              ),
                o.isVertex(t) && this.updateUIClasses({ mouse: s.cursors.POINTER });
            }),
            (e.onTap = e.onClick =
              function (e, t) {
                return o.isVertex(t) ? this.clickOnVertex(e, t) : this.clickAnywhere(e, t);
              }),
            (e.onKeyUp = function (e, t) {
              o.isEscapeKey(t)
                ? (this.deleteFeature([e.polygon.id], { silent: !0 }),
                  this.changeMode(s.modes.SIMPLE_SELECT))
                : o.isEnterKey(t) &&
                  this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
            }),
            (e.onStop = function (e) {
              this.updateUIClasses({ mouse: s.cursors.NONE }),
                i.enable(this),
                this.activateUIButton(),
                void 0 !== this.getFeature(e.polygon.id) &&
                  (e.polygon.isValid()
                    ? e.initiallyFeatures && 0 < e.initiallyFeatures.length
                      ? this.map.fire(s.events.UPDATE, {
                          action: s.updateActions.CHANGE_COORDINATES,
                          prevFeatures: e.initiallyFeatures,
                          features: [e.polygon.toGeoJSON()],
                        })
                      : this.map.fire(s.events.CREATE, { features: [e.polygon.toGeoJSON()] })
                    : (this.deleteFeature([e.polygon.id], { silent: !0 }),
                      this.changeMode(s.modes.SIMPLE_SELECT, {}, { silent: !0 })));
            }),
            (e.toDisplayFeatures = function (e, t, r) {
              var o = t.properties.id === e.polygon.id;
              if (((t.properties.active = o ? s.activeStates.ACTIVE : s.activeStates.INACTIVE), !o))
                return r(t);
              if (0 !== t.geometry.coordinates.length) {
                o = t.geometry.coordinates[0].length;
                if (!(o < 3)) {
                  if (
                    ((t.properties.meta = s.meta.FEATURE),
                    r(a(e.polygon.id, t.geometry.coordinates[0][0], '0.0', !1, t)),
                    4 < o &&
                      ((n = t.geometry.coordinates[0].length - 1),
                      r(a(e.polygon.id, t.geometry.coordinates[0][n], '0.' + n, !1, t))),
                    o <= 4)
                  ) {
                    var n = [
                      [t.geometry.coordinates[0][0][0], t.geometry.coordinates[0][0][1]],
                      [t.geometry.coordinates[0][1][0], t.geometry.coordinates[0][1][1]],
                    ];
                    if (
                      (r({
                        type: s.geojsonTypes.FEATURE,
                        properties: t.properties,
                        geometry: { coordinates: n, type: s.geojsonTypes.LINE_STRING },
                      }),
                      3 === o)
                    )
                      return;
                  }
                  return r(t);
                }
              }
            }),
            (e.onTrash = function (e) {
              this.deleteFeature([e.polygon.id], { silent: !0 }),
                this.changeMode(s.modes.SIMPLE_SELECT);
            }),
            (t.exports = e);
        },
        {
          '../constants': 172,
          '../lib/common_selectors': 212,
          '../lib/create_vertex': 216,
          '../lib/double_click_zoom': 217,
        },
      ],
      236: [
        function (e, t, r) {
          'use strict';
          var o = e('../lib/common_selectors'),
            i = e('../lib/double_click_zoom'),
            s = e('../constants'),
            n = e('../lib/create_vertex'),
            e = {
              onSetup: function (e) {
                e = e || {};
                var t = this.getSelectedIds(),
                  r = 1 === t.length ? this.getFeature(t[0]) : null,
                  o = r && r.properties ? r.properties : {},
                  t = r && 'circle' === o.feature_type && o.radius && o.center ? r : null,
                  o = [];
                if (t) {
                  o.push(t.toGeoJSON());
                  r = this.newCircle({
                    id: t.id,
                    type: s.geojsonTypes.FEATURE,
                    properties: t.properties,
                    geometry: { type: s.geojsonTypes.POLYGON, coordinates: t.getCoordinates() },
                  });
                  this.addFeature(r);
                  var n = this.newFeature({
                    type: s.geojsonTypes.FEATURE,
                    properties: {},
                    geometry: {
                      type: s.geojsonTypes.LINE_STRING,
                      coordinates: [t.properties.center, t.coordinates[0]],
                    },
                  });
                  return (
                    this.addFeature(n),
                    this.clearSelectedFeatures(),
                    i.disable(this),
                    this.updateUIClasses({ mouse: s.cursors.ADD }),
                    this.setActionableState({ trash: !0 }),
                    { initiallyFeatures: o, polygon: r, line: n, currentVertexPosition: 1 }
                  );
                }
                n = this.newCircle({
                  type: s.geojsonTypes.FEATURE,
                  properties: {},
                  geometry: { type: s.geojsonTypes.POLYGON, coordinates: [[]] },
                });
                this.preSettingStyle(n, e.style || {}), this.addFeature(n);
                e = this.newFeature({
                  type: s.geojsonTypes.FEATURE,
                  properties: {},
                  geometry: { type: s.geojsonTypes.LINE_STRING, coordinates: [[]] },
                });
                return (
                  this.addFeature(e),
                  this.clearSelectedFeatures(),
                  i.disable(this),
                  this.updateUIClasses({ mouse: s.cursors.ADD }),
                  this.setActionableState({ trash: !0 }),
                  { initiallyFeatures: o, polygon: n, line: e, currentVertexPosition: 0 }
                );
              },
              clickAnywhere: function (e, t) {
                if (1 <= e.currentVertexPosition)
                  return this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
                this.updateUIClasses({ mouse: s.cursors.ADD }),
                  e.line.updateCoordinate(e.currentVertexPosition, t.lngLat.lng, t.lngLat.lat),
                  e.polygon.updateCoordinate(
                    '0.' + e.currentVertexPosition,
                    t.lngLat.lng,
                    t.lngLat.lat,
                  ),
                  e.currentVertexPosition++,
                  1 <= e.currentVertexPosition && (e.currentVertexPosition = 1);
              },
              clickOnVertex: function (e) {
                return this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
              },
            };
          (e.onTouchMove = e.onMouseMove =
            function (e, t) {
              0 < e.currentVertexPosition &&
                (e.line.updateCoordinate(e.currentVertexPosition, t.lngLat.lng, t.lngLat.lat),
                e.polygon.updateCoordinate(
                  '0.' + e.currentVertexPosition,
                  t.lngLat.lng,
                  t.lngLat.lat,
                )),
                o.isVertex(t) && this.updateUIClasses({ mouse: s.cursors.POINTER });
            }),
            (e.onTap = e.onClick =
              function (e, t) {
                return o.isVertex(t) ? this.clickOnVertex(e, t) : this.clickAnywhere(e, t);
              }),
            (e.onKeyUp = function (e, t) {
              o.isEscapeKey(t)
                ? (this.getFeature(e.line.id) && this.deleteFeature([e.line.id], { silent: !0 }),
                  this.deleteFeature([e.polygon.id], { silent: !0 }),
                  this.changeMode(s.modes.SIMPLE_SELECT))
                : o.isEnterKey(t) &&
                  this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
            }),
            (e.onStop = function (e) {
              this.updateUIClasses({ mouse: s.cursors.NONE }),
                i.enable(this),
                this.activateUIButton(),
                this.getFeature(e.line.id) && this.deleteFeature([e.line.id], { silent: !0 }),
                void 0 !== this.getFeature(e.polygon.id) &&
                  (e.polygon.isValid()
                    ? e.initiallyFeatures && 0 < e.initiallyFeatures.length
                      ? this.map.fire(s.events.UPDATE, {
                          action: s.updateActions.CHANGE_COORDINATES,
                          prevFeatures: e.initiallyFeatures,
                          features: [e.polygon.toGeoJSON()],
                        })
                      : this.map.fire(s.events.CREATE, { features: [e.polygon.toGeoJSON()] })
                    : (this.deleteFeature([e.polygon.id], { silent: !0 }),
                      this.changeMode(s.modes.SIMPLE_SELECT, {}, { silent: !0 })));
            }),
            (e.toDisplayFeatures = function (e, t, r) {
              if (t.properties.id === e.line.id && t.geometry.type === s.geojsonTypes.LINE_STRING)
                return (
                  (t.properties.active = s.activeStates.ACTIVE),
                  0 < t.geometry.coordinates.length &&
                    r(n(e.line.id, t.geometry.coordinates[0], '0', !1, t)),
                  1 < t.geometry.coordinates.length &&
                    r(n(e.line.id, t.geometry.coordinates[1], '1', !1, t)),
                  r(t)
                );
              var o = t.properties.id === e.polygon.id;
              if (((t.properties.active = o ? s.activeStates.ACTIVE : s.activeStates.INACTIVE), !o))
                return r(t);
              if (0 !== t.geometry.coordinates.length) {
                e = t.geometry.coordinates[0].length;
                if (!(e < 2)) {
                  if (((t.properties.meta = s.meta.FEATURE), e <= 4)) {
                    o = [
                      [t.geometry.coordinates[0][0][0], t.geometry.coordinates[0][0][1]],
                      [t.geometry.coordinates[0][1][0], t.geometry.coordinates[0][1][1]],
                    ];
                    if (
                      (r({
                        type: s.geojsonTypes.FEATURE,
                        properties: t.properties,
                        geometry: { coordinates: o, type: s.geojsonTypes.LINE_STRING },
                      }),
                      3 === e)
                    )
                      return;
                  }
                  return r(t);
                }
              }
            }),
            (e.onTrash = function (e) {
              this.getFeature(e.line.id) && this.deleteFeature([e.line.id], { silent: !0 }),
                this.deleteFeature([e.polygon.id], { silent: !0 }),
                this.changeMode(s.modes.SIMPLE_SELECT);
            }),
            (t.exports = e);
        },
        {
          '../constants': 172,
          '../lib/common_selectors': 212,
          '../lib/create_vertex': 216,
          '../lib/double_click_zoom': 217,
        },
      ],
      237: [
        function (e, t, r) {
          'use strict';
          var o = e('../lib/common_selectors'),
            i = e('../lib/double_click_zoom'),
            s = e('../constants'),
            n = e('../lib/is_event_at_coordinates'),
            a = e('../lib/create_vertex'),
            e = {
              onSetup: function (e) {
                e = e || {};
                var t = null,
                  r = [];
                this.drawConfig.secondEdit &&
                  ((o =
                    (n = 1 === (o = this.getSelectedIds()).length ? this.getFeature(o[0]) : null) &&
                    n.properties
                      ? n.properties
                      : {}),
                  (t = n && 'curve_polygon' === o.feature_type && o.start ? n : null) &&
                    r.push(t.toGeoJSON()));
                var o = void 0,
                  n = void 0,
                  n = t
                    ? (((o = this.newCurvePolygon({
                        id: t.id,
                        type: s.geojsonTypes.FEATURE,
                        properties: t.properties,
                        geometry: { type: s.geojsonTypes.POLYGON, coordinates: [[]] },
                      })).start = t.properties.start),
                      (o.initCoordinates = [[t.properties.start]]),
                      1)
                    : ((o = this.newCurvePolygon({
                        type: s.geojsonTypes.FEATURE,
                        properties: {},
                        geometry: { type: s.geojsonTypes.POLYGON, coordinates: [[]] },
                      })),
                      this.preSettingStyle(o, e.style || {}),
                      0);
                return (
                  this.addFeature(o),
                  this.clearSelectedFeatures(),
                  i.disable(this),
                  this.updateUIClasses({ mouse: s.cursors.ADD }),
                  this.activateUIButton(s.types.POLYGON),
                  this.setActionableState({ trash: !0 }),
                  { polygon: o, currentVertexPosition: n, initiallyFeatures: r }
                );
              },
              clickAnywhere: function (e, t) {
                var r = e.polygon.coordinates ? e.polygon.coordinates[0].length - 2 : 0;
                if (1 < e.currentVertexPosition && n(t, e.polygon.coordinates[0][r]))
                  return this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
                this.updateUIClasses({ mouse: s.cursors.ADD }),
                  e.polygon.updateCoordinate(
                    '0.' + e.currentVertexPosition,
                    t.lngLat.lng,
                    t.lngLat.lat,
                  ),
                  e.currentVertexPosition++,
                  e.polygon.updateCoordinate(
                    '0.' + e.currentVertexPosition,
                    t.lngLat.lng,
                    t.lngLat.lat,
                  );
              },
              clickOnVertex: function (e) {
                return this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
              },
            };
          (e.onTouchMove = e.onMouseMove =
            function (e, t) {
              e.polygon.updateCoordinate(
                '0.' + e.currentVertexPosition,
                t.lngLat.lng,
                t.lngLat.lat,
              ),
                o.isVertex(t) && this.updateUIClasses({ mouse: s.cursors.POINTER });
            }),
            (e.onTap = e.onClick =
              function (e, t) {
                return o.isVertex(t) ? this.clickOnVertex(e, t) : this.clickAnywhere(e, t);
              }),
            (e.onKeyUp = function (e, t) {
              o.isEscapeKey(t)
                ? (this.deleteFeature([e.polygon.id], { silent: !0 }),
                  this.changeMode(s.modes.SIMPLE_SELECT))
                : o.isEnterKey(t) &&
                  this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
            }),
            (e.onStop = function (e) {
              var t;
              this.updateUIClasses({ mouse: s.cursors.NONE }),
                i.enable(this),
                this.activateUIButton(),
                void 0 !== this.getFeature(e.polygon.id) &&
                  (e.polygon.updateCoordinate2(),
                  e.polygon.coordinates &&
                    e.polygon.coordinates[0] &&
                    3 < e.polygon.coordinates[0].length &&
                    ((t = e.polygon.coordinates[0].length - 1),
                    e.polygon.coordinates[0][t - 1][0] === e.polygon.coordinates[0][t][0] &&
                      e.polygon.coordinates[0][t - 1][1] === e.polygon.coordinates[0][t][1] &&
                      e.polygon.removeCoordinate('0.' + t)),
                  e.polygon.isValid()
                    ? e.initiallyFeatures && 0 < e.initiallyFeatures.length
                      ? this.map.fire(s.events.UPDATE, {
                          action: s.updateActions.CHANGE_COORDINATES,
                          prevFeatures: e.initiallyFeatures,
                          features: [e.polygon.toGeoJSON()],
                        })
                      : this.map.fire(s.events.CREATE, { features: [e.polygon.toGeoJSON()] })
                    : (this.deleteFeature([e.polygon.id], { silent: !0 }),
                      this.changeMode(s.modes.SIMPLE_SELECT, {}, { silent: !0 })));
            }),
            (e.toDisplayFeatures = function (e, t, r) {
              var o = t.properties.id === e.polygon.id;
              if (((t.properties.active = o ? s.activeStates.ACTIVE : s.activeStates.INACTIVE), !o))
                return r(t);
              if (0 !== t.geometry.coordinates.length) {
                o = t.geometry.coordinates[0].length;
                if (!(o < 3)) {
                  if (
                    ((t.properties.meta = s.meta.FEATURE),
                    r(a(e.polygon.id, t.geometry.coordinates[0][0], '0.0', !1, t)),
                    3 < o &&
                      ((n = t.geometry.coordinates[0].length - 3),
                      r(a(e.polygon.id, t.geometry.coordinates[0][n], '0.' + n, !1, t))),
                    o <= 4)
                  ) {
                    var n = [
                      [t.geometry.coordinates[0][0][0], t.geometry.coordinates[0][0][1]],
                      [t.geometry.coordinates[0][1][0], t.geometry.coordinates[0][1][1]],
                    ];
                    if (
                      (r({
                        type: s.geojsonTypes.FEATURE,
                        properties: t.properties,
                        geometry: { coordinates: n, type: s.geojsonTypes.LINE_STRING },
                      }),
                      3 === o)
                    )
                      return;
                  }
                  return r(t);
                }
              }
            }),
            (e.onTrash = function (e) {
              this.deleteFeature([e.polygon.id], { silent: !0 }),
                this.changeMode(s.modes.SIMPLE_SELECT);
            }),
            (t.exports = e);
        },
        {
          '../constants': 172,
          '../lib/common_selectors': 212,
          '../lib/create_vertex': 216,
          '../lib/double_click_zoom': 217,
          '../lib/is_event_at_coordinates': 222,
        },
      ],
      238: [
        function (e, t, r) {
          'use strict';
          var o = e('../lib/common_selectors'),
            n = e('../lib/double_click_zoom'),
            i = e('../constants'),
            e = {
              onSetup: function (e) {
                e = e || {};
                var t = this.getSelectedIds(),
                  r = 1 === t.length ? this.getFeature(t[0]) : null,
                  o = r && r.properties ? r.properties : {},
                  t = r && 'ellipse' === o.feature_type && o.first && o.second && o.end ? r : null,
                  o = [];
                t && o.push(t.toGeoJSON());
                r = t
                  ? this.newEllipse({
                      id: t.id,
                      type: i.geojsonTypes.FEATURE,
                      properties: t.properties,
                      geometry: { type: i.geojsonTypes.POLYGON, coordinates: t.getCoordinates() },
                    })
                  : this.newEllipse({
                      type: i.geojsonTypes.FEATURE,
                      properties: {},
                      geometry: { type: i.geojsonTypes.POLYGON, coordinates: [[]] },
                    });
                return (
                  this.preSettingStyle(r, e.style || {}),
                  this.addFeature(r),
                  this.clearSelectedFeatures(),
                  n.disable(this),
                  this.updateUIClasses({ mouse: i.cursors.ADD }),
                  this.activateUIButton(i.types.POLYGON),
                  this.setActionableState({ trash: !0 }),
                  { polygon: r, initiallyFeatures: o, currentVertexPosition: t ? 2 : 0 }
                );
              },
              clickAnywhere: function (e, t) {
                if (1 < e.currentVertexPosition)
                  return this.changeMode(i.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
                this.updateUIClasses({ mouse: i.cursors.ADD }),
                  e.polygon.updateCoordinate(
                    '0.' + e.currentVertexPosition,
                    t.lngLat.lng,
                    t.lngLat.lat,
                  ),
                  e.currentVertexPosition++;
              },
              clickOnVertex: function (e) {
                return this.changeMode(i.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
              },
            };
          (e.onTouchMove = e.onMouseMove =
            function (e, t) {
              e.polygon.updateCoordinate(
                '0.' + e.currentVertexPosition,
                t.lngLat.lng,
                t.lngLat.lat,
              ),
                o.isVertex(t) && this.updateUIClasses({ mouse: i.cursors.POINTER });
            }),
            (e.onTap = e.onClick =
              function (e, t) {
                return o.isVertex(t) ? this.clickOnVertex(e, t) : this.clickAnywhere(e, t);
              }),
            (e.onKeyUp = function (e, t) {
              o.isEscapeKey(t)
                ? (this.deleteFeature([e.polygon.id], { silent: !0 }),
                  this.changeMode(i.modes.SIMPLE_SELECT))
                : o.isEnterKey(t) &&
                  this.changeMode(i.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
            }),
            (e.onStop = function (e) {
              this.updateUIClasses({ mouse: i.cursors.NONE }),
                n.enable(this),
                this.activateUIButton(),
                void 0 !== this.getFeature(e.polygon.id) &&
                  (e.polygon.isValid()
                    ? e.initiallyFeatures && 0 < e.initiallyFeatures.length
                      ? this.map.fire(i.events.UPDATE, {
                          action: i.updateActions.CHANGE_COORDINATES,
                          prevFeatures: e.initiallyFeatures,
                          features: [e.polygon.toGeoJSON()],
                        })
                      : this.map.fire(i.events.CREATE, { features: [e.polygon.toGeoJSON()] })
                    : (this.deleteFeature([e.polygon.id], { silent: !0 }),
                      this.changeMode(i.modes.SIMPLE_SELECT, {}, { silent: !0 })));
            }),
            (e.toDisplayFeatures = function (e, t, r) {
              var o = t.properties.id === e.polygon.id;
              if (((t.properties.active = o ? i.activeStates.ACTIVE : i.activeStates.INACTIVE), !o))
                return r(t);
              if (0 !== t.geometry.coordinates.length) {
                e = t.geometry.coordinates[0].length;
                if (!(e < 3)) {
                  if (((t.properties.meta = i.meta.FEATURE), e <= 4)) {
                    o = [
                      [t.geometry.coordinates[0][0][0], t.geometry.coordinates[0][0][1]],
                      [t.geometry.coordinates[0][1][0], t.geometry.coordinates[0][1][1]],
                    ];
                    if (
                      (r({
                        type: i.geojsonTypes.FEATURE,
                        properties: t.properties,
                        geometry: { coordinates: o, type: i.geojsonTypes.LINE_STRING },
                      }),
                      3 === e)
                    )
                      return;
                  }
                  return r(t);
                }
              }
            }),
            (e.onTrash = function (e) {
              this.deleteFeature([e.polygon.id], { silent: !0 }),
                this.changeMode(i.modes.SIMPLE_SELECT);
            }),
            (t.exports = e);
        },
        { '../constants': 172, '../lib/common_selectors': 212, '../lib/double_click_zoom': 217 },
      ],
      239: [
        function (e, t, r) {
          'use strict';
          var o = e('../lib/common_selectors'),
            n = e('../constants'),
            e = {
              onSetup: function (e) {
                e = e || {};
                var t = {
                    type: n.geojsonTypes.FEATURE,
                    properties: { custom_style: 'true', feature_type: 'icon' },
                    geometry: { type: n.geojsonTypes.POINT, coordinates: [] },
                  },
                  e = e.style || {};
                e.iconImage && (t.properties.iconImage = e.iconImage),
                  e.iconColor && (t.properties.iconColor = e.iconColor),
                  void 0 !== e.iconSize && (t.properties.iconSize = e.iconSize),
                  void 0 !== e.iconRotate && (t.properties.iconRotate = e.iconRotate);
                t = this.newFeature(t);
                return (
                  this.addFeature(t),
                  this.clearSelectedFeatures(),
                  this.updateUIClasses({ mouse: n.cursors.ADD }),
                  this.activateUIButton(n.types.POINT),
                  this.setActionableState({ trash: !0 }),
                  { point: t }
                );
              },
              stopDrawingAndRemove: function (e) {
                this.deleteFeature([e.point.id], { silent: !0 }),
                  this.changeMode(n.modes.SIMPLE_SELECT);
              },
            };
          (e.onTap = e.onClick =
            function (e, t) {
              this.updateUIClasses({ mouse: n.cursors.MOVE }),
                e.point.updateCoordinate('', t.lngLat.lng, t.lngLat.lat),
                this.map.fire(n.events.CREATE, { features: [e.point.toGeoJSON()] }),
                this.changeMode(n.modes.SIMPLE_SELECT, { featureIds: [e.point.id] });
            }),
            (e.onStop = function (e) {
              this.activateUIButton(),
                e.point.getCoordinate().length || this.deleteFeature([e.point.id], { silent: !0 });
            }),
            (e.toDisplayFeatures = function (e, t, r) {
              e = t.properties.id === e.point.id;
              if (((t.properties.active = e ? n.activeStates.ACTIVE : n.activeStates.INACTIVE), !e))
                return r(t);
            }),
            (e.onTrash = e.stopDrawingAndRemove),
            (e.onKeyUp = function (e, t) {
              if (o.isEscapeKey(t) || o.isEnterKey(t)) return this.stopDrawingAndRemove(e, t);
            }),
            (t.exports = e);
        },
        { '../constants': 172, '../lib/common_selectors': 212 },
      ],
      240: [
        function (e, t, r) {
          'use strict';
          var o = e('../lib/common_selectors'),
            i = e('../lib/double_click_zoom'),
            s = e('../constants'),
            n = e('../lib/create_vertex'),
            e = {
              onSetup: function (e) {
                e = e || {};
                var t = null,
                  r = [];
                this.drawConfig.secondEdit &&
                  ((o =
                    (n = 1 === (o = this.getSelectedIds()).length ? this.getFeature(o[0]) : null) &&
                    n.properties
                      ? n.properties
                      : {}),
                  (t = n && 'line_arrow' === o.feature_type && o.start && o.end ? n : null) &&
                    r.push(t.toGeoJSON()));
                var o = void 0,
                  n = void 0,
                  n = t
                    ? ((o = this.newLineArrow({
                        id: t.id,
                        type: s.geojsonTypes.FEATURE,
                        properties: t.properties,
                        geometry: {
                          type: s.geojsonTypes.LINE_STRING,
                          coordinates: t.getCoordinates(),
                        },
                      })),
                      1)
                    : ((o = this.newLineArrow({
                        type: s.geojsonTypes.FEATURE,
                        properties: {},
                        geometry: { type: s.geojsonTypes.LINE_STRING, coordinates: [] },
                      })),
                      this.preSettingStyle(o, e.style || {}),
                      (e = e.shape || {}),
                      (o.properties.shape_start_arrow_type = e.startArrowType || 'none'),
                      (o.properties.shape_end_arrow_type = e.endArrowType || 'normal'),
                      (o.properties.shape_line_type = e.lineType || 'solid'),
                      0);
                return (
                  this.addFeature(o),
                  this.clearSelectedFeatures(),
                  i.disable(this),
                  this.updateUIClasses({ mouse: s.cursors.ADD }),
                  this.activateUIButton(s.types.LINE),
                  this.setActionableState({ trash: !0 }),
                  { line: o, currentVertexPosition: n, initiallyFeatures: r, direction: 'forward' }
                );
              },
              clickAnywhere: function (e, t) {
                if (1 <= e.currentVertexPosition)
                  return this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.line.id] });
                this.updateUIClasses({ mouse: s.cursors.ADD }),
                  e.line.updateCoordinate(e.currentVertexPosition, t.lngLat.lng, t.lngLat.lat),
                  'forward' === e.direction
                    ? (e.currentVertexPosition++,
                      e.line.updateCoordinate(e.currentVertexPosition, t.lngLat.lng, t.lngLat.lat))
                    : e.line.addCoordinate(0, t.lngLat.lng, t.lngLat.lat);
              },
              clickOnVertex: function (e) {
                return this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.line.id] });
              },
            };
          (e.onTouchMove = e.onMouseMove =
            function (e, t) {
              e.line.updateCoordinate(e.currentVertexPosition, t.lngLat.lng, t.lngLat.lat),
                o.isVertex(t) && this.updateUIClasses({ mouse: s.cursors.POINTER });
            }),
            (e.onTap = e.onClick =
              function (e, t) {
                if (o.isVertex(t)) return this.clickOnVertex(e, t);
                this.clickAnywhere(e, t);
              }),
            (e.onKeyUp = function (e, t) {
              o.isEnterKey(t)
                ? this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.line.id] })
                : o.isEscapeKey(t) &&
                  (this.deleteFeature([e.line.id], { silent: !0 }),
                  this.changeMode(s.modes.SIMPLE_SELECT));
            }),
            (e.onStop = function (e) {
              i.enable(this),
                this.activateUIButton(),
                void 0 !== this.getFeature(e.line.id) &&
                  (e.line.isValid()
                    ? e.initiallyFeatures && 0 < e.initiallyFeatures.length
                      ? this.map.fire(s.events.UPDATE, {
                          action: s.updateActions.CHANGE_COORDINATES,
                          prevFeatures: e.initiallyFeatures,
                          features: [e.line.toGeoJSON()],
                        })
                      : this.map.fire(s.events.CREATE, { features: [e.line.toGeoJSON()] })
                    : (this.deleteFeature([e.line.id], { silent: !0 }),
                      this.changeMode(s.modes.SIMPLE_SELECT, {}, { silent: !0 })));
            }),
            (e.onTrash = function (e) {
              this.deleteFeature([e.line.id], { silent: !0 }),
                this.changeMode(s.modes.SIMPLE_SELECT);
            }),
            (e.toDisplayFeatures = function (e, t, r) {
              var o = t.properties.id === e.line.id;
              if (((t.properties.active = o ? s.activeStates.ACTIVE : s.activeStates.INACTIVE), !o))
                return r(t);
              t.geometry.coordinates.length < 2 ||
                ((t.properties.meta = s.meta.FEATURE),
                r(n(e.line.id, t.geometry.coordinates[0], '0', !1, t)),
                r(t));
            }),
            (t.exports = e);
        },
        {
          '../constants': 172,
          '../lib/common_selectors': 212,
          '../lib/create_vertex': 216,
          '../lib/double_click_zoom': 217,
        },
      ],
      241: [
        function (e, t, r) {
          'use strict';
          function s(e) {
            if (Array.isArray(e)) {
              for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
              return r;
            }
            return Array.from(e);
          }
          var n = e('../lib/common_selectors'),
            o = e('../lib/is_event_at_coordinates'),
            a = e('../lib/double_click_zoom'),
            c = e('../constants'),
            i = e('../lib/create_vertex'),
            e = {
              onSetup: function (e) {
                var t = (e = e || {}).featureId,
                  r = void 0,
                  o = void 0,
                  n = 'forward';
                if (t) {
                  if (!(r = this.getFeature(t)))
                    throw new Error('Could not find a feature with the provided featureId');
                  var i = e.from;
                  if (
                    (i &&
                      'Feature' === i.type &&
                      i.geometry &&
                      'Point' === i.geometry.type &&
                      (i = i.geometry),
                    i &&
                      'Point' === i.type &&
                      i.coordinates &&
                      2 === i.coordinates.length &&
                      (i = i.coordinates),
                    !i || !Array.isArray(i))
                  )
                    throw new Error(
                      'Please use the `from` property to indicate which point to continue the line from',
                    );
                  t = r.coordinates.length - 1;
                  if (r.coordinates[t][0] === i[0] && r.coordinates[t][1] === i[1]) {
                    o = 1 + t;
                    r.addCoordinate.apply(r, [o].concat(s(r.coordinates[t])));
                  } else {
                    if (r.coordinates[0][0] !== i[0] || r.coordinates[0][1] !== i[1])
                      throw new Error(
                        '`from` should match the point at either the start or the end of the provided LineString',
                      );
                    n = 'backwards';
                    (o = 0), r.addCoordinate.apply(r, [o].concat(s(r.coordinates[0])));
                  }
                } else
                  (r = this.newFeature({
                    type: c.geojsonTypes.FEATURE,
                    properties: {},
                    geometry: { type: c.geojsonTypes.LINE_STRING, coordinates: [] },
                  })),
                    this.preSettingStyle(r, e.style || {}),
                    (o = 0),
                    this.addFeature(r);
                return (
                  this.clearSelectedFeatures(),
                  a.disable(this),
                  this.updateUIClasses({ mouse: c.cursors.ADD }),
                  this.activateUIButton(c.types.LINE),
                  this.setActionableState({ trash: !0 }),
                  { line: r, currentVertexPosition: o, direction: n }
                );
              },
              clickAnywhere: function (e, t) {
                if (
                  (0 < e.currentVertexPosition &&
                    o(t, e.line.coordinates[e.currentVertexPosition - 1])) ||
                  ('backwards' === e.direction &&
                    o(t, e.line.coordinates[e.currentVertexPosition + 1]))
                )
                  return this.changeMode(c.modes.SIMPLE_SELECT, { featureIds: [e.line.id] });
                var r = this.getAdsorbCoord(e, t, t.adsorbFeatureTargets || [], e.line.id),
                  t = r || [t.lngLat.lng, t.lngLat.lat];
                this.updateUIClasses({ mouse: r ? c.cursors.POINTER : c.cursors.ADD }),
                  e.line.updateCoordinate(e.currentVertexPosition, t[0], t[1]),
                  'forward' === e.direction
                    ? (e.currentVertexPosition++,
                      e.line.updateCoordinate(e.currentVertexPosition, t[0], t[1]))
                    : e.line.addCoordinate(0, t[0], t[1]);
              },
              clickOnVertex: function (e) {
                return this.changeMode(c.modes.SIMPLE_SELECT, { featureIds: [e.line.id] });
              },
            };
          (e.onTouchMove = e.onMouseMove =
            function (e, t) {
              var r = this.getAdsorbCoord(e, t, t.adsorbFeatureTargets || [], e.line.id),
                o = r || [t.lngLat.lng, t.lngLat.lat];
              e.line.updateCoordinate(e.currentVertexPosition, o[0], o[1]),
                n.isVertex(t) && this.updateUIClasses({ mouse: c.cursors.POINTER }),
                r && this.updateUIClasses({ mouse: c.cursors.POINTER });
            }),
            (e.onTap = e.onClick =
              function (e, t) {
                if (n.isVertex(t)) return this.clickOnVertex(e, t);
                this.clickAnywhere(e, t);
              }),
            (e.onKeyUp = function (e, t) {
              n.isEnterKey(t)
                ? this.changeMode(c.modes.SIMPLE_SELECT, { featureIds: [e.line.id] })
                : n.isEscapeKey(t) &&
                  (this.deleteFeature([e.line.id], { silent: !0 }),
                  this.changeMode(c.modes.SIMPLE_SELECT));
            }),
            (e.onStop = function (e) {
              a.enable(this),
                this.activateUIButton(),
                void 0 !== this.getFeature(e.line.id) &&
                  (e.line.removeCoordinate('' + e.currentVertexPosition),
                  e.line.isValid()
                    ? this.map.fire(c.events.CREATE, { features: [e.line.toGeoJSON()] })
                    : (this.deleteFeature([e.line.id], { silent: !0 }),
                      this.changeMode(c.modes.SIMPLE_SELECT, {}, { silent: !0 })));
            }),
            (e.onTrash = function (e) {
              this.deleteFeature([e.line.id], { silent: !0 }),
                this.changeMode(c.modes.SIMPLE_SELECT);
            }),
            (e.toDisplayFeatures = function (e, t, r) {
              var o = t.properties.id === e.line.id;
              if (((t.properties.active = o ? c.activeStates.ACTIVE : c.activeStates.INACTIVE), !o))
                return r(t);
              t.geometry.coordinates.length < 2 ||
                ((t.properties.meta = c.meta.FEATURE),
                r(
                  i(
                    e.line.id,
                    t.geometry.coordinates[
                      'forward' === e.direction ? t.geometry.coordinates.length - 2 : 1
                    ],
                    '' + ('forward' === e.direction ? t.geometry.coordinates.length - 2 : 1),
                    !1,
                    t,
                  ),
                ),
                r(t));
            }),
            (t.exports = e);
        },
        {
          '../constants': 172,
          '../lib/common_selectors': 212,
          '../lib/create_vertex': 216,
          '../lib/double_click_zoom': 217,
          '../lib/is_event_at_coordinates': 222,
        },
      ],
      242: [
        function (e, t, r) {
          'use strict';
          var o = e('../lib/common_selectors'),
            i = e('../lib/double_click_zoom'),
            s = e('../constants'),
            a = e('../lib/create_vertex'),
            e = {
              onSetup: function (e) {
                e = e || {};
                var t = this.getSelectedIds(),
                  r = 1 === t.length ? this.getFeature(t[0]) : null,
                  o = r && r.properties ? r.properties : {},
                  n =
                    r && 'offensive_arrow' === o.feature_type && o.start && o.middle && o.end
                      ? r
                      : null,
                  t = [];
                n && t.push(n.toGeoJSON());
                (o = void 0),
                  (r = void 0),
                  (r = n
                    ? ((o = this.newOffensiveArrow({
                        id: n.id,
                        type: s.geojsonTypes.FEATURE,
                        properties: n.properties,
                        geometry: { type: s.geojsonTypes.POLYGON, coordinates: n.getCoordinates() },
                      })),
                      2)
                    : ((o = this.newOffensiveArrow({
                        type: s.geojsonTypes.FEATURE,
                        properties: {},
                        geometry: { type: s.geojsonTypes.POLYGON, coordinates: [[]] },
                      })),
                      this.preSettingStyle(o, e.style || {}),
                      0));
                return (
                  this.addFeature(o),
                  this.clearSelectedFeatures(),
                  i.disable(this),
                  this.updateUIClasses({ mouse: s.cursors.ADD }),
                  this.activateUIButton(s.types.POLYGON),
                  this.setActionableState({ trash: !0 }),
                  { polygon: o, currentVertexPosition: r, initiallyFeatures: t }
                );
              },
              clickAnywhere: function (e, t) {
                if (1 < e.currentVertexPosition)
                  return this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
                this.updateUIClasses({ mouse: s.cursors.ADD }),
                  e.polygon.updateCoordinate(
                    '0.' + e.currentVertexPosition,
                    t.lngLat.lng,
                    t.lngLat.lat,
                  ),
                  e.currentVertexPosition++;
              },
              clickOnVertex: function (e) {
                return this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
              },
            };
          (e.onTouchMove = e.onMouseMove =
            function (e, t) {
              e.polygon.updateCoordinate(
                '0.' + e.currentVertexPosition,
                t.lngLat.lng,
                t.lngLat.lat,
              ),
                o.isVertex(t) && this.updateUIClasses({ mouse: s.cursors.POINTER });
            }),
            (e.onTap = e.onClick =
              function (e, t) {
                return o.isVertex(t) ? this.clickOnVertex(e, t) : this.clickAnywhere(e, t);
              }),
            (e.onKeyUp = function (e, t) {
              o.isEscapeKey(t)
                ? (this.deleteFeature([e.polygon.id], { silent: !0 }),
                  this.changeMode(s.modes.SIMPLE_SELECT))
                : o.isEnterKey(t) &&
                  this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
            }),
            (e.onStop = function (e) {
              this.updateUIClasses({ mouse: s.cursors.NONE }),
                i.enable(this),
                this.activateUIButton(),
                void 0 !== this.getFeature(e.polygon.id) &&
                  (e.polygon.isValid()
                    ? e.initiallyFeatures && 0 < e.initiallyFeatures.length
                      ? this.map.fire(s.events.UPDATE, {
                          action: s.updateActions.CHANGE_COORDINATES,
                          prevFeatures: e.initiallyFeatures,
                          features: [e.polygon.toGeoJSON()],
                        })
                      : this.map.fire(s.events.CREATE, { features: [e.polygon.toGeoJSON()] })
                    : (this.deleteFeature([e.polygon.id], { silent: !0 }),
                      this.changeMode(s.modes.SIMPLE_SELECT, {}, { silent: !0 })));
            }),
            (e.toDisplayFeatures = function (e, t, r) {
              var o = t.properties.id === e.polygon.id;
              if (((t.properties.active = o ? s.activeStates.ACTIVE : s.activeStates.INACTIVE), !o))
                return r(t);
              if (0 !== t.geometry.coordinates.length) {
                o = t.geometry.coordinates[0].length;
                if (!(o < 3)) {
                  if (
                    ((t.properties.meta = s.meta.FEATURE),
                    r(a(e.polygon.id, t.geometry.coordinates[0][0], '0.0', !1, t)),
                    4 < o &&
                      ((n = t.geometry.coordinates[0].length - 1),
                      r(a(e.polygon.id, t.geometry.coordinates[0][n], '0.' + n, !1, t))),
                    o <= 4)
                  ) {
                    var n = [
                      [t.geometry.coordinates[0][0][0], t.geometry.coordinates[0][0][1]],
                      [t.geometry.coordinates[0][1][0], t.geometry.coordinates[0][1][1]],
                    ];
                    if (
                      (r({
                        type: s.geojsonTypes.FEATURE,
                        properties: t.properties,
                        geometry: { coordinates: n, type: s.geojsonTypes.LINE_STRING },
                      }),
                      3 === o)
                    )
                      return;
                  }
                  return r(t);
                }
              }
            }),
            (e.onTrash = function (e) {
              this.deleteFeature([e.polygon.id], { silent: !0 }),
                this.changeMode(s.modes.SIMPLE_SELECT);
            }),
            (t.exports = e);
        },
        {
          '../constants': 172,
          '../lib/common_selectors': 212,
          '../lib/create_vertex': 216,
          '../lib/double_click_zoom': 217,
        },
      ],
      243: [
        function (e, t, r) {
          'use strict';
          var o = e('../lib/common_selectors'),
            i = e('../lib/double_click_zoom'),
            s = e('../constants'),
            a = e('../lib/create_vertex'),
            e = {
              onSetup: function (e) {
                e = e || {};
                var t = null,
                  r = [];
                this.drawConfig.secondEdit &&
                  ((o =
                    (n = 1 === (o = this.getSelectedIds()).length ? this.getFeature(o[0]) : null) &&
                    n.properties
                      ? n.properties
                      : {}),
                  (t =
                    n && 'offensive_tail_arrow' === o.feature_type && o.start && o.middle && o.end
                      ? n
                      : null) && r.push(t.toGeoJSON()));
                var o = void 0,
                  n = void 0,
                  n = t
                    ? ((o = this.newOffensiveTailArrow({
                        id: t.id,
                        type: s.geojsonTypes.FEATURE,
                        properties: t.properties,
                        geometry: { type: s.geojsonTypes.POLYGON, coordinates: t.getCoordinates() },
                      })),
                      2)
                    : ((o = this.newOffensiveTailArrow({
                        type: s.geojsonTypes.FEATURE,
                        properties: {},
                        geometry: { type: s.geojsonTypes.POLYGON, coordinates: [[]] },
                      })),
                      this.preSettingStyle(o, e.style || {}),
                      0);
                return (
                  this.addFeature(o),
                  this.clearSelectedFeatures(),
                  i.disable(this),
                  this.updateUIClasses({ mouse: s.cursors.ADD }),
                  this.activateUIButton(s.types.POLYGON),
                  this.setActionableState({ trash: !0 }),
                  { polygon: o, currentVertexPosition: n, initiallyFeatures: r }
                );
              },
              clickAnywhere: function (e, t) {
                if (1 < e.currentVertexPosition)
                  return this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
                this.updateUIClasses({ mouse: s.cursors.ADD }),
                  e.polygon.updateCoordinate(
                    '0.' + e.currentVertexPosition,
                    t.lngLat.lng,
                    t.lngLat.lat,
                  ),
                  e.currentVertexPosition++;
              },
              clickOnVertex: function (e) {
                return this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
              },
            };
          (e.onTouchMove = e.onMouseMove =
            function (e, t) {
              e.polygon.updateCoordinate(
                '0.' + e.currentVertexPosition,
                t.lngLat.lng,
                t.lngLat.lat,
              ),
                o.isVertex(t) && this.updateUIClasses({ mouse: s.cursors.POINTER });
            }),
            (e.onTap = e.onClick =
              function (e, t) {
                return o.isVertex(t) ? this.clickOnVertex(e, t) : this.clickAnywhere(e, t);
              }),
            (e.onKeyUp = function (e, t) {
              o.isEscapeKey(t)
                ? (this.deleteFeature([e.polygon.id], { silent: !0 }),
                  this.changeMode(s.modes.SIMPLE_SELECT))
                : o.isEnterKey(t) &&
                  this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
            }),
            (e.onStop = function (e) {
              this.updateUIClasses({ mouse: s.cursors.NONE }),
                i.enable(this),
                this.activateUIButton(),
                void 0 !== this.getFeature(e.polygon.id) &&
                  (e.polygon.isValid()
                    ? e.initiallyFeatures && 0 < e.initiallyFeatures.length
                      ? this.map.fire(s.events.UPDATE, {
                          action: s.updateActions.CHANGE_COORDINATES,
                          prevFeatures: e.initiallyFeatures,
                          features: [e.polygon.toGeoJSON()],
                        })
                      : this.map.fire(s.events.CREATE, { features: [e.polygon.toGeoJSON()] })
                    : (this.deleteFeature([e.polygon.id], { silent: !0 }),
                      this.changeMode(s.modes.SIMPLE_SELECT, {}, { silent: !0 })));
            }),
            (e.toDisplayFeatures = function (e, t, r) {
              var o = t.properties.id === e.polygon.id;
              if (((t.properties.active = o ? s.activeStates.ACTIVE : s.activeStates.INACTIVE), !o))
                return r(t);
              if (0 !== t.geometry.coordinates.length) {
                o = t.geometry.coordinates[0].length;
                if (!(o < 3)) {
                  if (
                    ((t.properties.meta = s.meta.FEATURE),
                    r(a(e.polygon.id, t.geometry.coordinates[0][0], '0.0', !1, t)),
                    4 < o &&
                      ((n = t.geometry.coordinates[0].length - 1),
                      r(a(e.polygon.id, t.geometry.coordinates[0][n], '0.' + n, !1, t))),
                    o <= 4)
                  ) {
                    var n = [
                      [t.geometry.coordinates[0][0][0], t.geometry.coordinates[0][0][1]],
                      [t.geometry.coordinates[0][1][0], t.geometry.coordinates[0][1][1]],
                    ];
                    if (
                      (r({
                        type: s.geojsonTypes.FEATURE,
                        properties: t.properties,
                        geometry: { coordinates: n, type: s.geojsonTypes.LINE_STRING },
                      }),
                      3 === o)
                    )
                      return;
                  }
                  return r(t);
                }
              }
            }),
            (e.onTrash = function (e) {
              this.deleteFeature([e.polygon.id], { silent: !0 }),
                this.changeMode(s.modes.SIMPLE_SELECT);
            }),
            (t.exports = e);
        },
        {
          '../constants': 172,
          '../lib/common_selectors': 212,
          '../lib/create_vertex': 216,
          '../lib/double_click_zoom': 217,
        },
      ],
      244: [
        function (e, t, r) {
          'use strict';
          var o = e('../lib/common_selectors'),
            i = e('../lib/double_click_zoom'),
            s = e('../constants'),
            n = e('../lib/is_event_at_coordinates'),
            a = e('../lib/create_vertex'),
            e = {
              onSetup: function (e) {
                e = e || {};
                var t = null,
                  r = [];
                this.drawConfig.secondEdit &&
                  ((o =
                    (n = 1 === (o = this.getSelectedIds()).length ? this.getFeature(o[0]) : null) &&
                    n.properties
                      ? n.properties
                      : {}),
                  (t = n && 'parallel_polygon' === o.feature_type && o.start ? n : null) &&
                    r.push(t.toGeoJSON()));
                var o = void 0,
                  n = void 0,
                  n =
                    (t
                      ? (o = this.newParallelPolygon({
                          id: t.id,
                          type: s.geojsonTypes.FEATURE,
                          properties: t.properties,
                          geometry: { type: s.geojsonTypes.POLYGON, coordinates: [[]] },
                        }))
                      : ((o = this.newParallelPolygon({
                          type: s.geojsonTypes.FEATURE,
                          properties: {},
                          geometry: { type: s.geojsonTypes.POLYGON, coordinates: [[]] },
                        })),
                        this.preSettingStyle(o, e.style || {})),
                    0);
                return (
                  this.addFeature(o),
                  (o.properties.distance = e.distance || 50),
                  (o.properties.isClockwise = e.isClockwise || !0),
                  this.clearSelectedFeatures(),
                  i.disable(this),
                  this.updateUIClasses({ mouse: s.cursors.ADD }),
                  this.activateUIButton(s.types.POLYGON),
                  this.setActionableState({ trash: !0 }),
                  { polygon: o, currentVertexPosition: n, initiallyFeatures: r }
                );
              },
              clickAnywhere: function (e, t) {
                var r = e.polygon.initCoordinates ? e.polygon.initCoordinates[0].length - 2 : 0;
                if (1 < e.currentVertexPosition && 1 <= r && n(t, e.polygon.initCoordinates[0][r]))
                  return this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
                this.updateUIClasses({ mouse: s.cursors.ADD }),
                  e.polygon.updateCoordinate(
                    '0.' + e.currentVertexPosition,
                    t.lngLat.lng,
                    t.lngLat.lat,
                  ),
                  e.currentVertexPosition++;
              },
              clickOnVertex: function (e) {
                return this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
              },
            };
          (e.onTouchMove = e.onMouseMove =
            function (e, t) {
              e.polygon.updateCoordinate(
                '0.' + e.currentVertexPosition,
                t.lngLat.lng,
                t.lngLat.lat,
              ),
                o.isVertex(t) && this.updateUIClasses({ mouse: s.cursors.POINTER });
            }),
            (e.onTap = e.onClick =
              function (e, t) {
                return o.isVertex(t) ? this.clickOnVertex(e, t) : this.clickAnywhere(e, t);
              }),
            (e.onKeyUp = function (e, t) {
              o.isEscapeKey(t)
                ? (this.deleteFeature([e.polygon.id], { silent: !0 }),
                  this.changeMode(s.modes.SIMPLE_SELECT))
                : o.isEnterKey(t) &&
                  this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
            }),
            (e.onStop = function (e) {
              this.updateUIClasses({ mouse: s.cursors.NONE }),
                i.enable(this),
                this.activateUIButton(),
                void 0 !== this.getFeature(e.polygon.id) &&
                  (e.polygon.updateCoordinate2(),
                  e.polygon.isValid()
                    ? e.initiallyFeatures && 0 < e.initiallyFeatures.length
                      ? this.map.fire(s.events.UPDATE, {
                          action: s.updateActions.CHANGE_COORDINATES,
                          prevFeatures: e.initiallyFeatures,
                          features: [e.polygon.toGeoJSON()],
                        })
                      : this.map.fire(s.events.CREATE, { features: [e.polygon.toGeoJSON()] })
                    : (this.deleteFeature([e.polygon.id], { silent: !0 }),
                      this.changeMode(s.modes.SIMPLE_SELECT, {}, { silent: !0 })));
            }),
            (e.toDisplayFeatures = function (e, t, r) {
              var o = t.properties.id === e.polygon.id;
              if (((t.properties.active = o ? s.activeStates.ACTIVE : s.activeStates.INACTIVE), !o))
                return r(t);
              if (0 !== t.geometry.coordinates.length) {
                var n = t.geometry.coordinates[0].length;
                if (!(n < 3)) {
                  (t.properties.meta = s.meta.FEATURE),
                    r(a(e.polygon.id, t.geometry.coordinates[0][0], '0.0', !1, t));
                  o = e.polygon.initCoordinates[0].length - 2;
                  if (
                    (0 < o && r(a(e.polygon.id, t.geometry.coordinates[0][o], '0.' + o, !1, t)),
                    n <= 4)
                  ) {
                    o = [
                      [t.geometry.coordinates[0][0][0], t.geometry.coordinates[0][0][1]],
                      [t.geometry.coordinates[0][1][0], t.geometry.coordinates[0][1][1]],
                    ];
                    if (
                      (r({
                        type: s.geojsonTypes.FEATURE,
                        properties: t.properties,
                        geometry: { coordinates: o, type: s.geojsonTypes.LINE_STRING },
                      }),
                      3 === n)
                    )
                      return;
                  }
                  return r(t);
                }
              }
            }),
            (e.onTrash = function (e) {
              this.deleteFeature([e.polygon.id], { silent: !0 }),
                this.changeMode(s.modes.SIMPLE_SELECT);
            }),
            (t.exports = e);
        },
        {
          '../constants': 172,
          '../lib/common_selectors': 212,
          '../lib/create_vertex': 216,
          '../lib/double_click_zoom': 217,
          '../lib/is_event_at_coordinates': 222,
        },
      ],
      245: [
        function (e, t, r) {
          'use strict';
          var o = e('../lib/common_selectors'),
            i = e('../lib/double_click_zoom'),
            s = e('../constants'),
            a = e('../lib/create_vertex'),
            e = {
              onSetup: function (e) {
                e = e || {};
                var t = this.getSelectedIds(),
                  r = 1 === t.length ? this.getFeature(t[0]) : null,
                  o = r && r.properties ? r.properties : {},
                  n =
                    r && 'pincer_attack_arrow' === o.feature_type && o.start && o.middle && o.end
                      ? r
                      : null,
                  t = [];
                n && t.push(n.toGeoJSON());
                (o = void 0),
                  (r = void 0),
                  (r = n
                    ? ((o = this.newPincerAttackArrow({
                        id: n.id,
                        type: s.geojsonTypes.FEATURE,
                        properties: n.properties,
                        geometry: { type: s.geojsonTypes.POLYGON, coordinates: n.getCoordinates() },
                      })),
                      2)
                    : ((o = this.newPincerAttackArrow({
                        type: s.geojsonTypes.FEATURE,
                        properties: {},
                        geometry: { type: s.geojsonTypes.POLYGON, coordinates: [[]] },
                      })),
                      this.preSettingStyle(o, e.style || {}),
                      0));
                return (
                  this.addFeature(o),
                  this.clearSelectedFeatures(),
                  i.disable(this),
                  this.updateUIClasses({ mouse: s.cursors.ADD }),
                  this.activateUIButton(s.types.POLYGON),
                  this.setActionableState({ trash: !0 }),
                  { polygon: o, currentVertexPosition: r, initiallyFeatures: t }
                );
              },
              clickAnywhere: function (e, t) {
                if (1 < e.currentVertexPosition)
                  return this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
                this.updateUIClasses({ mouse: s.cursors.ADD }),
                  e.polygon.updateCoordinate(
                    '0.' + e.currentVertexPosition,
                    t.lngLat.lng,
                    t.lngLat.lat,
                  ),
                  e.currentVertexPosition++;
              },
              clickOnVertex: function (e) {
                return this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
              },
            };
          (e.onTouchMove = e.onMouseMove =
            function (e, t) {
              e.polygon.updateCoordinate(
                '0.' + e.currentVertexPosition,
                t.lngLat.lng,
                t.lngLat.lat,
              ),
                o.isVertex(t) && this.updateUIClasses({ mouse: s.cursors.POINTER });
            }),
            (e.onTap = e.onClick =
              function (e, t) {
                return o.isVertex(t) ? this.clickOnVertex(e, t) : this.clickAnywhere(e, t);
              }),
            (e.onKeyUp = function (e, t) {
              o.isEscapeKey(t)
                ? (this.deleteFeature([e.polygon.id], { silent: !0 }),
                  this.changeMode(s.modes.SIMPLE_SELECT))
                : o.isEnterKey(t) &&
                  this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
            }),
            (e.onStop = function (e) {
              this.updateUIClasses({ mouse: s.cursors.NONE }),
                i.enable(this),
                this.activateUIButton(),
                void 0 !== this.getFeature(e.polygon.id) &&
                  (e.polygon.isValid()
                    ? e.initiallyFeatures && 0 < e.initiallyFeatures.length
                      ? this.map.fire(s.events.UPDATE, {
                          action: s.updateActions.CHANGE_COORDINATES,
                          prevFeatures: e.initiallyFeatures,
                          features: [e.polygon.toGeoJSON()],
                        })
                      : this.map.fire(s.events.CREATE, { features: [e.polygon.toGeoJSON()] })
                    : (this.deleteFeature([e.polygon.id], { silent: !0 }),
                      this.changeMode(s.modes.SIMPLE_SELECT, {}, { silent: !0 })));
            }),
            (e.toDisplayFeatures = function (e, t, r) {
              var o = t.properties.id === e.polygon.id;
              if (((t.properties.active = o ? s.activeStates.ACTIVE : s.activeStates.INACTIVE), !o))
                return r(t);
              if (0 !== t.geometry.coordinates.length) {
                o = t.geometry.coordinates[0].length;
                if (!(o < 3)) {
                  if (
                    ((t.properties.meta = s.meta.FEATURE),
                    r(a(e.polygon.id, t.geometry.coordinates[0][0], '0.0', !1, t)),
                    4 < o &&
                      ((n = t.geometry.coordinates[0].length - 1),
                      r(a(e.polygon.id, t.geometry.coordinates[0][n], '0.' + n, !1, t))),
                    o <= 4)
                  ) {
                    var n = [
                      [t.geometry.coordinates[0][0][0], t.geometry.coordinates[0][0][1]],
                      [t.geometry.coordinates[0][1][0], t.geometry.coordinates[0][1][1]],
                    ];
                    if (
                      (r({
                        type: s.geojsonTypes.FEATURE,
                        properties: t.properties,
                        geometry: { coordinates: n, type: s.geojsonTypes.LINE_STRING },
                      }),
                      3 === o)
                    )
                      return;
                  }
                  return r(t);
                }
              }
            }),
            (e.onTrash = function (e) {
              this.deleteFeature([e.polygon.id], { silent: !0 }),
                this.changeMode(s.modes.SIMPLE_SELECT);
            }),
            (t.exports = e);
        },
        {
          '../constants': 172,
          '../lib/common_selectors': 212,
          '../lib/create_vertex': 216,
          '../lib/double_click_zoom': 217,
        },
      ],
      246: [
        function (e, t, r) {
          'use strict';
          var o = e('../lib/common_selectors'),
            n = e('../constants'),
            e = {
              onSetup: function (e) {
                e = e || {};
                var t = this.newFeature({
                  type: n.geojsonTypes.FEATURE,
                  properties: {},
                  geometry: { type: n.geojsonTypes.POINT, coordinates: [] },
                });
                return (
                  this.preSettingStyle(t, e.style || {}),
                  this.addFeature(t),
                  this.clearSelectedFeatures(),
                  this.updateUIClasses({ mouse: n.cursors.ADD }),
                  this.activateUIButton(n.types.POINT),
                  this.setActionableState({ trash: !0 }),
                  { point: t }
                );
              },
              stopDrawingAndRemove: function (e) {
                this.deleteFeature([e.point.id], { silent: !0 }),
                  this.changeMode(n.modes.SIMPLE_SELECT);
              },
            };
          (e.onTap = e.onClick =
            function (e, t) {
              this.updateUIClasses({ mouse: n.cursors.MOVE }),
                e.point.updateCoordinate('', t.lngLat.lng, t.lngLat.lat),
                this.map.fire(n.events.CREATE, { features: [e.point.toGeoJSON()] }),
                this.changeMode(n.modes.SIMPLE_SELECT, { featureIds: [e.point.id] });
            }),
            (e.onStop = function (e) {
              this.activateUIButton(),
                e.point.getCoordinate().length || this.deleteFeature([e.point.id], { silent: !0 });
            }),
            (e.toDisplayFeatures = function (e, t, r) {
              e = t.properties.id === e.point.id;
              if (((t.properties.active = e ? n.activeStates.ACTIVE : n.activeStates.INACTIVE), !e))
                return r(t);
            }),
            (e.onTrash = e.stopDrawingAndRemove),
            (e.onKeyUp = function (e, t) {
              if (o.isEscapeKey(t) || o.isEnterKey(t)) return this.stopDrawingAndRemove(e, t);
            }),
            (t.exports = e);
        },
        { '../constants': 172, '../lib/common_selectors': 212 },
      ],
      247: [
        function (e, t, r) {
          'use strict';
          var n = e('../lib/common_selectors'),
            o = e('../lib/double_click_zoom'),
            i = e('../constants'),
            s = e('../lib/is_event_at_coordinates'),
            a = e('../lib/create_vertex'),
            e = {
              onSetup: function (e) {
                e = e || {};
                var t = this.newFeature({
                  type: i.geojsonTypes.FEATURE,
                  properties: {},
                  geometry: { type: i.geojsonTypes.POLYGON, coordinates: [[]] },
                });
                return (
                  this.preSettingStyle(t, e.style || {}),
                  this.addFeature(t),
                  this.clearSelectedFeatures(),
                  o.disable(this),
                  this.updateUIClasses({ mouse: i.cursors.ADD }),
                  this.activateUIButton(i.types.POLYGON),
                  this.setActionableState({ trash: !0 }),
                  { polygon: t, currentVertexPosition: 0 }
                );
              },
              clickAnywhere: function (e, t) {
                if (
                  0 < e.currentVertexPosition &&
                  s(t, e.polygon.coordinates[0][e.currentVertexPosition - 1])
                )
                  return this.changeMode(i.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
                var r = this.getAdsorbCoord(e, t, t.adsorbFeatureTargets || [], e.polygon.id),
                  t = r || [t.lngLat.lng, t.lngLat.lat];
                this.updateUIClasses({ mouse: r ? i.cursors.POINTER : i.cursors.ADD }),
                  e.polygon.updateCoordinate('0.' + e.currentVertexPosition, t[0], t[1]),
                  e.currentVertexPosition++,
                  e.polygon.updateCoordinate('0.' + e.currentVertexPosition, t[0], t[1]);
              },
              clickOnVertex: function (e) {
                return this.changeMode(i.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
              },
            };
          (e.onTouchMove = e.onMouseMove =
            function (e, t) {
              var r = this.getAdsorbCoord(e, t, t.adsorbFeatureTargets || [], e.polygon.id),
                o = r || [t.lngLat.lng, t.lngLat.lat];
              e.polygon.updateCoordinate('0.' + e.currentVertexPosition, o[0], o[1]),
                n.isVertex(t) && this.updateUIClasses({ mouse: i.cursors.POINTER }),
                r && this.updateUIClasses({ mouse: i.cursors.POINTER });
            }),
            (e.onTap = e.onClick =
              function (e, t) {
                return n.isVertex(t) ? this.clickOnVertex(e, t) : this.clickAnywhere(e, t);
              }),
            (e.onKeyUp = function (e, t) {
              n.isEscapeKey(t)
                ? (this.deleteFeature([e.polygon.id], { silent: !0 }),
                  this.changeMode(i.modes.SIMPLE_SELECT))
                : n.isEnterKey(t) &&
                  this.changeMode(i.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
            }),
            (e.onStop = function (e) {
              this.updateUIClasses({ mouse: i.cursors.NONE }),
                o.enable(this),
                this.activateUIButton(),
                void 0 !== this.getFeature(e.polygon.id) &&
                  (e.polygon.removeCoordinate('0.' + e.currentVertexPosition),
                  e.polygon.isValid()
                    ? this.map.fire(i.events.CREATE, { features: [e.polygon.toGeoJSON()] })
                    : (this.deleteFeature([e.polygon.id], { silent: !0 }),
                      this.changeMode(i.modes.SIMPLE_SELECT, {}, { silent: !0 })));
            }),
            (e.toDisplayFeatures = function (e, t, r) {
              var o = t.properties.id === e.polygon.id;
              if (((t.properties.active = o ? i.activeStates.ACTIVE : i.activeStates.INACTIVE), !o))
                return r(t);
              if (0 !== t.geometry.coordinates.length) {
                o = t.geometry.coordinates[0].length;
                if (!(o < 3)) {
                  if (
                    ((t.properties.meta = i.meta.FEATURE),
                    r(a(e.polygon.id, t.geometry.coordinates[0][0], '0.0', !1, t)),
                    3 < o &&
                      ((n = t.geometry.coordinates[0].length - 3),
                      r(a(e.polygon.id, t.geometry.coordinates[0][n], '0.' + n, !1, t))),
                    o <= 4)
                  ) {
                    var n = [
                      [t.geometry.coordinates[0][0][0], t.geometry.coordinates[0][0][1]],
                      [t.geometry.coordinates[0][1][0], t.geometry.coordinates[0][1][1]],
                    ];
                    if (
                      (r({
                        type: i.geojsonTypes.FEATURE,
                        properties: t.properties,
                        geometry: { coordinates: n, type: i.geojsonTypes.LINE_STRING },
                      }),
                      3 === o)
                    )
                      return;
                  }
                  return r(t);
                }
              }
            }),
            (e.onTrash = function (e) {
              this.deleteFeature([e.polygon.id], { silent: !0 }),
                this.changeMode(i.modes.SIMPLE_SELECT);
            }),
            (t.exports = e);
        },
        {
          '../constants': 172,
          '../lib/common_selectors': 212,
          '../lib/create_vertex': 216,
          '../lib/double_click_zoom': 217,
          '../lib/is_event_at_coordinates': 222,
        },
      ],
      248: [
        function (e, t, r) {
          'use strict';
          var o = e('../lib/common_selectors'),
            i = e('../lib/double_click_zoom'),
            s = e('../constants'),
            a = e('../lib/create_vertex'),
            e = {
              onSetup: function (e) {
                e = e || {};
                var t,
                  r = [],
                  o = null;
                this.drawConfig.secondEdit &&
                  ((t =
                    (n = 1 === (t = this.getSelectedIds()).length ? this.getFeature(t[0]) : null) &&
                    n.properties
                      ? n.properties
                      : {}),
                  (o = n && 'rectangle' === t.feature_type && t.start && t.end ? n : null) &&
                    r.push(o.toGeoJSON()));
                var n = o
                  ? this.newRectangle({
                      id: o.id,
                      type: s.geojsonTypes.FEATURE,
                      properties: o.properties,
                      geometry: { type: s.geojsonTypes.POLYGON, coordinates: o.getCoordinates() },
                    })
                  : this.newRectangle({
                      type: s.geojsonTypes.FEATURE,
                      properties: {},
                      geometry: { type: s.geojsonTypes.POLYGON, coordinates: [[]] },
                    });
                return (
                  this.preSettingStyle(n, e.style || {}),
                  this.addFeature(n),
                  this.clearSelectedFeatures(),
                  i.disable(this),
                  this.updateUIClasses({ mouse: s.cursors.ADD }),
                  this.activateUIButton(s.types.POLYGON),
                  this.setActionableState({ trash: !0 }),
                  { initiallyFeatures: r, polygon: n, currentVertexPosition: o ? 1 : 0 }
                );
              },
              clickAnywhere: function (e, t) {
                if (1 <= e.currentVertexPosition)
                  return this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
                this.updateUIClasses({ mouse: s.cursors.ADD }),
                  e.polygon.updateCoordinate(
                    '0.' + e.currentVertexPosition,
                    t.lngLat.lng,
                    t.lngLat.lat,
                  ),
                  e.currentVertexPosition++,
                  1 <= e.currentVertexPosition && (e.currentVertexPosition = 1);
              },
              clickOnVertex: function (e) {
                return this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
              },
            };
          (e.onTouchMove = e.onMouseMove =
            function (e, t) {
              e.polygon.updateCoordinate(
                '0.' + e.currentVertexPosition,
                t.lngLat.lng,
                t.lngLat.lat,
              ),
                o.isVertex(t) && this.updateUIClasses({ mouse: s.cursors.POINTER });
            }),
            (e.onTap = e.onClick =
              function (e, t) {
                return o.isVertex(t) ? this.clickOnVertex(e, t) : this.clickAnywhere(e, t);
              }),
            (e.onKeyUp = function (e, t) {
              o.isEscapeKey(t)
                ? (this.deleteFeature([e.polygon.id], { silent: !0 }),
                  this.changeMode(s.modes.SIMPLE_SELECT))
                : o.isEnterKey(t) &&
                  this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
            }),
            (e.onStop = function (e) {
              this.updateUIClasses({ mouse: s.cursors.NONE }),
                i.enable(this),
                this.activateUIButton(),
                void 0 !== this.getFeature(e.polygon.id) &&
                  (e.polygon.isValid()
                    ? e.initiallyFeatures && 0 < e.initiallyFeatures.length
                      ? this.map.fire(s.events.UPDATE, {
                          action: s.updateActions.CHANGE_COORDINATES,
                          prevFeatures: e.initiallyFeatures,
                          features: [e.polygon.toGeoJSON()],
                        })
                      : this.map.fire(s.events.CREATE, { features: [e.polygon.toGeoJSON()] })
                    : (this.deleteFeature([e.polygon.id], { silent: !0 }),
                      this.changeMode(s.modes.SIMPLE_SELECT, {}, { silent: !0 })));
            }),
            (e.toDisplayFeatures = function (e, t, r) {
              var o = t.properties.id === e.polygon.id;
              if (((t.properties.active = o ? s.activeStates.ACTIVE : s.activeStates.INACTIVE), !o))
                return r(t);
              if (0 !== t.geometry.coordinates.length) {
                o = t.geometry.coordinates[0].length;
                if (!(o < 3)) {
                  if (
                    ((t.properties.meta = s.meta.FEATURE),
                    r(a(e.polygon.id, t.geometry.coordinates[0][0], '0.0', !1, t)),
                    3 < o &&
                      ((n = t.geometry.coordinates[0].length - 3),
                      r(a(e.polygon.id, t.geometry.coordinates[0][n], '0.' + n, !1, t))),
                    o <= 4)
                  ) {
                    var n = [
                      [t.geometry.coordinates[0][0][0], t.geometry.coordinates[0][0][1]],
                      [t.geometry.coordinates[0][1][0], t.geometry.coordinates[0][1][1]],
                    ];
                    if (
                      (r({
                        type: s.geojsonTypes.FEATURE,
                        properties: t.properties,
                        geometry: { coordinates: n, type: s.geojsonTypes.LINE_STRING },
                      }),
                      3 === o)
                    )
                      return;
                  }
                  return r(t);
                }
              }
            }),
            (e.onTrash = function (e) {
              this.deleteFeature([e.polygon.id], { silent: !0 }),
                this.changeMode(s.modes.SIMPLE_SELECT);
            }),
            (t.exports = e);
        },
        {
          '../constants': 172,
          '../lib/common_selectors': 212,
          '../lib/create_vertex': 216,
          '../lib/double_click_zoom': 217,
        },
      ],
      249: [
        function (e, t, r) {
          'use strict';
          var o = e('../lib/common_selectors'),
            i = e('../lib/double_click_zoom'),
            s = e('../constants'),
            a = e('../lib/create_vertex'),
            e = {
              onSetup: function (e) {
                e = e || {};
                var t,
                  r = [],
                  o = null;
                this.drawConfig.secondEdit &&
                  ((t =
                    (n = 1 === (t = this.getSelectedIds()).length ? this.getFeature(t[0]) : null) &&
                    n.properties
                      ? n.properties
                      : {}),
                  (o =
                    n && 'sector' === t.feature_type && t.center && t.start && t.end ? n : null) &&
                    r.push(o.toGeoJSON()));
                var n = o
                  ? this.newSector({
                      id: o.id,
                      type: s.geojsonTypes.FEATURE,
                      properties: o.properties,
                      geometry: { type: s.geojsonTypes.POLYGON, coordinates: o.getCoordinates() },
                    })
                  : this.newSector({
                      type: s.geojsonTypes.FEATURE,
                      properties: {},
                      geometry: { type: s.geojsonTypes.POLYGON, coordinates: [[]] },
                    });
                return (
                  this.preSettingStyle(n, e.style || {}),
                  this.addFeature(n),
                  this.clearSelectedFeatures(),
                  i.disable(this),
                  this.updateUIClasses({ mouse: s.cursors.ADD }),
                  this.activateUIButton(s.types.POLYGON),
                  this.setActionableState({ trash: !0 }),
                  { initiallyFeatures: r, polygon: n, currentVertexPosition: o ? 2 : 0 }
                );
              },
              clickAnywhere: function (e, t) {
                if (1 < e.currentVertexPosition)
                  return this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
                this.updateUIClasses({ mouse: s.cursors.ADD }),
                  e.polygon.updateCoordinate(
                    '0.' + e.currentVertexPosition,
                    t.lngLat.lng,
                    t.lngLat.lat,
                  ),
                  e.currentVertexPosition++;
              },
              clickOnVertex: function (e) {
                return this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
              },
            };
          (e.onTouchMove = e.onMouseMove =
            function (e, t) {
              e.polygon.updateCoordinate(
                '0.' + e.currentVertexPosition,
                t.lngLat.lng,
                t.lngLat.lat,
              ),
                o.isVertex(t) && this.updateUIClasses({ mouse: s.cursors.POINTER });
            }),
            (e.onTap = e.onClick =
              function (e, t) {
                return o.isVertex(t) ? this.clickOnVertex(e, t) : this.clickAnywhere(e, t);
              }),
            (e.onKeyUp = function (e, t) {
              o.isEscapeKey(t)
                ? (this.deleteFeature([e.polygon.id], { silent: !0 }),
                  this.changeMode(s.modes.SIMPLE_SELECT))
                : o.isEnterKey(t) &&
                  this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
            }),
            (e.onStop = function (e) {
              this.updateUIClasses({ mouse: s.cursors.NONE }),
                i.enable(this),
                this.activateUIButton(),
                void 0 !== this.getFeature(e.polygon.id) &&
                  (e.polygon.isValid()
                    ? e.initiallyFeatures && 0 < e.initiallyFeatures.length
                      ? this.map.fire(s.events.UPDATE, {
                          action: s.updateActions.CHANGE_COORDINATES,
                          prevFeatures: e.initiallyFeatures,
                          features: [e.polygon.toGeoJSON()],
                        })
                      : this.map.fire(s.events.CREATE, { features: [e.polygon.toGeoJSON()] })
                    : (this.deleteFeature([e.polygon.id], { silent: !0 }),
                      this.changeMode(s.modes.SIMPLE_SELECT, {}, { silent: !0 })));
            }),
            (e.toDisplayFeatures = function (e, t, r) {
              var o = t.properties.id === e.polygon.id;
              if (((t.properties.active = o ? s.activeStates.ACTIVE : s.activeStates.INACTIVE), !o))
                return r(t);
              if (0 !== t.geometry.coordinates.length) {
                o = t.geometry.coordinates[0].length;
                if (!(o < 3)) {
                  if (
                    ((t.properties.meta = s.meta.FEATURE),
                    r(a(e.polygon.id, t.geometry.coordinates[0][0], '0.0', !1, t)),
                    4 < o &&
                      ((n = t.geometry.coordinates[0].length - 1),
                      r(a(e.polygon.id, t.geometry.coordinates[0][n], '0.' + n, !1, t))),
                    o <= 4)
                  ) {
                    var n = [
                      [t.geometry.coordinates[0][0][0], t.geometry.coordinates[0][0][1]],
                      [t.geometry.coordinates[0][1][0], t.geometry.coordinates[0][1][1]],
                    ];
                    if (
                      (r({
                        type: s.geojsonTypes.FEATURE,
                        properties: t.properties,
                        geometry: { coordinates: n, type: s.geojsonTypes.LINE_STRING },
                      }),
                      3 === o)
                    )
                      return;
                  }
                  return r(t);
                }
              }
            }),
            (e.onTrash = function (e) {
              this.deleteFeature([e.polygon.id], { silent: !0 }),
                this.changeMode(s.modes.SIMPLE_SELECT);
            }),
            (t.exports = e);
        },
        {
          '../constants': 172,
          '../lib/common_selectors': 212,
          '../lib/create_vertex': 216,
          '../lib/double_click_zoom': 217,
        },
      ],
      250: [
        function (e, t, r) {
          'use strict';
          var o = e('../lib/common_selectors'),
            n = e('../constants'),
            e = {
              onSetup: function (e) {
                e = e || {};
                var t = {
                    type: n.geojsonTypes.FEATURE,
                    properties: { custom_style: 'true', feature_type: 'text' },
                    geometry: { type: n.geojsonTypes.POINT, coordinates: [] },
                  },
                  e = e.style || {};
                e.textField && (t.properties.textField = e.textField),
                  e.textColor && (t.properties.textColor = e.textColor),
                  void 0 !== e.textSize && (t.properties.textSize = e.textSize);
                t = this.newFeature(t);
                return (
                  this.addFeature(t),
                  this.clearSelectedFeatures(),
                  this.updateUIClasses({ mouse: n.cursors.ADD }),
                  this.activateUIButton(n.types.POINT),
                  this.setActionableState({ trash: !0 }),
                  { point: t }
                );
              },
              stopDrawingAndRemove: function (e) {
                this.deleteFeature([e.point.id], { silent: !0 }),
                  this.changeMode(n.modes.SIMPLE_SELECT);
              },
            };
          (e.onTap = e.onClick =
            function (e, t) {
              this.updateUIClasses({ mouse: n.cursors.MOVE }),
                e.point.updateCoordinate('', t.lngLat.lng, t.lngLat.lat),
                this.map.fire(n.events.CREATE, { features: [e.point.toGeoJSON()] }),
                this.changeMode(n.modes.SIMPLE_SELECT, { featureIds: [e.point.id] });
            }),
            (e.onStop = function (e) {
              this.activateUIButton(),
                e.point.getCoordinate().length || this.deleteFeature([e.point.id], { silent: !0 });
            }),
            (e.toDisplayFeatures = function (e, t, r) {
              e = t.properties.id === e.point.id;
              if (((t.properties.active = e ? n.activeStates.ACTIVE : n.activeStates.INACTIVE), !e))
                return r(t);
            }),
            (e.onTrash = e.stopDrawingAndRemove),
            (e.onKeyUp = function (e, t) {
              if (o.isEscapeKey(t) || o.isEnterKey(t)) return this.stopDrawingAndRemove(e, t);
            }),
            (t.exports = e);
        },
        { '../constants': 172, '../lib/common_selectors': 212 },
      ],
      251: [
        function (e, t, r) {
          'use strict';
          var o = e('../lib/common_selectors'),
            i = e('../lib/double_click_zoom'),
            s = e('../constants'),
            a = e('../lib/create_vertex'),
            e = {
              onSetup: function (e) {
                e = e || {};
                var t = [],
                  r = null;
                this.drawConfig.secondEdit &&
                  ((o =
                    (n = 1 === (o = this.getSelectedIds()).length ? this.getFeature(o[0]) : null) &&
                    n.properties
                      ? n.properties
                      : {}),
                  (r =
                    n && 'thin_straight_arrow' === o.feature_type && o.start && o.end ? n : null) &&
                    t.push(r.toGeoJSON()));
                var o = void 0,
                  n = void 0,
                  n = r
                    ? ((o = this.newThinStraightArrow({
                        id: r.id,
                        type: s.geojsonTypes.FEATURE,
                        properties: r.properties,
                        geometry: { type: s.geojsonTypes.POLYGON, coordinates: r.getCoordinates() },
                      })),
                      1)
                    : ((o = this.newThinStraightArrow({
                        type: s.geojsonTypes.FEATURE,
                        properties: {},
                        geometry: { type: s.geojsonTypes.POLYGON, coordinates: [[]] },
                      })),
                      this.preSettingStyle(o, e.style || {}),
                      0);
                return (
                  this.addFeature(o),
                  this.clearSelectedFeatures(),
                  i.disable(this),
                  this.updateUIClasses({ mouse: s.cursors.ADD }),
                  this.activateUIButton(s.types.POLYGON),
                  this.setActionableState({ trash: !0 }),
                  { polygon: o, currentVertexPosition: n, initiallyFeatures: t }
                );
              },
              clickAnywhere: function (e, t) {
                if (1 <= e.currentVertexPosition)
                  return this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
                this.updateUIClasses({ mouse: s.cursors.ADD }),
                  e.polygon.updateCoordinate(
                    '0.' + e.currentVertexPosition,
                    t.lngLat.lng,
                    t.lngLat.lat,
                  ),
                  e.currentVertexPosition++;
              },
              clickOnVertex: function (e) {
                return this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
              },
            };
          (e.onTouchMove = e.onMouseMove =
            function (e, t) {
              e.polygon.updateCoordinate(
                '0.' + e.currentVertexPosition,
                t.lngLat.lng,
                t.lngLat.lat,
              ),
                o.isVertex(t) && this.updateUIClasses({ mouse: s.cursors.POINTER });
            }),
            (e.onTap = e.onClick =
              function (e, t) {
                return o.isVertex(t) ? this.clickOnVertex(e, t) : this.clickAnywhere(e, t);
              }),
            (e.onKeyUp = function (e, t) {
              o.isEscapeKey(t)
                ? (this.deleteFeature([e.polygon.id], { silent: !0 }),
                  this.changeMode(s.modes.SIMPLE_SELECT))
                : o.isEnterKey(t) &&
                  this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
            }),
            (e.onStop = function (e) {
              this.updateUIClasses({ mouse: s.cursors.NONE }),
                i.enable(this),
                this.activateUIButton(),
                void 0 !== this.getFeature(e.polygon.id) &&
                  (e.polygon.isValid()
                    ? e.initiallyFeatures && 0 < e.initiallyFeatures.length
                      ? this.map.fire(s.events.UPDATE, {
                          action: s.updateActions.CHANGE_COORDINATES,
                          prevFeatures: e.initiallyFeatures,
                          features: [e.polygon.toGeoJSON()],
                        })
                      : this.map.fire(s.events.CREATE, { features: [e.polygon.toGeoJSON()] })
                    : (this.deleteFeature([e.polygon.id], { silent: !0 }),
                      this.changeMode(s.modes.SIMPLE_SELECT, {}, { silent: !0 })));
            }),
            (e.toDisplayFeatures = function (e, t, r) {
              var o = t.properties.id === e.polygon.id;
              if (((t.properties.active = o ? s.activeStates.ACTIVE : s.activeStates.INACTIVE), !o))
                return r(t);
              if (0 !== t.geometry.coordinates.length) {
                o = t.geometry.coordinates[0].length;
                if (!(o < 3)) {
                  if (
                    ((t.properties.meta = s.meta.FEATURE),
                    r(a(e.polygon.id, t.geometry.coordinates[0][0], '0.0', !1, t)),
                    4 < o &&
                      ((n = t.geometry.coordinates[0].length - 1),
                      r(a(e.polygon.id, t.geometry.coordinates[0][n], '0.' + n, !1, t))),
                    o <= 4)
                  ) {
                    var n = [
                      [t.geometry.coordinates[0][0][0], t.geometry.coordinates[0][0][1]],
                      [t.geometry.coordinates[0][1][0], t.geometry.coordinates[0][1][1]],
                    ];
                    if (
                      (r({
                        type: s.geojsonTypes.FEATURE,
                        properties: t.properties,
                        geometry: { coordinates: n, type: s.geojsonTypes.LINE_STRING },
                      }),
                      3 === o)
                    )
                      return;
                  }
                  return r(t);
                }
              }
            }),
            (e.onTrash = function (e) {
              this.deleteFeature([e.polygon.id], { silent: !0 }),
                this.changeMode(s.modes.SIMPLE_SELECT);
            }),
            (t.exports = e);
        },
        {
          '../constants': 172,
          '../lib/common_selectors': 212,
          '../lib/create_vertex': 216,
          '../lib/double_click_zoom': 217,
        },
      ],
      252: [
        function (e, t, r) {
          'use strict';
          var o = e('../lib/common_selectors'),
            i = e('../lib/double_click_zoom'),
            s = e('../constants'),
            a = e('../lib/create_vertex'),
            e = {
              onSetup: function (e) {
                e = e || {};
                var t = this.getSelectedIds(),
                  r = 1 === t.length ? this.getFeature(t[0]) : null,
                  o = r && r.properties ? r.properties : {},
                  n = r && 'thin_tail_arrow' === o.feature_type && o.start && o.end ? r : null,
                  t = [];
                n && t.push(n.toGeoJSON());
                (o = void 0),
                  (r = void 0),
                  (r = n
                    ? ((o = this.newThinTailArrow({
                        id: n.id,
                        type: s.geojsonTypes.FEATURE,
                        properties: n.properties,
                        geometry: { type: s.geojsonTypes.POLYGON, coordinates: n.getCoordinates() },
                      })),
                      1)
                    : ((o = this.newThinTailArrow({
                        type: s.geojsonTypes.FEATURE,
                        properties: {},
                        geometry: { type: s.geojsonTypes.POLYGON, coordinates: [[]] },
                      })),
                      this.preSettingStyle(o, e.style || {}),
                      0));
                return (
                  this.addFeature(o),
                  this.clearSelectedFeatures(),
                  i.disable(this),
                  this.updateUIClasses({ mouse: s.cursors.ADD }),
                  this.activateUIButton(s.types.POLYGON),
                  this.setActionableState({ trash: !0 }),
                  { polygon: o, currentVertexPosition: r, initiallyFeatures: t }
                );
              },
              clickAnywhere: function (e, t) {
                if (1 <= e.currentVertexPosition)
                  return this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
                this.updateUIClasses({ mouse: s.cursors.ADD }),
                  e.polygon.updateCoordinate(
                    '0.' + e.currentVertexPosition,
                    t.lngLat.lng,
                    t.lngLat.lat,
                  ),
                  e.currentVertexPosition++;
              },
              clickOnVertex: function (e) {
                return this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
              },
            };
          (e.onTouchMove = e.onMouseMove =
            function (e, t) {
              e.polygon.updateCoordinate(
                '0.' + e.currentVertexPosition,
                t.lngLat.lng,
                t.lngLat.lat,
              ),
                o.isVertex(t) && this.updateUIClasses({ mouse: s.cursors.POINTER });
            }),
            (e.onTap = e.onClick =
              function (e, t) {
                return o.isVertex(t) ? this.clickOnVertex(e, t) : this.clickAnywhere(e, t);
              }),
            (e.onKeyUp = function (e, t) {
              o.isEscapeKey(t)
                ? (this.deleteFeature([e.polygon.id], { silent: !0 }),
                  this.changeMode(s.modes.SIMPLE_SELECT))
                : o.isEnterKey(t) &&
                  this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
            }),
            (e.onStop = function (e) {
              this.updateUIClasses({ mouse: s.cursors.NONE }),
                i.enable(this),
                this.activateUIButton(),
                void 0 !== this.getFeature(e.polygon.id) &&
                  (e.polygon.isValid()
                    ? e.initiallyFeatures && 0 < e.initiallyFeatures.length
                      ? this.map.fire(s.events.UPDATE, {
                          action: s.updateActions.CHANGE_COORDINATES,
                          prevFeatures: e.initiallyFeatures,
                          features: [e.polygon.toGeoJSON()],
                        })
                      : this.map.fire(s.events.CREATE, { features: [e.polygon.toGeoJSON()] })
                    : (this.deleteFeature([e.polygon.id], { silent: !0 }),
                      this.changeMode(s.modes.SIMPLE_SELECT, {}, { silent: !0 })));
            }),
            (e.toDisplayFeatures = function (e, t, r) {
              var o = t.properties.id === e.polygon.id;
              if (((t.properties.active = o ? s.activeStates.ACTIVE : s.activeStates.INACTIVE), !o))
                return r(t);
              if (0 !== t.geometry.coordinates.length) {
                o = t.geometry.coordinates[0].length;
                if (!(o < 3)) {
                  if (
                    ((t.properties.meta = s.meta.FEATURE),
                    r(a(e.polygon.id, t.geometry.coordinates[0][0], '0.0', !1, t)),
                    4 < o &&
                      ((n = t.geometry.coordinates[0].length - 1),
                      r(a(e.polygon.id, t.geometry.coordinates[0][n], '0.' + n, !1, t))),
                    o <= 4)
                  ) {
                    var n = [
                      [t.geometry.coordinates[0][0][0], t.geometry.coordinates[0][0][1]],
                      [t.geometry.coordinates[0][1][0], t.geometry.coordinates[0][1][1]],
                    ];
                    if (
                      (r({
                        type: s.geojsonTypes.FEATURE,
                        properties: t.properties,
                        geometry: { coordinates: n, type: s.geojsonTypes.LINE_STRING },
                      }),
                      3 === o)
                    )
                      return;
                  }
                  return r(t);
                }
              }
            }),
            (e.onTrash = function (e) {
              this.deleteFeature([e.polygon.id], { silent: !0 }),
                this.changeMode(s.modes.SIMPLE_SELECT);
            }),
            (t.exports = e);
        },
        {
          '../constants': 172,
          '../lib/common_selectors': 212,
          '../lib/create_vertex': 216,
          '../lib/double_click_zoom': 217,
        },
      ],
      253: [
        function (e, t, r) {
          'use strict';
          var o = e('../lib/common_selectors'),
            i = e('../lib/double_click_zoom'),
            s = e('../constants'),
            a = e('../lib/create_vertex'),
            e = {
              onSetup: function (e) {
                e = e || {};
                var t,
                  r = [],
                  o = null;
                this.drawConfig.secondEdit &&
                  ((t =
                    (n = 1 === (t = this.getSelectedIds()).length ? this.getFeature(t[0]) : null) &&
                    n.properties
                      ? n.properties
                      : {}),
                  (o =
                    n && 'triangle' === t.feature_type && t.start && t.middle && t.end
                      ? n
                      : null) && r.push(o.toGeoJSON()));
                var n = o
                  ? this.newTriangle({
                      id: o.id,
                      type: s.geojsonTypes.FEATURE,
                      properties: o.properties,
                      geometry: { type: s.geojsonTypes.POLYGON, coordinates: o.getCoordinates() },
                    })
                  : this.newTriangle({
                      type: s.geojsonTypes.FEATURE,
                      properties: {},
                      geometry: { type: s.geojsonTypes.POLYGON, coordinates: [[]] },
                    });
                return (
                  this.preSettingStyle(n, e.style || {}),
                  this.addFeature(n),
                  this.clearSelectedFeatures(),
                  i.disable(this),
                  this.updateUIClasses({ mouse: s.cursors.ADD }),
                  this.activateUIButton(s.types.POLYGON),
                  this.setActionableState({ trash: !0 }),
                  { initiallyFeatures: r, polygon: n, currentVertexPosition: o ? 2 : 0 }
                );
              },
              clickAnywhere: function (e, t) {
                if (1 < e.currentVertexPosition)
                  return this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
                this.updateUIClasses({ mouse: s.cursors.ADD }),
                  e.polygon.updateCoordinate(
                    '0.' + e.currentVertexPosition,
                    t.lngLat.lng,
                    t.lngLat.lat,
                  ),
                  e.currentVertexPosition++;
              },
              clickOnVertex: function (e) {
                return this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
              },
            };
          (e.onTouchMove = e.onMouseMove =
            function (e, t) {
              e.polygon.updateCoordinate(
                '0.' + e.currentVertexPosition,
                t.lngLat.lng,
                t.lngLat.lat,
              ),
                o.isVertex(t) && this.updateUIClasses({ mouse: s.cursors.POINTER });
            }),
            (e.onTap = e.onClick =
              function (e, t) {
                return o.isVertex(t) ? this.clickOnVertex(e, t) : this.clickAnywhere(e, t);
              }),
            (e.onKeyUp = function (e, t) {
              o.isEscapeKey(t)
                ? (this.deleteFeature([e.polygon.id], { silent: !0 }),
                  this.changeMode(s.modes.SIMPLE_SELECT))
                : o.isEnterKey(t) &&
                  this.changeMode(s.modes.SIMPLE_SELECT, { featureIds: [e.polygon.id] });
            }),
            (e.onStop = function (e) {
              this.updateUIClasses({ mouse: s.cursors.NONE }),
                i.enable(this),
                this.activateUIButton(),
                void 0 !== this.getFeature(e.polygon.id) &&
                  (e.polygon.isValid()
                    ? e.initiallyFeatures && 0 < e.initiallyFeatures.length
                      ? this.map.fire(s.events.UPDATE, {
                          action: s.updateActions.CHANGE_COORDINATES,
                          prevFeatures: e.initiallyFeatures,
                          features: [e.polygon.toGeoJSON()],
                        })
                      : this.map.fire(s.events.CREATE, { features: [e.polygon.toGeoJSON()] })
                    : (this.deleteFeature([e.polygon.id], { silent: !0 }),
                      this.changeMode(s.modes.SIMPLE_SELECT, {}, { silent: !0 })));
            }),
            (e.toDisplayFeatures = function (e, t, r) {
              var o = t.properties.id === e.polygon.id;
              if (((t.properties.active = o ? s.activeStates.ACTIVE : s.activeStates.INACTIVE), !o))
                return r(t);
              if (0 !== t.geometry.coordinates.length) {
                o = t.geometry.coordinates[0].length;
                if (!(o < 3)) {
                  if (
                    ((t.properties.meta = s.meta.FEATURE),
                    r(a(e.polygon.id, t.geometry.coordinates[0][0], '0.0', !1, t)),
                    3 < o &&
                      ((n = t.geometry.coordinates[0].length - 3),
                      r(a(e.polygon.id, t.geometry.coordinates[0][n], '0.' + n, !1, t))),
                    o <= 4)
                  ) {
                    var n = [
                      [t.geometry.coordinates[0][0][0], t.geometry.coordinates[0][0][1]],
                      [t.geometry.coordinates[0][1][0], t.geometry.coordinates[0][1][1]],
                    ];
                    if (
                      (r({
                        type: s.geojsonTypes.FEATURE,
                        properties: t.properties,
                        geometry: { coordinates: n, type: s.geojsonTypes.LINE_STRING },
                      }),
                      3 === o)
                    )
                      return;
                  }
                  return r(t);
                }
              }
            }),
            (e.onTrash = function (e) {
              this.deleteFeature([e.polygon.id], { silent: !0 }),
                this.changeMode(s.modes.SIMPLE_SELECT);
            }),
            (t.exports = e);
        },
        {
          '../constants': 172,
          '../lib/common_selectors': 212,
          '../lib/create_vertex': 216,
          '../lib/double_click_zoom': 217,
        },
      ],
      254: [
        function (e, t, r) {
          'use strict';
          var o = e('../lib/common_selectors'),
            n = e('../lib/double_click_zoom'),
            i = e('../constants'),
            s = e('../lib/create_vertex'),
            e = {
              onSetup: function (e) {
                e = e || {};
                var t = this.newFeature({
                  type: i.geojsonTypes.FEATURE,
                  properties: {},
                  geometry: { type: i.geojsonTypes.LINE_STRING, coordinates: [] },
                });
                return (
                  this.preSettingStyle(t, e.style || {}),
                  this.addFeature(t),
                  this.clearSelectedFeatures(),
                  n.disable(this),
                  this.updateUIClasses({ mouse: i.cursors.ADD }),
                  this.activateUIButton(i.types.LINE),
                  this.setActionableState({ trash: !0 }),
                  { line: t, currentVertexPosition: 0, direction: 'forward', startDrawing: !1 }
                );
              },
            };
          (e.onTouchStart = e.onMouseDown =
            function (e, t) {
              (e.startDrawing = !0), this.map.dragPan.disable();
            }),
            (e.onDrag = function (e, t) {
              this.onDrawing(e, t);
            }),
            (e.onMouseUp = function (e, t) {
              (e.startDrawing = !1),
                this.map.dragPan.enable(),
                this.changeMode(i.modes.SIMPLE_SELECT, { featureIds: [e.line.id] });
            }),
            (e.clickAnywhere = function (e, t) {
              this.updateUIClasses({ mouse: i.cursors.ADD }),
                e.line.updateCoordinate(e.currentVertexPosition, t.lngLat.lng, t.lngLat.lat),
                'forward' === e.direction
                  ? (e.currentVertexPosition++,
                    e.line.updateCoordinate(e.currentVertexPosition, t.lngLat.lng, t.lngLat.lat))
                  : e.line.addCoordinate(0, t.lngLat.lng, t.lngLat.lat);
            }),
            (e.onDrawing = function (e, t) {
              e.startDrawing && this.clickAnywhere(e, t);
            }),
            (e.onKeyUp = function (e, t) {
              o.isEnterKey(t)
                ? this.changeMode(i.modes.SIMPLE_SELECT, { featureIds: [e.line.id] })
                : o.isEscapeKey(t) &&
                  (this.deleteFeature([e.line.id], { silent: !0 }),
                  this.changeMode(i.modes.SIMPLE_SELECT));
            }),
            (e.onStop = function (e) {
              n.enable(this),
                this.activateUIButton(),
                void 0 !== this.getFeature(e.line.id) &&
                  (e.line.removeCoordinate('' + e.currentVertexPosition),
                  e.line.isValid()
                    ? this.map.fire(i.events.CREATE, { features: [e.line.toGeoJSON()] })
                    : (this.deleteFeature([e.line.id], { silent: !0 }),
                      this.changeMode(i.modes.SIMPLE_SELECT, {}, { silent: !0 })));
            }),
            (e.onTrash = function (e) {
              this.deleteFeature([e.line.id], { silent: !0 }),
                this.changeMode(i.modes.SIMPLE_SELECT);
            }),
            (e.toDisplayFeatures = function (e, t, r) {
              var o = t.properties.id === e.line.id;
              if (((t.properties.active = o ? i.activeStates.ACTIVE : i.activeStates.INACTIVE), !o))
                return r(t);
              t.geometry.coordinates.length < 2 ||
                ((t.properties.meta = i.meta.FEATURE),
                r(
                  s(
                    e.line.id,
                    t.geometry.coordinates[
                      'forward' === e.direction ? t.geometry.coordinates.length - 2 : 1
                    ],
                    '' + ('forward' === e.direction ? t.geometry.coordinates.length - 2 : 1),
                    !1,
                    t,
                  ),
                ),
                r(t));
            }),
            (t.exports = e);
        },
        {
          '../constants': 172,
          '../lib/common_selectors': 212,
          '../lib/create_vertex': 216,
          '../lib/double_click_zoom': 217,
        },
      ],
      255: [
        function (r, e, t) {
          'use strict';
          (e.exports = [
            'static',
            'simple_select',
            'direct_select',
            'draw_icon',
            'draw_point',
            'draw_polygon',
            'draw_line_string',
            'draw_circle',
            'draw_rectangle',
            'draw_triangle',
            'draw_sector',
            'draw_ellipse',
            'draw_arc',
            'split_polygon',
            'free_drawing',
            'draw_line_arrow',
            'draw_thin_straight_arrow',
            'draw_thin_tail_arrow',
            'draw_attack_arrow',
            'draw_offensive_arrow',
            'draw_offensive_tail_arrow',
            'draw_pincer_attack_arrow',
            'draw_curve_polygon',
            'draw_parallel_polygon',
            'draw_text',
          ].reduce(function (e, t) {
            return (e[t] = r('./' + t)), e;
          }, {})),
            (e.exports = {
              static: r('./static'),
              simple_select: r('./simple_select'),
              direct_select: r('./direct_select'),
              draw_icon: r('./draw_icon'),
              draw_point: r('./draw_point'),
              draw_polygon: r('./draw_polygon'),
              draw_line_string: r('./draw_line_string'),
              draw_circle: r('./draw_circle'),
              draw_rectangle: r('./draw_rectangle'),
              draw_triangle: r('./draw_triangle'),
              draw_sector: r('./draw_sector'),
              draw_ellipse: r('./draw_ellipse'),
              draw_arc: r('./draw_arc'),
              split_polygon: r('./split_polygon'),
              free_drawing: r('./free_drawing'),
              draw_line_arrow: r('./draw_line_arrow'),
              draw_thin_straight_arrow: r('./draw_thin_straight_arrow'),
              draw_thin_tail_arrow: r('./draw_thin_tail_arrow'),
              draw_attack_arrow: r('./draw_attack_arrow'),
              draw_offensive_arrow: r('./draw_offensive_arrow'),
              draw_offensive_tail_arrow: r('./draw_offensive_tail_arrow'),
              draw_pincer_attack_arrow: r('./draw_pincer_attack_arrow'),
              draw_curve_polygon: r('./draw_curve_polygon'),
              draw_parallel_polygon: r('./draw_parallel_polygon'),
              draw_text: r('./draw_text'),
            });
        },
        {
          './direct_select': 233,
          './draw_arc': 234,
          './draw_attack_arrow': 235,
          './draw_circle': 236,
          './draw_curve_polygon': 237,
          './draw_ellipse': 238,
          './draw_icon': 239,
          './draw_line_arrow': 240,
          './draw_line_string': 241,
          './draw_offensive_arrow': 242,
          './draw_offensive_tail_arrow': 243,
          './draw_parallel_polygon': 244,
          './draw_pincer_attack_arrow': 245,
          './draw_point': 246,
          './draw_polygon': 247,
          './draw_rectangle': 248,
          './draw_sector': 249,
          './draw_text': 250,
          './draw_thin_straight_arrow': 251,
          './draw_thin_tail_arrow': 252,
          './draw_triangle': 253,
          './free_drawing': 254,
          './simple_select': 259,
          './split_polygon': 260,
          './static': 261,
        },
      ],
      256: [
        function (e, t, r) {
          'use strict';
          e = t.exports = e('./mode_interface_accessors');
          (e.prototype.onSetup = function () {}),
            (e.prototype.onDrag = function () {}),
            (e.prototype.onClick = function () {}),
            (e.prototype.onMouseMove = function () {}),
            (e.prototype.onMouseDown = function () {}),
            (e.prototype.onMouseUp = function () {}),
            (e.prototype.onMouseOut = function () {}),
            (e.prototype.onKeyUp = function () {}),
            (e.prototype.onKeyDown = function () {}),
            (e.prototype.onTouchStart = function () {}),
            (e.prototype.onTouchMove = function () {}),
            (e.prototype.onTouchEnd = function () {}),
            (e.prototype.onTap = function () {}),
            (e.prototype.onStop = function () {}),
            (e.prototype.onTrash = function () {}),
            (e.prototype.onCombineFeature = function () {}),
            (e.prototype.onUncombineFeature = function () {}),
            (e.prototype.toDisplayFeatures = function () {
              throw new Error('You must overwrite toDisplayFeatures');
            });
        },
        { './mode_interface_accessors': 257 },
      ],
      257: [
        function (e, t, r) {
          'use strict';
          var h = e('../constants'),
            o = e('../lib/features_at'),
            n = e('../feature_types/point'),
            i = e('../feature_types/line_string'),
            s = e('../feature_types/polygon'),
            a = e('../feature_types/multi_feature'),
            c = e('../feature_types/circle'),
            u = e('../feature_types/rectangle'),
            l = e('../feature_types/triangle'),
            p = e('../feature_types/sector'),
            d = e('../feature_types/ellipse'),
            f = e('../feature_types/arc'),
            y = e('../feature_types/line_arrow'),
            g = e('../feature_types/thin_straight_arrow'),
            m = e('../feature_types/thin_tail_arrow'),
            _ = e('../feature_types/attack_arrow'),
            v = e('../feature_types/offensive_arrow'),
            b = e('../feature_types/offensive_tail_arrow'),
            E = e('../feature_types/pincer_attack_arrow'),
            x = e('../feature_types/curve_polygon'),
            S = e('../feature_types/parallel_polygon'),
            w = e('@turf/helpers').point,
            I = e('@turf/distance').default,
            T = e('@turf/clone').default,
            C = e('@turf/polygon-to-line').default,
            O = e('@turf/nearest-point-on-line').default,
            P = e('@turf/helpers').featureCollection,
            A = e('@turf/meta').coordEach,
            t = (t.exports = function (e) {
              (this.map = e.map),
                (this.drawConfig = JSON.parse(JSON.stringify(e.options || {}))),
                (this._ctx = e);
            });
          (t.prototype.setSelected = function (e) {
            var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
            return this._ctx.store.setSelected(e, t);
          }),
            (t.prototype.setSelectedCoordinates = function (e) {
              var r = this;
              this._ctx.store.setSelectedCoordinates(e),
                e.reduce(function (e, t) {
                  return (
                    void 0 === e[t.feature_id] &&
                      ((e[t.feature_id] = !0), r._ctx.store.get(t.feature_id).changed()),
                    e
                  );
                }, {});
            }),
            (t.prototype.getSelectedCoordinates = function () {
              return this._ctx.store.getSelectedCoordinates();
            }),
            (t.prototype.getSelectedCoordPaths = function () {
              return this._ctx.store.getSelectedCoordPaths();
            }),
            (t.prototype.getSelected = function () {
              return this._ctx.store.getSelected();
            }),
            (t.prototype.getSelectedIds = function () {
              return this._ctx.store.getSelectedIds();
            }),
            (t.prototype.isSelected = function (e) {
              return this._ctx.store.isSelected(e);
            }),
            (t.prototype.getFeature = function (e) {
              return this._ctx.store.get(e);
            }),
            (t.prototype.select = function (e) {
              return this._ctx.store.select(e);
            }),
            (t.prototype.deselect = function (e) {
              return this._ctx.store.deselect(e);
            }),
            (t.prototype.deleteFeature = function (e) {
              var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
              return this._ctx.store.delete(e, t);
            }),
            (t.prototype.addFeature = function (e) {
              return this._ctx.store.add(e);
            }),
            (t.prototype.clearSelectedFeatures = function () {
              return this._ctx.store.clearSelected();
            }),
            (t.prototype.clearSelectedCoordinates = function () {
              return this._ctx.store.clearSelectedCoordinates();
            }),
            (t.prototype.setActionableState = function () {
              var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
                e = {
                  trash: e.trash || !1,
                  combineFeatures: e.combineFeatures || !1,
                  uncombineFeatures: e.uncombineFeatures || !1,
                };
              return this._ctx.events.actionable(e);
            }),
            (t.prototype.changeMode = function (e) {
              var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
                r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
              return this._ctx.events.changeMode(e, t, r);
            }),
            (t.prototype.preSettingStyle = function (t) {
              var r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
              return (
                0 < Object.keys(r).length &&
                  ((t.properties.custom_style = 'true'),
                  Object.keys(r).forEach(function (e) {
                    t.properties[e] = r[e];
                  })),
                t
              );
            }),
            (t.prototype.updateUIClasses = function (e) {
              return this._ctx.ui.queueMapClasses(e);
            }),
            (t.prototype.activateUIButton = function (e) {
              return this._ctx.ui.setActiveButton(e);
            }),
            (t.prototype.featuresAt = function (e, t) {
              var r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 'click';
              if ('click' !== r && 'touch' !== r) throw new Error('invalid buffer type');
              return o[r](e, t, this._ctx);
            }),
            (t.prototype.getAdsorbCoord = function (e, t, r, o) {
              if (!this._ctx.options.adsorbEnabled) return null;
              if (0 === r.length || !o) return null;
              var n = r.filter(function (e) {
                return (
                  (e.properties.id && e.properties.id !== o) ||
                  (e.properties.parent && e.properties.parent !== o)
                );
              });
              if (0 === n.length) return null;
              r = null;
              if (
                [h.geojsonTypes.POLYGON, h.geojsonTypes.MULTI_POLYGON].includes(n[0].geometry.type)
              ) {
                for (
                  var i = this.map.getSource('minemap-draw-polygon-line-cold')._data,
                    s = void 0,
                    a = 0;
                  a < i.features.length;
                  a++
                )
                  i.features[a].properties.id &&
                    i.features[a].properties.id === n[0].properties.id &&
                    (s = i.features[a]);
                var c = T(n[0]);
                (c.geometry.coordinates = [s.geometry.coordinates]),
                  (r =
                    (r = C(c)).type && r.type === h.geojsonTypes.FEATURE_COLLECTION
                      ? r.features[0]
                      : r);
              } else
                [h.geojsonTypes.LINE_STRING, h.geojsonTypes.MULTI_LINE_STRING].includes(
                  n[0].geometry.type,
                ) && (r = n[0]);
              c = n.filter(function (e) {
                return [h.geojsonTypes.POINT].includes(e.geometry.type);
              });
              if (0 < c.length) {
                if (1 === c.length) return c[0].geometry.coordinates;
                var u = P(c),
                  l = this.map.unproject([t.point.x, t.point.y]),
                  p = new Map();
                A(u, function (e) {
                  var t = I(w([l.lng, l.lat]), w(e), { units: 'miles' });
                  p.set(t, e);
                });
                var d = Math.min.apply(
                  Math,
                  (function (e) {
                    if (Array.isArray(e)) {
                      for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
                      return r;
                    }
                    return Array.from(e);
                  })(p.keys()),
                );
                return p.get(d) || null;
              }
              (u = this._ctx.options.adsorbBuffer || this._ctx.options.clickBuffer),
                (d = r ? O(r, w([t.lngLat.lng, t.lngLat.lat]), { units: 'miles' }) : null);
              if (
                t.point &&
                d &&
                [h.geojsonTypes.POLYGON, h.geojsonTypes.MULTI_POLYGON].includes(n[0].geometry.type)
              ) {
                (r = this.map.unproject([t.point.x, t.point.y])),
                  (u = this.map.unproject([t.point.x + u, t.point.y + u])),
                  (u = I(w([r.lng, r.lat]), w([u.lng, u.lat]), { units: 'miles' }));
                if (d.properties.dist > u) return null;
              }
              return d ? d.geometry.coordinates : null;
            }),
            (t.prototype.newFeature = function (e) {
              var t = e.geometry.type;
              return new (
                t === h.geojsonTypes.POINT
                  ? n
                  : t === h.geojsonTypes.LINE_STRING
                  ? i
                  : t === h.geojsonTypes.POLYGON
                  ? s
                  : a
              )(this._ctx, e);
            }),
            (t.prototype.newCircle = function (e) {
              return new c(this._ctx, e);
            }),
            (t.prototype.newRectangle = function (e) {
              return new u(this._ctx, e);
            }),
            (t.prototype.newTriangle = function (e) {
              return new l(this._ctx, e);
            }),
            (t.prototype.newSector = function (e) {
              return new p(this._ctx, e);
            }),
            (t.prototype.newEllipse = function (e) {
              return new d(this._ctx, e);
            }),
            (t.prototype.newArc = function (e) {
              return new f(this._ctx, e);
            }),
            (t.prototype.newLineArrow = function (e) {
              return new y(this._ctx, e);
            }),
            (t.prototype.newThinStraightArrow = function (e) {
              return new g(this._ctx, e);
            }),
            (t.prototype.newThinTailArrow = function (e) {
              return new m(this._ctx, e);
            }),
            (t.prototype.newAttackArrow = function (e) {
              return new _(this._ctx, e);
            }),
            (t.prototype.newOffensiveArrow = function (e) {
              return new v(this._ctx, e);
            }),
            (t.prototype.newOffensiveTailArrow = function (e) {
              return new b(this._ctx, e);
            }),
            (t.prototype.newPincerAttackArrow = function (e) {
              return new E(this._ctx, e);
            }),
            (t.prototype.newCurvePolygon = function (e) {
              return new x(this._ctx, e);
            }),
            (t.prototype.newParallelPolygon = function (e) {
              return new S(this._ctx, e);
            }),
            (t.prototype.isInstanceOf = function (e, t) {
              if (e === h.geojsonTypes.POINT) return t instanceof n;
              if (e === h.geojsonTypes.LINE_STRING) return t instanceof i;
              if (e === h.geojsonTypes.POLYGON) return t instanceof s;
              if ('MultiFeature' === e) return t instanceof a;
              throw new Error('Unknown feature class: ' + e);
            }),
            (t.prototype.doRender = function (e) {
              return this._ctx.store.featureChanged(e);
            });
        },
        {
          '../constants': 172,
          '../feature_types/arc': 190,
          '../feature_types/attack_arrow': 191,
          '../feature_types/circle': 192,
          '../feature_types/curve_polygon': 193,
          '../feature_types/ellipse': 194,
          '../feature_types/line_arrow': 196,
          '../feature_types/line_string': 197,
          '../feature_types/multi_feature': 198,
          '../feature_types/offensive_arrow': 199,
          '../feature_types/offensive_tail_arrow': 200,
          '../feature_types/parallel_polygon': 201,
          '../feature_types/pincer_attack_arrow': 202,
          '../feature_types/point': 203,
          '../feature_types/polygon': 204,
          '../feature_types/rectangle': 205,
          '../feature_types/sector': 206,
          '../feature_types/thin_straight_arrow': 207,
          '../feature_types/thin_tail_arrow': 208,
          '../feature_types/triangle': 209,
          '../lib/features_at': 219,
          '@turf/clone': 17,
          '@turf/distance': 20,
          '@turf/helpers': 21,
          '@turf/meta': 31,
          '@turf/nearest-point-on-line': 32,
          '@turf/polygon-to-line': 33,
        },
      ],
      258: [
        function (e, t, r) {
          'use strict';
          var a = e('./mode_interface');
          t.exports = function (i) {
            var s = Object.keys(i);
            return function (e) {
              var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
                r = {},
                o = s.reduce(function (e, t) {
                  return (e[t] = i[t]), e;
                }, new a(e));
              function n(t) {
                return function (e) {
                  ((r.point || r.polygon) && null == e.lngLat) || o[t](r, e);
                };
              }
              return {
                start: function () {
                  (r = o.onSetup(t)),
                    this.on(
                      'drag',
                      function () {
                        return !0;
                      },
                      n('onDrag'),
                    ),
                    this.on(
                      'click',
                      function () {
                        return !0;
                      },
                      n('onClick'),
                    ),
                    this.on(
                      'mousemove',
                      function () {
                        return !0;
                      },
                      n('onMouseMove'),
                    ),
                    this.on(
                      'mousedown',
                      function () {
                        return !0;
                      },
                      n('onMouseDown'),
                    ),
                    this.on(
                      'mouseup',
                      function () {
                        return !0;
                      },
                      n('onMouseUp'),
                    ),
                    this.on(
                      'mouseout',
                      function () {
                        return !0;
                      },
                      n('onMouseOut'),
                    ),
                    this.on(
                      'keyup',
                      function () {
                        return !0;
                      },
                      n('onKeyUp'),
                    ),
                    this.on(
                      'keydown',
                      function () {
                        return !0;
                      },
                      n('onKeyDown'),
                    ),
                    this.on(
                      'touchstart',
                      function () {
                        return !0;
                      },
                      n('onTouchStart'),
                    ),
                    this.on(
                      'touchmove',
                      function () {
                        return !0;
                      },
                      n('onTouchMove'),
                    ),
                    this.on(
                      'touchend',
                      function () {
                        return !0;
                      },
                      n('onTouchEnd'),
                    ),
                    this.on(
                      'tap',
                      function () {
                        return !0;
                      },
                      n('onTap'),
                    );
                },
                stop: function () {
                  o.onStop(r);
                },
                trash: function () {
                  o.onTrash(r);
                },
                combineFeatures: function () {
                  o.onCombineFeatures && o.onCombineFeatures(r);
                },
                uncombineFeatures: function () {
                  o.onUncombineFeatures && o.onUncombineFeatures(r);
                },
                unionPolygon: function () {
                  o.onUnionPolygon && o.onUnionPolygon(r);
                },
                unionLine: function () {
                  o.onUnionLine && o.onUnionLine(r);
                },
                curveLine: function () {
                  o.onCurveLine && o.onCurveLine(r);
                },
                parallelLine: function (e) {
                  o.onParallelLine && o.onParallelLine(r, e);
                },
                splitLine: function () {
                  o.onSplitLine && o.onSplitLine(r);
                },
                curveFeature: function () {
                  o.onCurveFeature && o.onCurveFeature(r);
                },
                cloneFeature: function () {
                  o.onCloneFeature && o.onCloneFeature(r);
                },
                render: function (e, t) {
                  o.toDisplayFeatures(r, e, t);
                },
              };
            };
          };
        },
        { './mode_interface': 256 },
      ],
      259: [
        function (e, t, r) {
          'use strict';
          var o = e('xtend'),
            a = e('../lib/common_selectors'),
            s = e('../lib/mouse_event_point'),
            n = e('../lib/create_supplementary_points'),
            i = e('../lib/string_set'),
            c = e('../lib/double_click_zoom'),
            u = e('../lib/move_features'),
            w = e('../constants'),
            I = e('@turf/intersect').default,
            T = (e('@turf/line-intersect').default, e('@turf/union').default),
            d = e('@turf/helpers').point,
            h = e('@turf/bearing').default,
            l =
              (e('@turf/polygon-to-line').default,
              e('@turf/line-to-polygon').default,
              e('@turf/bezier-spline').default),
            f = e('@turf/transform-translate').default,
            y = e('../edit/util/is_same_point'),
            e = {
              onSetup: function (e) {
                var t = this,
                  e = {
                    dragMoveLocation: null,
                    boxSelectStartLocation: null,
                    boxSelectElement: void 0,
                    boxSelecting: !1,
                    canBoxSelect: !1,
                    dragMoveing: !1,
                    canDragMove: !1,
                    initiallySelectedFeatureIds: e.featureIds || [],
                    initiallySelectedFeatures: [],
                  };
                return (
                  this.setSelected(
                    e.initiallySelectedFeatureIds.filter(function (e) {
                      return void 0 !== t.getFeature(e);
                    }),
                  ),
                  (e.initiallySelectedFeatures = this.getSelected().map(function (e) {
                    return e.toGeoJSON();
                  })),
                  this.fireActionable(),
                  this.setActionableState({
                    combineFeatures: !0,
                    uncombineFeatures: !0,
                    trash: !0,
                  }),
                  e
                );
              },
              fireUpdate: function (e) {
                this.map.fire(w.events.UPDATE, {
                  action: w.updateActions.MOVE,
                  prevFeatures: e.initiallySelectedFeatures,
                  features: this.getSelected().map(function (e) {
                    return e.toGeoJSON();
                  }),
                }),
                  (e.initiallySelectedFeatures = this.getSelected().map(function (e) {
                    return e.toGeoJSON();
                  }));
              },
              fireActionable: function () {
                var t,
                  r = this,
                  e = this.getSelected(),
                  o = e.filter(function (e) {
                    return r.isInstanceOf('MultiFeature', e);
                  }),
                  n = !1;
                1 < e.length &&
                  ((n = !0),
                  (t = e[0].type.replace('Multi', '')),
                  e.forEach(function (e) {
                    e.type.replace('Multi', '') !== t && (n = !1);
                  }));
                (o = 0 < o.length), (e = 0 < e.length);
                this.setActionableState({ combineFeatures: n, uncombineFeatures: o, trash: e });
              },
              getUniqueIds: function (e) {
                return e.length
                  ? e
                      .map(function (e) {
                        return e.properties.id;
                      })
                      .filter(function (e) {
                        return void 0 !== e;
                      })
                      .reduce(function (e, t) {
                        return e.add(t), e;
                      }, new i())
                      .values()
                  : [];
              },
              stopExtendedInteractions: function (e) {
                e.boxSelectElement &&
                  (e.boxSelectElement.parentNode &&
                    e.boxSelectElement.parentNode.removeChild(e.boxSelectElement),
                  (e.boxSelectElement = null)),
                  this.map.dragPan.isEnabled()
                    ? this.map.dragPan.enable()
                    : this.map.dragPan.disable(),
                  (e.boxSelecting = !1),
                  (e.canBoxSelect = !1),
                  (e.dragMoving = !1),
                  (e.canDragMove = !1);
              },
              onStop: function () {
                c.enable(this);
              },
              onMouseUp: function (e, t) {
                if (a.true(t)) return this.stopExtendedInteractions(e);
              },
              onMouseMove: function (e) {
                return this.stopExtendedInteractions(e);
              },
              onMouseOut: function (e) {
                if (e.dragMoving) return this.fireUpdate(e);
              },
            };
          (e.onTap = e.onClick =
            function (e, t) {
              return a.noTarget(t)
                ? this.clickAnywhere(e, t)
                : a.isOfMetaType(w.meta.VERTEX)(t)
                ? this.clickOnVertex(e, t)
                : a.isFeature(t)
                ? this.clickOnFeature(e, t)
                : void 0;
            }),
            (e.clickAnywhere = function (e) {
              var t = this,
                r = this.getSelectedIds();
              r.length &&
                (this.clearSelectedFeatures(),
                this.map.fire(w.events.UNSELECTED, { featureIds: r }),
                r.forEach(function (e) {
                  return t.doRender(e);
                })),
                c.enable(this),
                this.stopExtendedInteractions(e);
            }),
            (e.clickOnVertex = function (e, t) {
              var r = this.getSelectedIds(),
                o = 1 === r.length ? this.getFeature(r[0]) : null,
                r = o && o.properties ? o.properties : {};
              if (o && 'circle' === r.feature_type && r.radius && r.center)
                return this.changeMode(w.modes.DRAW_CIRCLE);
              if (o && 'triangle' === r.feature_type && r.start && r.middle && r.end)
                return this.changeMode(w.modes.DRAW_TRIANGLE);
              if (o && 'rectangle' === r.feature_type && r.start && r.end)
                return this.changeMode(w.modes.DRAW_RECTANGLE);
              if (o && 'sector' === r.feature_type && r.center && r.start && r.end)
                return this.changeMode(w.modes.DRAW_SECTOR);
              if (o && 'ellipse' === r.feature_type && r.first && r.second && r.end)
                return this.changeMode(w.modes.DRAW_ELLIPSE);
              if (o && 'arc' === r.feature_type && r.first && r.second && r.end)
                return this.changeMode(w.modes.DRAW_ARC);
              if (o && 'line_arrow' === r.feature_type && r.start && r.end)
                return this.changeMode(w.modes.DRAW_LINE_ARROW);
              if (o && 'thin_straight_arrow' === r.feature_type && r.start && r.end)
                return this.changeMode(w.modes.DRAW_THIN_STRAIGHT_ARROW);
              if (o && 'thin_tail_arrow' === r.feature_type && r.start && r.end)
                return this.changeMode(w.modes.DRAW_THIN_TAIL_ARROW);
              if (o && 'attack_arrow' === r.feature_type && r.start && r.end)
                return this.changeMode(w.modes.DRAW_ATTACK_ARROW);
              if (o && 'offensive_arrow' === r.feature_type && r.start && r.middle && r.end)
                return this.changeMode(w.modes.DRAW_OFFENSIVE_ARROW);
              if (o && 'offensive_tail_arrow' === r.feature_type && r.start && r.middle && r.end)
                return this.changeMode(w.modes.DRAW_OFFENSIVE_TAIL_ARROW);
              if (o && 'pincer_attack_arrow' === r.feature_type && r.start && r.middle && r.end) {
                o = o.getCoordinate(t.featureTarget.properties.coord_path);
                if (
                  !(
                    (o && r.arrow1 && o[0] === r.arrow1[0] && o[1] === r.arrow1[1]) ||
                    (o && r.arrow2 && o[0] === r.arrow2[0] && o[1] === r.arrow2[1])
                  )
                )
                  return this.changeMode(w.modes.DRAW_PINCER_ATTACK_ARROW);
              }
              this.changeMode(w.modes.DIRECT_SELECT, {
                featureId: t.featureTarget.properties.parent,
                coordPath: t.featureTarget.properties.coord_path,
                startPos: t.lngLat,
              }),
                this.updateUIClasses({ mouse: w.cursors.MOVE });
            }),
            (e.startOnActiveFeature = function (e, t) {
              this.stopExtendedInteractions(e),
                this.map.dragPan.disable(),
                this.doRender(t.featureTarget.properties.id),
                (e.canDragMove = !0),
                (e.dragMoveLocation = t.lngLat),
                (e.initiallySelectedFeatures = this.getSelected().map(function (e) {
                  return e.toGeoJSON();
                }));
            }),
            (e.clickOnFeature = function (e, t) {
              var r = this;
              c.disable(this), this.stopExtendedInteractions(e);
              var o = a.isShiftDown(t),
                n = this.getSelectedIds(),
                i = t.featureTarget.properties.id,
                s = this.isSelected(i);
              if (!o && s && this.getFeature(i).type !== w.geojsonTypes.POINT) {
                (e = 1 === n.length ? this.getFeature(n[0]) : null),
                  (t = e && e.properties ? e.properties : {});
                return e && 'circle' === t.feature_type && t.radius && t.center
                  ? this.changeMode(w.modes.DRAW_CIRCLE)
                  : e && 'triangle' === t.feature_type && t.start && t.middle && t.end
                  ? this.changeMode(w.modes.DRAW_TRIANGLE)
                  : e && 'rectangle' === t.feature_type && t.start && t.end
                  ? this.changeMode(w.modes.DRAW_RECTANGLE)
                  : e && 'sector' === t.feature_type && t.center && t.start && t.end
                  ? this.changeMode(w.modes.DRAW_SECTOR)
                  : e && 'ellipse' === t.feature_type && t.first && t.second && t.end
                  ? this.changeMode(w.modes.DRAW_ELLIPSE)
                  : e && 'arc' === t.feature_type && t.first && t.second && t.end
                  ? this.changeMode(w.modes.DRAW_ARC)
                  : e && 'line_arrow' === t.feature_type && t.start && t.end
                  ? this.changeMode(w.modes.DRAW_LINE_ARROW)
                  : e && 'thin_straight_arrow' === t.feature_type && t.start && t.end
                  ? this.changeMode(w.modes.DRAW_THIN_STRAIGHT_ARROW)
                  : e && 'thin_tail_arrow' === t.feature_type && t.start && t.end
                  ? this.changeMode(w.modes.DRAW_THIN_TAIL_ARROW)
                  : e && 'attack_arrow' === t.feature_type && t.start && t.end
                  ? this.changeMode(w.modes.DRAW_ATTACK_ARROW)
                  : e && 'offensive_arrow' === t.feature_type && t.start && t.middle && t.end
                  ? this.changeMode(w.modes.DRAW_OFFENSIVE_ARROW)
                  : e && 'offensive_tail_arrow' === t.feature_type && t.start && t.middle && t.end
                  ? this.changeMode(w.modes.DRAW_OFFENSIVE_TAIL_ARROW)
                  : e && 'pincer_attack_arrow' === t.feature_type && t.start && t.middle && t.end
                  ? this.changeMode(w.modes.DRAW_PINCER_ATTACK_ARROW)
                  : this.changeMode(w.modes.DIRECT_SELECT, { featureId: i });
              }
              s && o
                ? (this.deselect(i),
                  this.updateUIClasses({ mouse: w.cursors.POINTER }),
                  1 === n.length && c.enable(this))
                : !s && o
                ? (this.select(i), this.updateUIClasses({ mouse: w.cursors.MOVE }))
                : s ||
                  o ||
                  (n.forEach(function (e) {
                    return r.doRender(e);
                  }),
                  this.setSelected(i),
                  this.updateUIClasses({ mouse: w.cursors.MOVE })),
                this.map.fire(w.events.SELECTED, { featureIds: this.getSelectedIds() }),
                this.doRender(i);
            }),
            (e.onMouseDown = function (e, t) {
              return a.isActiveFeature(t)
                ? this.startOnActiveFeature(e, t)
                : this.drawConfig.boxSelect && a.isShiftMousedown(t)
                ? this.startBoxSelect(e, t)
                : void 0;
            }),
            (e.startBoxSelect = function (e, t) {
              this.stopExtendedInteractions(e),
                this.map.dragPan.disable(),
                (e.boxSelectStartLocation = s(t.originalEvent, this.map.getContainer())),
                (e.canBoxSelect = !0);
            }),
            (e.onTouchStart = function (e, t) {
              if (a.isActiveFeature(t)) return this.startOnActiveFeature(e, t);
            }),
            (e.onDrag = function (e, t) {
              return e.canDragMove
                ? this.dragMove(e, t)
                : this.drawConfig.boxSelect && e.canBoxSelect
                ? this.whileBoxSelect(e, t)
                : void 0;
            }),
            (e.whileBoxSelect = function (e, t) {
              (e.boxSelecting = !0),
                this.updateUIClasses({ mouse: w.cursors.ADD }),
                e.boxSelectElement ||
                  ((e.boxSelectElement = document.createElement('div')),
                  e.boxSelectElement.classList.add(w.classes.BOX_SELECT),
                  this.map.getContainer().appendChild(e.boxSelectElement));
              var r = s(t.originalEvent, this.map.getContainer()),
                o = Math.min(e.boxSelectStartLocation.x, r.x),
                n = Math.max(e.boxSelectStartLocation.x, r.x),
                i = Math.min(e.boxSelectStartLocation.y, r.y),
                t = Math.max(e.boxSelectStartLocation.y, r.y),
                r = 'translate(' + o + 'px, ' + i + 'px)';
              (e.boxSelectElement.style.transform = r),
                (e.boxSelectElement.style.WebkitTransform = r),
                (e.boxSelectElement.style.width = n - o + 'px'),
                (e.boxSelectElement.style.height = t - i + 'px');
            }),
            (e.dragMove = function (e, t) {
              (e.dragMoving = !0), t.originalEvent.stopPropagation();
              var r = {
                lng: t.lngLat.lng - e.dragMoveLocation.lng,
                lat: t.lngLat.lat - e.dragMoveLocation.lat,
              };
              u(this.getSelected(), r), (e.dragMoveLocation = t.lngLat);
            }),
            (e.onMouseUp = function (e, t) {
              var r = this;
              e.dragMoving
                ? (this.map.dragPan.enable(), this.fireUpdate(e))
                : e.boxSelecting &&
                  ((t = [e.boxSelectStartLocation, s(t.originalEvent, this.map.getContainer())]),
                  (t = this.featuresAt(null, t, 'click')),
                  (t = this.getUniqueIds(t).filter(function (e) {
                    return !r.isSelected(e);
                  })).length &&
                    (this.select(t),
                    t.forEach(function (e) {
                      return r.doRender(e);
                    }),
                    this.updateUIClasses({ mouse: w.cursors.MOVE })),
                  this.map.fire(w.events.SELECTED, { featureIds: this.getSelectedIds() })),
                this.stopExtendedInteractions(e);
            }),
            (e.toDisplayFeatures = function (e, t, r) {
              (t.properties.active = this.isSelected(t.properties.id)
                ? w.activeStates.ACTIVE
                : w.activeStates.INACTIVE),
                r(t),
                this.fireActionable(),
                t.properties.active === w.activeStates.ACTIVE &&
                  t.geometry.type !== w.geojsonTypes.POINT &&
                  n(t).forEach(r);
            }),
            (e.onTrash = function () {
              this.deleteFeature(this.getSelectedIds()), this.fireActionable();
            }),
            (e.onCombineFeatures = function () {
              var e = this.getSelected();
              if (!(0 === e.length || e.length < 2)) {
                for (
                  var t, r = [], o = [], n = e[0].type.replace('Multi', ''), i = 0;
                  i < e.length;
                  i++
                ) {
                  var s = e[i];
                  if (s.type.replace('Multi', '') !== n) return;
                  s.type.includes('Multi')
                    ? s.getCoordinates().forEach(function (e) {
                        r.push(e);
                      })
                    : r.push(s.getCoordinates()),
                    o.push(s.toGeoJSON());
                }
                1 < o.length &&
                  ((t = this.newFeature({
                    type: w.geojsonTypes.FEATURE,
                    properties: o[0].properties,
                    geometry: { type: 'Multi' + n, coordinates: r },
                  })),
                  this.addFeature(t),
                  this.deleteFeature(this.getSelectedIds(), { silent: !0 }),
                  this.setSelected([t.id]),
                  this.map.fire(w.events.COMBINE_FEATURES, {
                    createdFeatures: [t.toGeoJSON()],
                    deletedFeatures: o,
                  })),
                  this.fireActionable();
              }
            }),
            (e.onUncombineFeatures = function () {
              var r = this,
                e = this.getSelected();
              if (0 !== e.length) {
                for (var o = [], n = [], i = 0; i < e.length; i++)
                  !(function () {
                    var t = e[i];
                    r.isInstanceOf('MultiFeature', t) &&
                      (t.getFeatures().forEach(function (e) {
                        r.addFeature(e),
                          (e.properties = t.properties),
                          o.push(e.toGeoJSON()),
                          r.select([e.id]);
                      }),
                      r.deleteFeature(t.id, { silent: !0 }),
                      n.push(t.toGeoJSON()));
                  })();
                1 < o.length &&
                  this.map.fire(w.events.UNCOMBINE_FEATURES, {
                    createdFeatures: o,
                    deletedFeatures: n,
                  }),
                  this.fireActionable();
              }
            }),
            (e.onUnionPolygon = function () {
              for (var e = this.getSelected(), t = e.length, r = [], o = 0; o < t; o++) r.push(o);
              for (var n = [], i = 0, s = r.length; i < s; i++) {
                var a = r.concat();
                a.splice(0, i + 1);
                for (var c = 0, u = a.length; c < u; c++) n.push([r[i], a[c]]);
              }
              for (var l = !0, p = [], d = [], h = [], f = 0; f < n.length; f++) {
                var y = e[n[f][0]].toGeoJSON(),
                  g = e[n[f][1]].toGeoJSON();
                I(y, g) &&
                  (p.push(n[f]),
                  (g =
                    1 < (y = T(y, g)).geometry.coordinates.length
                      ? w.geojsonTypes.MULTI_POLYGON
                      : w.geojsonTypes.POLYGON),
                  (y = this.newFeature({
                    type: w.geojsonTypes.FEATURE,
                    properties: y.properties,
                    geometry: { type: g, coordinates: y.geometry.coordinates },
                  })),
                  h.push(y),
                  d.push(n[f][0], n[f][1]),
                  (l = !1));
              }
              d = Array.from(new Set(d));
              for (var m = [], _ = [], v = 0; v < d.length; v++)
                _.push(e[d[v]]), m.push(e[d[v]].id);
              var b = (function e(t, r) {
                for (var o = [], n = 0; n < t.length; n++) o.push(n);
                for (var i = [], s = 0, a = o.length; s < a; s++) {
                  var c = o.concat();
                  c.splice(0, s + 1);
                  for (var u = 0, l = c.length; u < l; u++) i.push([o[s], c[u]]);
                }
                var p = [];
                if (0 === i.length) return t;
                for (var d = 0; d < i.length; d++) {
                  var h = t[i[d][0]].toGeoJSON(),
                    f = t[i[d][1]].toGeoJSON();
                  I(h, f) &&
                    ((f =
                      1 < (h = T(h, f)).geometry.coordinates.length
                        ? w.geojsonTypes.MULTI_POLYGON
                        : w.geojsonTypes.POLYGON),
                    (h = r.newFeature({
                      type: w.geojsonTypes.FEATURE,
                      properties: h.properties,
                      geometry: { type: f, coordinates: h.geometry.coordinates },
                    })),
                    p.push(h));
                }
                var y = !0;
                if (1 < p.length)
                  for (var g = 0; g < p.length; g++) {
                    var m = p[i[g][0]].toGeoJSON(),
                      _ = p[i[g][1]].toGeoJSON();
                    I(m, _) && (y = !1);
                  }
                if (y) return p.length ? p : t;
                e(p);
              })(h, this);
              if (l) throw new Error('您选择的面没有交集，不能合并');
              for (var E = [], x = [], S = 0; S < b.length; S++)
                this.addFeature(b[S]), E.push(b[S].id), x.push(b[S].toGeoJSON());
              this.deleteFeature(m, { silent: !0 }),
                this.setSelected(E),
                this.map.fire(w.events.REPLACE, { createdFeatures: x, deletedFeatures: _ }),
                b && b[0].id && this.changeMode(w.modes.SIMPLE_SELECT, { featureIds: E }),
                this.fireActionable();
            }),
            (e.onUnionLine = function () {
              var e = this.getSelected();
              if (2 !== e.length) throw new Error('您需要且只需选择两条线');
              for (var t = 0; t < e.length; t++)
                if (e[t].type !== w.geojsonTypes.LINE_STRING) throw new Error('您选择的必须是线');
              var r = e[0].coordinates[0],
                o = e[0].coordinates[e[0].coordinates.length - 1],
                n = e[1].coordinates[0],
                i = e[1].coordinates[e[1].coordinates.length - 1],
                s = [];
              if (y(r, n)) {
                for (var a = e[0].coordinates.length - 1; 0 <= a; a--) s.push(e[0].coordinates[a]);
                for (var c = 0; c < e[1].coordinates.length; c++) s.push(e[1].coordinates[c]);
              } else if (y(r, i)) {
                for (var u = e[0].coordinates.length - 1; 0 <= u; u--) s.push(e[0].coordinates[u]);
                for (var l = e[1].coordinates.length - 1; 0 <= l; l--) s.push(e[1].coordinates[l]);
              } else if (y(o, n)) {
                for (var p = 0; p < e[0].coordinates.length; p++) s.push(e[0].coordinates[p]);
                for (var d = 0; d < e[1].coordinates.length; d++) s.push(e[1].coordinates[d]);
              } else {
                if (!y(o, i)) throw new Error('您选择的线的两端没有交集');
                for (var h = 0; h < e[0].coordinates.length; h++) s.push(e[0].coordinates[h]);
                for (var f = e[1].coordinates.length - 1; 0 <= f; f--) s.push(e[1].coordinates[f]);
              }
              0 < s.length &&
                ((i = this.newFeature({
                  type: w.geojsonTypes.FEATURE,
                  properties: e[0].properties,
                  geometry: { type: w.geojsonTypes.LINE_STRING, coordinates: s },
                })),
                this.addFeature(i),
                this.deleteFeature(this.getSelectedIds(), { silent: !0 }),
                this.setSelected([i.id]),
                this.map.fire(w.events.REPLACE, {
                  createdFeatures: [i.toGeoJSON()],
                  deletedFeatures: [e[0].toGeoJSON(), e[1].toGeoJSON()],
                })),
                this.fireActionable();
            }),
            (e.onCurveLine = function () {
              var e = this.getSelected();
              if (1 !== e.length) throw new Error('您需要且只需选择一条线');
              if (e[0].type !== w.geojsonTypes.LINE_STRING) throw new Error('您选择的必须是线');
              var t = l(e[0].toGeoJSON(), { resolution: 5e3, sharpness: 0.85 }),
                t = this.newFeature(o(t, { id: e[0].id }));
              this.deleteFeature(this.getSelectedIds(), { silent: !0 }),
                this.addFeature(t),
                this.setSelected([t.id]),
                this.map.fire(w.events.UPDATE, {
                  action: w.updateActions.CHANGE_COORDINATES,
                  prevFeatures: [e[0].toGeoJSON()],
                  features: [t.toGeoJSON()],
                }),
                this.fireActionable();
            }),
            (e.onParallelLine = function (e) {
              var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
                r = this.getSelected();
              if (1 !== r.length) throw new Error('您需要且只需选择一条线');
              if (r[0].type !== w.geojsonTypes.LINE_STRING) throw new Error('您选择的必须是线');
              var o = h(d(r[0].coordinates[1]), d(r[0].coordinates[0])),
                n =
                  2 < r[0].coordinates.length
                    ? h(d(r[0].coordinates[1]), d(r[0].coordinates[2]))
                    : h(d(r[0].coordinates[0]), d(r[0].coordinates[1])),
                i = 360 <= o + n ? (o + n - 360) / 2 : (o + n) / 2,
                n = t.distance,
                s = void 0 === n ? 20 : n,
                n = t.isClockwise,
                n = void 0 === n || n,
                t = t.count,
                a = void 0 === t ? 1 : t;
              n && i < 0 ? (i += 180) : !n && 0 < i && (i -= 180);
              for (var c = [], u = [], l = 1; l <= a; l++) {
                var p = f(r[0].toGeoJSON(), (s / 1e3) * l, i),
                  p = this.newFeature({
                    type: w.geojsonTypes.FEATURE,
                    properties: r[0].properties,
                    geometry: p.geometry,
                  });
                c.push(p.id), u.push(p.toGeoJSON()), this.addFeature(p);
              }
              this.setSelected(c),
                this.map.fire(w.events.CREATE, { features: u }),
                this.fireActionable();
            }),
            (e.onCloneFeature = function () {
              var e = this.getSelected();
              if (1 !== e.length) throw new Error('您需要且只需选择一个图形');
              var t = [],
                r = [],
                o = f(e[0].toGeoJSON(), 0.05, 90),
                o = this.newFeature({
                  type: o.type,
                  properties: e[0].properties,
                  geometry: o.geometry,
                });
              t.push(o.id),
                r.push(o.toGeoJSON()),
                this.addFeature(o),
                this.setSelected(t),
                this.map.fire(w.events.CREATE, { features: r }),
                this.fireActionable();
            }),
            (e.onCurveFeature = function (e) {
              var t = this.getSelected();
              if (1 !== t.length) throw new Error('您需要且只需选择一条线或面');
              if (![w.geojsonTypes.LINE_STRING, w.geojsonTypes.POLYGON].includes(t[0].type))
                throw new Error('您选择必须是线或面');
              if (this.getSelectedCoordPaths().length < 3)
                throw new Error('您需要至少连续选择三个断点');
            }),
            (e.onSplitLine = function (e) {
              var t = this.getSelected();
              if (1 !== t.length) throw new Error('您需要且只需选择一条线');
              if (t[0].type !== w.geojsonTypes.LINE_STRING) throw new Error('您选择必须是线');
              if (1 !== this.getSelectedCoordinates().length)
                throw new Error('您需要且只需选择一个断点');
            }),
            (t.exports = e);
        },
        {
          '../constants': 172,
          '../edit/util/is_same_point': 188,
          '../lib/common_selectors': 212,
          '../lib/create_supplementary_points': 215,
          '../lib/double_click_zoom': 217,
          '../lib/mouse_event_point': 226,
          '../lib/move_features': 227,
          '../lib/string_set': 229,
          '@turf/bearing': 12,
          '@turf/bezier-spline': 13,
          '@turf/helpers': 21,
          '@turf/intersect': 22,
          '@turf/line-intersect': 26,
          '@turf/line-to-polygon': 30,
          '@turf/polygon-to-line': 33,
          '@turf/transform-translate': 40,
          '@turf/union': 42,
          xtend: 170,
        },
      ],
      260: [
        function (e, t, r) {
          'use strict';
          var S = e('xtend'),
            o = e('../lib/common_selectors'),
            n = e('../lib/double_click_zoom'),
            w = e('../constants'),
            i = e('../lib/is_event_at_coordinates'),
            s = e('../lib/create_vertex'),
            I = e('@turf/polygon-to-line').default,
            T = e('@turf/line-to-polygon').default,
            C = e('@turf/line-intersect').default,
            O = e('@turf/nearest-point-on-line').default,
            e = {
              onSetup: function () {
                var e = this.getSelected();
                if (0 === e.length) throw new Error('请先选取一个多边形');
                if (1 < e.length) throw new Error('只能选取一个多边形');
                var t = e[0];
                if (t.type !== w.geojsonTypes.POLYGON) throw new Error('请先选取一个多边形');
                var r = t.id,
                  e = this.newFeature({
                    type: w.geojsonTypes.FEATURE,
                    properties: {},
                    geometry: { type: w.geojsonTypes.LINE_STRING, coordinates: [] },
                  });
                return (
                  this.addFeature(e),
                  this.setSelected([r]),
                  n.disable(this),
                  this.updateUIClasses({ mouse: w.cursors.ADD }),
                  this.setActionableState({ trash: !0 }),
                  { line: e, selectedPolygon: t, selectedPolygonId: r, currentVertexPosition: 0 }
                );
              },
            };
          (e.splitPolygon = function (e) {
            var t = e.line.toGeoJSON(),
              r = e.selectedPolygon.toGeoJSON(),
              o = C(r, t);
            if (2 !== o.features.length)
              throw (
                (this.deleteFeature([e.line.id], { silent: !0 }),
                this.changeMode(w.modes.SIMPLE_SELECT, { featureIds: [e.selectedPolygonId] }),
                new Error('您所画的线与面需要切仅需两个交点'))
              );
            var r = I(r),
              n = O(t, o.features[0], { units: 'miles' }),
              i = O(t, o.features[1], { units: 'miles' }),
              s = O(r, o.features[0], { units: 'miles' }),
              a = O(r, o.features[1], { units: 'miles' });
            (n.geometry.coordinates = o.features[0].geometry.coordinates),
              (i.geometry.coordinates = o.features[1].geometry.coordinates),
              (s.geometry.coordinates = o.features[0].geometry.coordinates),
              (a.geometry.coordinates = o.features[1].geometry.coordinates);
            function c(e, t) {
              return 0 === t.length || ((t = t[t.length - 1]), e[0] !== t[0] || e[1] !== t[1]);
            }
            var u = r.geometry.coordinates,
              l = t.geometry.coordinates,
              p = [],
              d = [];
            if ((p.push(s.geometry.coordinates), s.properties.index <= a.properties.index))
              for (var h = s.properties.index + 1; h < a.properties.index + 1; h++)
                c(u[h], p) && p.push(u[h]);
            else
              for (var f = s.properties.index; f > a.properties.index; f--)
                c(u[f], p) && p.push(u[f]);
            if (
              (c(a.geometry.coordinates, p) && p.push(a.geometry.coordinates),
              c(i.geometry.coordinates, p) && p.push(i.geometry.coordinates),
              n.properties.index <= i.properties.index)
            )
              for (var y = i.properties.index; y > n.properties.index; y--)
                c(l[y], p) && p.push(l[y]);
            else
              for (var g = i.properties.index + 1; g < n.properties.index + 1; g++)
                c(l[g], p) && p.push(l[g]);
            if (
              (c(n.geometry.coordinates, p) && p.push(n.geometry.coordinates),
              c(s.geometry.coordinates, p) && p.push(s.geometry.coordinates),
              d.push(n.geometry.coordinates),
              n.properties.index <= i.properties.index)
            )
              for (var m = n.properties.index + 1; m < i.properties.index + 1; m++)
                c(l[m], d) && d.push(l[m]);
            else
              for (var _ = n.properties.index; _ > i.properties.index; _--)
                c(l[_], d) && d.push(l[_]);
            if (
              (c(i.geometry.coordinates, d) && d.push(i.geometry.coordinates),
              c(a.geometry.coordinates, d) && d.push(a.geometry.coordinates),
              s.properties.index <= a.properties.index)
            ) {
              for (var v = a.properties.index + 1; v < u.length; v++) c(u[v], d) && d.push(u[v]);
              for (var b = 0; b < s.properties.index + 1; b++) c(u[b], d) && d.push(u[b]);
            } else {
              for (var E = a.properties.index; 0 <= E; E--) c(u[E], d) && d.push(u[E]);
              for (var x = u.length - 1; x > s.properties.index; x--) c(u[x], d) && d.push(u[x]);
            }
            c(s.geometry.coordinates, d) && d.push(s.geometry.coordinates),
              c(n.geometry.coordinates, d) && d.push(n.geometry.coordinates);
            (r = T({
              type: w.geojsonTypes.FEATURE,
              properties: {},
              geometry: { type: w.geojsonTypes.LINE_STRING, coordinates: p },
            })),
              (t = T({
                type: w.geojsonTypes.FEATURE,
                properties: {},
                geometry: { type: w.geojsonTypes.LINE_STRING, coordinates: d },
              })),
              (r = this.newFeature(
                S({ geometry: r.geometry }, { properties: e.selectedPolygon.properties }),
              )),
              (t = this.newFeature(
                S({ geometry: t.geometry }, { properties: e.selectedPolygon.properties }),
              ));
            this.addFeature(r),
              this.addFeature(t),
              this.deleteFeature(e.selectedPolygon.id, { silent: !0 }),
              this.deleteFeature([e.line.id], { silent: !0 }),
              this.map.fire(w.events.REPLACE, {
                createdFeatures: [r.toGeoJSON(), t.toGeoJSON()],
                deletedFeatures: [e.selectedPolygon.toGeoJSON()],
              }),
              this.changeMode(w.modes.SIMPLE_SELECT, { featureIds: [r.id, t.id] });
          }),
            (e.clickAnywhere = function (e, t) {
              0 < e.currentVertexPosition && i(t, e.line.coordinates[e.currentVertexPosition - 1])
                ? this.splitPolygon(e)
                : (this.setSelected([e.selectedPolygonId]),
                  this.updateUIClasses({ mouse: w.cursors.ADD }),
                  e.line.updateCoordinate(e.currentVertexPosition, t.lngLat.lng, t.lngLat.lat),
                  e.currentVertexPosition++);
            }),
            (e.clickOnVertex = function (e) {
              this.splitPolygon(e);
            }),
            (e.onMouseMove = function (e, t) {
              e.line.updateCoordinate(e.currentVertexPosition, t.lngLat.lng, t.lngLat.lat),
                this.updateUIClasses({ mouse: w.cursors.ADD });
            }),
            (e.onTap = e.onClick =
              function (e, t) {
                return o.isVertex(t) ? this.clickOnVertex(e, t) : this.clickAnywhere(e, t);
              }),
            (e.onKeyUp = function (e, t) {
              o.isEscapeKey(t)
                ? (this.deleteFeature([e.polygon.id], { silent: !0 }),
                  this.changeMode(w.modes.SIMPLE_SELECT))
                : o.isEnterKey(t) && this.splitPolygon(e);
            }),
            (e.onStop = function (e) {
              this.updateUIClasses({ mouse: w.cursors.NONE }),
                n.enable(this),
                this.activateUIButton(),
                void 0 !== this.getFeature(e.line.id) &&
                  (e.line.removeCoordinate('' + e.currentVertexPosition),
                  e.line.isValid()
                    ? this.splitPolygon(e)
                    : (this.deleteFeature([e.line.id], { silent: !0 }),
                      this.changeMode(w.modes.SIMPLE_SELECT, {}, { silent: !0 })));
            }),
            (e.toDisplayFeatures = function (e, t, r) {
              if (this.isSelected(t.properties.id) && t.geometry.type === w.geojsonTypes.POLYGON)
                return (t.properties.active = w.activeStates.ACTIVE), r(t);
              var o = t.properties.id === e.line.id;
              if (((t.properties.active = o ? w.activeStates.ACTIVE : w.activeStates.INACTIVE), !o))
                return r(t);
              t.geometry.coordinates.length < 2 ||
                ((t.properties.meta = w.meta.FEATURE),
                3 <= t.geometry.coordinates.length &&
                  r(
                    s(
                      e.line.id,
                      t.geometry.coordinates[t.geometry.coordinates.length - 2],
                      '' + (t.geometry.coordinates.length - 2),
                      !1,
                      t,
                    ),
                  ),
                r(t));
            }),
            (e.onTrash = function (e) {
              this.deleteFeature([e.polygon.id], { silent: !0 }),
                this.changeMode(w.modes.SIMPLE_SELECT);
            }),
            (t.exports = e);
        },
        {
          '../constants': 172,
          '../lib/common_selectors': 212,
          '../lib/create_vertex': 216,
          '../lib/double_click_zoom': 217,
          '../lib/is_event_at_coordinates': 222,
          '@turf/line-intersect': 26,
          '@turf/line-to-polygon': 30,
          '@turf/nearest-point-on-line': 32,
          '@turf/polygon-to-line': 33,
          xtend: 170,
        },
      ],
      261: [
        function (e, t, r) {
          'use strict';
          var o = {
            onSetup: function () {
              return this.setActionableState(), {};
            },
            toDisplayFeatures: function (e, t, r) {
              r(t);
            },
          };
          t.exports = o;
        },
        {},
      ],
      262: [
        function (e, t, r) {
          'use strict';
          var o = e('xtend'),
            n = e('./constants'),
            i = e('./lib/change_style_theme'),
            s = {
              defaultMode: n.modes.SIMPLE_SELECT,
              keybindings: !0,
              touchEnabled: !0,
              clickBuffer: 2,
              touchBuffer: 25,
              boxSelect: !0,
              secondEdit: !0,
              displayControlsDefault: !0,
              styles: e('./edit/theme'),
              userStyles: {},
              modes: e('./modes'),
              controls: {},
              userProperties: !0,
              showButtons: !0,
              drawEnabled: !0,
              adsorbEnabled: !1,
              adsorbBuffer: 5,
              maxZoom: n.MAXZOOM,
              minZoom: n.MINZOOM,
              decimalPointNum: 14,
              classificationType: !1,
            },
            a = {
              point: !0,
              line_string: !0,
              polygon: !0,
              trash: !0,
              combine_features: !0,
              uncombine_features: !0,
            },
            c = {
              point: !1,
              line_string: !1,
              polygon: !1,
              trash: !1,
              combine_features: !1,
              uncombine_features: !1,
            };
          function u(e, t) {
            return e.map(function (e) {
              return e.source
                ? e
                : o(e, {
                    id: e.id + '.' + t,
                    source: 'hot' === t ? n.sources.HOT : n.sources.COLD,
                  });
            });
          }
          t.exports = function () {
            var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
              t = o(e);
            return (
              e.controls || (t.controls = {}),
              !1 === e.displayControlsDefault
                ? (t.controls = o(c, e.controls))
                : (t.controls = o(a, e.controls)),
              (t = o(s, t)),
              e.userStyles && (t.styles = i(e.userStyles, t.styles)),
              (t.styles = u(t.styles, 'cold').concat(u(t.styles, 'hot'))),
              t
            );
          };
        },
        {
          './constants': 172,
          './edit/theme': 180,
          './lib/change_style_theme': 211,
          './modes': 255,
          xtend: 170,
        },
      ],
      263: [
        function (e, t, r) {
          'use strict';
          var u = e('./constants');
          t.exports = function () {
            var r = this;
            if (!(r.ctx.map && void 0 !== r.ctx.map.getSource(u.sources.HOT))) return c();
            var o = r.ctx.events.currentModeName();
            r.ctx.ui.queueMapClasses({ mode: o });
            var t = [],
              e = [],
              e = r.isDirty
                ? r.getAllIds()
                : ((t = r.getChangedIds().filter(function (e) {
                    return void 0 !== r.get(e);
                  })),
                  r.sources.hot
                    .filter(function (e) {
                      return (
                        e.properties.id &&
                        -1 === t.indexOf(e.properties.id) &&
                        void 0 !== r.get(e.properties.id)
                      );
                    })
                    .map(function (e) {
                      return e.properties.id;
                    }));
            r.sources.hot = [];
            var n = r.sources.cold.length;
            r.sources.cold = r.isDirty
              ? []
              : r.sources.cold.filter(function (e) {
                  e = e.properties.id || e.properties.parent;
                  return -1 === t.indexOf(e);
                });
            var i,
              n = n !== r.sources.cold.length || 0 < e.length;
            function s(e, t) {
              e = r.get(e);
              'none' !== e.properties.visibility &&
                ((e = e.internal(o)),
                r.ctx.events.currentModeRender(e, function (e) {
                  r.sources[t].push(e);
                }));
            }
            function a(e, t) {
              var e = 'cold' === e ? u.sources.POLYGON_LINE_COLD : u.sources.POLYGON_LINE_HOT,
                t = JSON.parse(JSON.stringify(t)),
                n = { type: u.geojsonTypes.FEATURE_COLLECTION, features: [] };
              t &&
                t.length &&
                (t = t.filter(function (e) {
                  return 'Polygon' === e.geometry.type || 'MultiPolygon' === e.geometry.type;
                })).length &&
                t.forEach(function (o) {
                  if (
                    ((o.properties['meta:type'] = 'LineString'),
                    'Polygon' === o.geometry.type &&
                      n.features.push({
                        type: 'Feature',
                        properties: o.properties,
                        geometry: { type: 'LineString', coordinates: o.geometry.coordinates[0] },
                      }),
                    'MultiPolygon' === o.geometry.type)
                  )
                    for (var e = 0; e < o.geometry.coordinates.length; e++)
                      !(function (r) {
                        o.geometry.coordinates[r].forEach(function (e, t) {
                          n.features.push({
                            type: 'Feature',
                            properties: o.properties,
                            geometry: {
                              type: 'LineString',
                              coordinates: o.geometry.coordinates[r][t],
                            },
                          });
                        });
                      })(e);
                }),
                r.ctx.map.getSource(e).setData(n);
            }
            function c() {
              (r.isDirty = !1), r.clearChangedIds();
            }
            t.forEach(function (e) {
              return s(e, 'hot');
            }),
              e.forEach(function (e) {
                return s(e, 'cold');
              }),
              n &&
                (a('cold', r.sources.cold),
                r.ctx.map
                  .getSource(u.sources.COLD)
                  .setData({ type: u.geojsonTypes.FEATURE_COLLECTION, features: r.sources.cold })),
              a('hot', r.sources.hot),
              r.ctx.map
                .getSource(u.sources.HOT)
                .setData({ type: u.geojsonTypes.FEATURE_COLLECTION, features: r.sources.hot }),
              r._emitSelectionChange &&
                (r.ctx.map.fire(u.events.SELECTION_CHANGE, {
                  features: r.getSelected().map(function (e) {
                    return e.toGeoJSON();
                  }),
                  points: r.getSelectedCoordinates().map(function (e) {
                    return {
                      type: u.geojsonTypes.FEATURE,
                      properties: {},
                      geometry: { type: u.geojsonTypes.POINT, coordinates: e.coordinates },
                    };
                  }),
                }),
                (r._emitSelectionChange = !1)),
              r._deletedFeaturesToEmit.length &&
                ((i = r._deletedFeaturesToEmit.map(function (e) {
                  return e.toGeoJSON();
                })),
                (r._deletedFeaturesToEmit = []),
                r.ctx.map.fire(u.events.DELETE, { features: i })),
              0 < r.sources.hot.length &&
                ((i = []),
                (i =
                  0 < r.getSelected().length
                    ? r.getSelected().map(function (e) {
                        return e.toGeoJSON();
                      })
                    : r.sources.hot.map(function (e) {
                        return JSON.parse(JSON.stringify(e));
                      })),
                r.ctx.map.fire(u.events.SELECTION_MOVE_CHANGE, {
                  features: i,
                  points: r.getSelectedCoordinates().map(function (e) {
                    return {
                      type: u.geojsonTypes.FEATURE,
                      properties: {},
                      geometry: { type: u.geojsonTypes.POINT, coordinates: e.coordinates },
                    };
                  }),
                })),
              r.ctx.map.fire(u.events.RENDER, {}),
              c();
          };
        },
        { './constants': 172 },
      ],
      264: [
        function (e, t, r) {
          'use strict';
          var s = e('./events'),
            a = e('./store'),
            c = e('./ui'),
            u = e('./constants');
          t.exports = function (o) {
            var n = null,
              i = {
                onRemove: function () {
                  return (
                    i.removeLayers(),
                    o.store.restoreMapConfig(),
                    o.ui.removeButtons(),
                    o.events.removeEventListeners(),
                    (o.map = null),
                    (o.container = null),
                    (o.store = null),
                    n && n.parentNode && n.parentNode.removeChild(n),
                    (n = null),
                    this
                  );
                },
                onAdd: function (e) {
                  (o.map = e),
                    (o.events = s(o)),
                    (o.ui = c(o)),
                    (o.container = e.getContainer()),
                    (o.store = new a(o)),
                    (n = o.ui.addButtons()),
                    o.options.boxSelect &&
                      (e.boxZoom.disable(), e.dragPan.disable(), e.dragPan.enable());
                  function t() {
                    e.off('load', t),
                      clearInterval(r),
                      i.addLayers(),
                      o.store.storeMapConfig(),
                      o.events.addEventListeners(),
                      e.fire('editLoad', { editLoad: !0 });
                  }
                  var r = null;
                  return (
                    e.on('load', t),
                    (r = setInterval(function () {
                      e.loaded() && t();
                    }, 16)),
                    o.events.start(),
                    n
                  );
                },
                addLayers: function () {
                  o.map.addSource('editSignSource', {
                    type: 'geojson',
                    data: { type: u.geojsonTypes.FEATURE_COLLECTION, features: [] },
                  }),
                    o.map.addLayer({
                      id: 'editSignLayer',
                      type: 'circle',
                      source: 'editSignSource',
                      layout: { visibility: 'visible' },
                      paint: { 'circle-radius': 1e-4 },
                      minzoom: 7,
                      maxzoom: 17.5,
                    }),
                    o.map.addSource(u.sources.COLD, {
                      data: { type: u.geojsonTypes.FEATURE_COLLECTION, features: [] },
                      type: 'geojson',
                      maxzoom: o.options.maxZoom,
                      minzoom: o.options.minZoom,
                    }),
                    o.map.addSource(u.sources.HOT, {
                      data: { type: u.geojsonTypes.FEATURE_COLLECTION, features: [] },
                      type: 'geojson',
                      maxzoom: o.options.maxZoom,
                      minzoom: o.options.minZoom,
                    }),
                    o.map.addSource(u.sources.POLYGON_LINE_COLD, {
                      data: { type: u.geojsonTypes.FEATURE_COLLECTION, features: [] },
                      type: 'geojson',
                      maxzoom: o.options.maxZoom,
                      minzoom: o.options.minZoom,
                    }),
                    o.map.addSource(u.sources.POLYGON_LINE_HOT, {
                      data: { type: u.geojsonTypes.FEATURE_COLLECTION, features: [] },
                      type: 'geojson',
                      maxzoom: o.options.maxZoom,
                      minzoom: o.options.minZoom,
                    }),
                    o.options.styles.forEach(function (e) {
                      (-1 < e.id.indexOf('gl-draw-polygon-stroke-inactive') ||
                        -1 < e.id.indexOf('gl-draw-polygon-stroke-active')) &&
                        'line' === e.type &&
                        (-1 < e.id.indexOf('cold')
                          ? (e.source = u.sources.POLYGON_LINE_COLD)
                          : -1 < e.id.indexOf('hot') && (e.source = u.sources.POLYGON_LINE_HOT)),
                        (e.maxZoom = o.options.maxZoom),
                        (e.minZoom = o.options.minZoom),
                        o.options.classificationType && (e.classificationType = 8),
                        o.map.addLayer(e);
                    }),
                    o.store.render();
                },
                removeLayers: function () {
                  o.options.styles.forEach(function (e) {
                    o.map.getLayer(e.id) && o.map.removeLayer(e.id);
                  }),
                    o.map.getLayer('editSignLayer') && o.map.removeLayer('editSignLayer'),
                    o.map.getSource('editSignSource') && o.map.removeSource('editSignSource'),
                    o.map.getSource(u.sources.COLD) && o.map.removeSource(u.sources.COLD),
                    o.map.getSource(u.sources.HOT) && o.map.removeSource(u.sources.HOT),
                    o.map.getSource(u.sources.POLYGON_LINE_COLD) &&
                      o.map.removeSource(u.sources.POLYGON_LINE_COLD),
                    o.map.getSource(u.sources.POLYGON_LINE_HOT) &&
                      o.map.removeSource(u.sources.POLYGON_LINE_HOT);
                },
              };
            return (o.setup = i);
          };
        },
        { './constants': 172, './events': 189, './store': 265, './ui': 267 },
      ],
      265: [
        function (e, t, r) {
          'use strict';
          var o = e('./lib/throttle'),
            n = e('./lib/to_dense_array'),
            i = e('./lib/string_set'),
            s = e('./render'),
            a = e('./constants').interactions,
            t = (t.exports = function (e) {
              (this._features = {}),
                (this._featureIds = new i()),
                (this._selectedFeatureIds = new i()),
                (this._selectedCoordinates = []),
                (this._changedFeatureIds = new i()),
                (this._deletedFeaturesToEmit = []),
                (this._emitSelectionChange = !1),
                (this._mapInitialConfig = {}),
                (this.ctx = e),
                (this.sources = { hot: [], cold: [] }),
                (this.render = o(s, 16, this)),
                (this.isDirty = !1);
            });
          function c(e) {
            var t = this,
              r = this._selectedCoordinates.filter(function (e) {
                return t._selectedFeatureIds.has(e.feature_id);
              });
            this._selectedCoordinates.length === r.length ||
              e.silent ||
              (this._emitSelectionChange = !0),
              (this._selectedCoordinates = r);
          }
          (t.prototype.createRenderBatch = function () {
            var e = this,
              t = this.render,
              r = 0;
            return (
              (this.render = function () {
                r++;
              }),
              function () {
                (e.render = t), 0 < r && e.render();
              }
            );
          }),
            (t.prototype.setDirty = function () {
              return (this.isDirty = !0), this;
            }),
            (t.prototype.featureChanged = function (e) {
              return this._changedFeatureIds.add(e), this;
            }),
            (t.prototype.getChangedIds = function () {
              return this._changedFeatureIds.values();
            }),
            (t.prototype.clearChangedIds = function () {
              return this._changedFeatureIds.clear(), this;
            }),
            (t.prototype.getAllIds = function () {
              return this._featureIds.values();
            }),
            (t.prototype.add = function (e) {
              return (
                this.featureChanged(e.id),
                (this._features[e.id] = e),
                this._featureIds.add(e.id),
                this
              );
            }),
            (t.prototype.delete = function (e) {
              var t = this,
                r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
              return (
                n(e).forEach(function (e) {
                  t._featureIds.has(e) &&
                    (t._featureIds.delete(e),
                    t._selectedFeatureIds.delete(e),
                    r.silent ||
                      (-1 === t._deletedFeaturesToEmit.indexOf(t._features[e]) &&
                        t._deletedFeaturesToEmit.push(t._features[e])),
                    delete t._features[e],
                    (t.isDirty = !0));
                }),
                c.call(this, r),
                this
              );
            }),
            (t.prototype.get = function (e) {
              return this._features[e];
            }),
            (t.prototype.getAll = function () {
              var t = this;
              return Object.keys(this._features).map(function (e) {
                return t._features[e];
              });
            }),
            (t.prototype.select = function (e) {
              var t = this,
                r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
              return (
                n(e).forEach(function (e) {
                  t._selectedFeatureIds.has(e) ||
                    (t._selectedFeatureIds.add(e),
                    t._changedFeatureIds.add(e),
                    r.silent || (t._emitSelectionChange = !0));
                }),
                this
              );
            }),
            (t.prototype.deselect = function (e) {
              var t = this,
                r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
              return (
                n(e).forEach(function (e) {
                  t._selectedFeatureIds.has(e) &&
                    (t._selectedFeatureIds.delete(e),
                    t._changedFeatureIds.add(e),
                    r.silent || (t._emitSelectionChange = !0));
                }),
                c.call(this, r),
                this
              );
            }),
            (t.prototype.clearSelected = function () {
              var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
              return this.deselect(this._selectedFeatureIds.values(), { silent: e.silent }), this;
            }),
            (t.prototype.setSelected = function (t) {
              var r = this,
                e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
              return (
                (t = n(t)),
                this.deselect(
                  this._selectedFeatureIds.values().filter(function (e) {
                    return -1 === t.indexOf(e);
                  }),
                  { silent: e.silent },
                ),
                this.select(
                  t.filter(function (e) {
                    return !r._selectedFeatureIds.has(e);
                  }),
                  { silent: e.silent },
                ),
                this
              );
            }),
            (t.prototype.setSelectedCoordinates = function (e) {
              return (this._selectedCoordinates = e), (this._emitSelectionChange = !0), this;
            }),
            (t.prototype.clearSelectedCoordinates = function () {
              return (this._selectedCoordinates = []), (this._emitSelectionChange = !0), this;
            }),
            (t.prototype.getSelectedIds = function () {
              return this._selectedFeatureIds.values();
            }),
            (t.prototype.getSelected = function () {
              var t = this;
              return this._selectedFeatureIds.values().map(function (e) {
                return t.get(e);
              });
            }),
            (t.prototype.getSelectedCoordinates = function () {
              var t = this;
              return this._selectedCoordinates.map(function (e) {
                return { coordinates: t.get(e.feature_id).getCoordinate(e.coord_path) };
              });
            }),
            (t.prototype.getSelectedCoordPaths = function () {
              return this._selectedCoordinates.map(function (e) {
                return e.coord_path;
              });
            }),
            (t.prototype.isSelected = function (e) {
              return this._selectedFeatureIds.has(e);
            }),
            (t.prototype.setFeatureProperty = function (e, t, r) {
              this.get(e).setProperty(t, r), this.featureChanged(e);
            }),
            (t.prototype.storeMapConfig = function () {
              var t = this;
              a.forEach(function (e) {
                t.ctx.map[e] && (t._mapInitialConfig[e] = t.ctx.map[e].isEnabled());
              });
            }),
            (t.prototype.restoreMapConfig = function () {
              var t = this;
              Object.keys(this._mapInitialConfig).forEach(function (e) {
                t._mapInitialConfig[e] ? t.ctx.map[e].enable() : t.ctx.map[e].disable();
              });
            }),
            (t.prototype.getInitialConfigValue = function (e) {
              return void 0 === this._mapInitialConfig[e] || this._mapInitialConfig[e];
            });
        },
        {
          './constants': 172,
          './lib/string_set': 229,
          './lib/throttle': 231,
          './lib/to_dense_array': 232,
          './render': 263,
        },
      ],
      266: [
        function (e, t, r) {
          'use strict';
          var c = (t.exports = function (e, t) {
            if (((t = t || 16), void 0 === e && (e = 128), e <= 0)) return '0';
            for (var r = Math.log(Math.pow(2, e)) / Math.log(t), o = 2; r === 1 / 0; o *= 2)
              r = (Math.log(Math.pow(2, e / o)) / Math.log(t)) * o;
            for (var n, i = r - Math.floor(r), s = '', o = 0; o < Math.floor(r); o++)
              s =
                Math.floor(
                  ((n = void 0),
                  (n = new Uint32Array(1)),
                  window.crypto.getRandomValues(n),
                  (n / 4294967295) * t),
                ).toString(t) + s;
            i && ((a = Math.pow(t, i)), (s = Math.floor(MnewRand() * a).toString(t) + s));
            var a = parseInt(s, t);
            return a !== 1 / 0 && a >= Math.pow(2, e) ? c(e, t) : s;
          });
          c.rack = function (o, n, i) {
            function r(e) {
              var t = 0;
              do {
                if (10 < t++) {
                  if (!i) throw new Error('too many ID collisions, use more bits');
                  o += i;
                }
                var r = c(o, n);
              } while (Object.hasOwnProperty.call(s, r));
              return (s[r] = e), r;
            }
            var s = (r.hats = {});
            return (
              (r.get = function (e) {
                return r.hats[e];
              }),
              (r.set = function (e, t) {
                return (r.hats[e] = t), r;
              }),
              (r.bits = o || 128),
              (r.base = n || 16),
              r
            );
          };
        },
        {},
      ],
      267: [
        function (e, t, r) {
          'use strict';
          var l = e('xtend'),
            p = e('./constants'),
            d = ['mode', 'feature', 'mouse'];
          t.exports = function (o) {
            var r = {},
              n = null,
              i = { mode: null, feature: null, mouse: null },
              s = { mode: null, feature: null, mouse: null };
            function a(t, e) {
              var r = 1 < arguments.length && void 0 !== e ? e : {},
                e = document.createElement('button');
              return (
                (e.className = p.classes.CONTROL_BUTTON + ' ' + r.className),
                e.setAttribute('title', r.title),
                r.container.appendChild(e),
                e.addEventListener(
                  'click',
                  function (e) {
                    e.preventDefault(),
                      e.stopPropagation(),
                      e.target !== n ? (u(t), r.onActivate()) : c();
                  },
                  !0,
                ),
                e
              );
            }
            function c() {
              n && (n.classList.remove(p.classes.ACTIVE_BUTTON), (n = null));
            }
            function u(e) {
              c();
              var t = r[e];
              t && t && 'trash' !== e && (t.classList.add(p.classes.ACTIVE_BUTTON), (n = t));
            }
            return {
              setActiveButton: u,
              queueMapClasses: function (e) {
                s = l(s, e);
              },
              updateMapClasses: function () {
                var t, r;
                o.container &&
                  ((t = []),
                  (r = []),
                  d.forEach(function (e) {
                    s[e] !== i[e] &&
                      (t.push(e + '-' + i[e]), null !== s[e] && r.push(e + '-' + s[e]));
                  }),
                  0 < t.length && o.container.classList.remove.apply(o.container.classList, t),
                  0 < r.length && o.container.classList.add.apply(o.container.classList, r),
                  (i = l(i, s)));
              },
              addButtons: function () {
                var e = o.options.controls,
                  t = document.createElement('div');
                return (
                  o.options.showButtons || (t.style.visibility = 'hidden'),
                  (t.className = p.classes.CONTROL_GROUP + ' ' + p.classes.CONTROL_BASE),
                  e &&
                    (e[p.types.LINE] &&
                      (r[p.types.LINE] = a(p.types.LINE, {
                        container: t,
                        className: p.classes.CONTROL_BUTTON_LINE,
                        title: 'LineString tool ' + (o.options.keybindings ? '(l)' : ''),
                        onActivate: function () {
                          return o.events.changeMode(p.modes.DRAW_LINE_STRING);
                        },
                      })),
                    e[p.types.POLYGON] &&
                      (r[p.types.POLYGON] = a(p.types.POLYGON, {
                        container: t,
                        className: p.classes.CONTROL_BUTTON_POLYGON,
                        title: 'Polygon tool ' + (o.options.keybindings ? '(p)' : ''),
                        onActivate: function () {
                          return o.events.changeMode(p.modes.DRAW_POLYGON);
                        },
                      })),
                    e[p.types.POINT] &&
                      (r[p.types.POINT] = a(p.types.POINT, {
                        container: t,
                        className: p.classes.CONTROL_BUTTON_POINT,
                        title: 'Marker tool ' + (o.options.keybindings ? '(m)' : ''),
                        onActivate: function () {
                          return o.events.changeMode(p.modes.DRAW_POINT);
                        },
                      })),
                    e.trash &&
                      (r.trash = a('trash', {
                        container: t,
                        className: p.classes.CONTROL_BUTTON_TRASH,
                        title: 'Delete',
                        onActivate: function () {
                          o.events.trash();
                        },
                      })),
                    e.combine_features &&
                      (r.combine_features = a('combineFeatures', {
                        container: t,
                        className: p.classes.CONTROL_BUTTON_COMBINE_FEATURES,
                        title: 'Combine',
                        onActivate: function () {
                          o.events.combineFeatures();
                        },
                      })),
                    e.uncombine_features &&
                      (r.uncombine_features = a('uncombineFeatures', {
                        container: t,
                        className: p.classes.CONTROL_BUTTON_UNCOMBINE_FEATURES,
                        title: 'Uncombine',
                        onActivate: function () {
                          o.events.uncombineFeatures();
                        },
                      }))),
                  t
                );
              },
              removeButtons: function () {
                Object.keys(r).forEach(function (e) {
                  var t = r[e];
                  t.parentNode && t.parentNode.removeChild(t), delete r[e];
                });
              },
            };
          };
        },
        { './constants': 172, xtend: 170 },
      ],
    },
    {},
    [179],
  )(179);
});

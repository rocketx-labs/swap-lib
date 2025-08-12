var M = Object.defineProperty;
var x = (s, t, e) => t in s ? M(s, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : s[t] = e;
var c = (s, t, e) => (x(s, typeof t != "symbol" ? t + "" : t, e), e);
import { BigNumber as l } from "bignumber.js";
var N = /* @__PURE__ */ ((s) => (s.THOR = "THOR", s.RUNE = "RUNE", s["RUNE-67C"] = "RUNE-67C", s["RUNE-B1A"] = "RUNE-B1A", s.ATOM = "ATOM", s.MUON = "MUON", s.USDC = "USDC", s))(N || {}), o = /* @__PURE__ */ ((s) => (s.Avalanche = "AVAX", s.Binance = "BNB", s.BinanceSmartChain = "BSC", s.Bitcoin = "BTC", s.BitcoinCash = "BCH", s.Cosmos = "GAIA", s.Doge = "DOGE", s.Ethereum = "ETH", s.Litecoin = "LTC", s.THORChain = "THOR", s))(o || {}), h = /* @__PURE__ */ ((s) => (s[s.AVAX = 18] = "AVAX", s[s.BCH = 8] = "BCH", s[s.BNB = 8] = "BNB", s[s.BSC = 18] = "BSC", s[s.BTC = 8] = "BTC", s[s.DOGE = 8] = "DOGE", s[s.ETH = 18] = "ETH", s[s.GAIA = 6] = "GAIA", s[s.LTC = 8] = "LTC", s[s.THOR = 8] = "THOR", s))(h || {});
const I = (s, t, e = !1) => {
  if (e)
    return "Synth";
  switch (s) {
    case o.Bitcoin:
    case o.BitcoinCash:
    case o.Doge:
    case o.Litecoin:
    case o.THORChain:
      return "Native";
    case o.Cosmos:
      return t === "ATOM" ? "Native" : "GAIA";
    case o.Binance:
      return t === "BNB" ? "Native" : "BEP2";
    case o.BinanceSmartChain:
      return t === "BNB" ? "Native" : "BEP20";
    case o.Ethereum:
      return t === "ETH" ? "Native" : "ERC20";
    case o.Avalanche:
      return t === "AVAX" ? "Native" : "AVAX";
    default:
      return s;
  }
}, T = {
  prefix: "",
  decimalSeparator: ".",
  groupSeparator: ",",
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: " ",
  fractionGroupSize: 0,
  suffix: ""
};
var C = /* @__PURE__ */ ((s) => (s[s.ROUND_DOWN = 0] = "ROUND_DOWN", s[s.ROUND_HALF_UP = 1] = "ROUND_HALF_UP", s[s.ROUND_UP = 2] = "ROUND_UP", s))(C || {}), R = /* @__PURE__ */ ((s) => (s[s.BASE_AMOUNT = 0] = "BASE_AMOUNT", s[s.ASSET_AMOUNT = 1] = "ASSET_AMOUNT", s))(R || {});
const H = {
  [
    0
    /* ROUND_DOWN */
  ]: l.ROUND_DOWN,
  [
    1
    /* ROUND_HALF_UP */
  ]: l.ROUND_HALF_UP,
  [
    2
    /* ROUND_UP */
  ]: l.ROUND_UP
}, G = {
  groupSeparator: "",
  decimalSeparator: "."
};
class r {
  constructor(t, e = 0, n) {
    c(this, "assetAmount");
    c(this, "baseAmount");
    c(this, "decimal");
    this.decimal = n;
    const i = 10 ** n;
    e === 0 ? (this.baseAmount = new l(t), this.assetAmount = this.baseAmount.dividedBy(i)) : (this.assetAmount = new l(t), this.baseAmount = this.assetAmount.multipliedBy(i)), this.baseAmount = new l(this.baseAmount.integerValue(l.ROUND_DOWN));
  }
  static fromMidgard(t) {
    return new r(t || 0, 0, h.THOR);
  }
  static fromBaseAmount(t, e) {
    return new r(t, 0, e);
  }
  static fromAssetAmount(t, e) {
    return new r(t, 1, e);
  }
  static fromNormalAmount(t) {
    return new r(t || 0, 1, 1);
  }
  static sorter(t, e) {
    if (t.decimal !== e.decimal)
      throw new Error("Decimal must be same");
    return t.assetAmount.minus(e.assetAmount).toNumber();
  }
  add(t) {
    return new r(
      this.assetAmount.plus(t.assetAmount),
      1,
      this.decimal
    );
  }
  sub(t) {
    return new r(
      this.assetAmount.minus(t.assetAmount),
      1,
      this.decimal
    );
  }
  mul(t) {
    return t instanceof r ? new r(
      this.assetAmount.multipliedBy(t.assetAmount),
      1,
      this.decimal
    ) : new r(this.assetAmount.multipliedBy(t), 1, this.decimal);
  }
  div(t) {
    return t instanceof r ? new r(
      this.assetAmount.dividedBy(t.assetAmount),
      1,
      this.decimal
    ) : new r(this.assetAmount.dividedBy(t), 1, this.decimal);
  }
  gte(t) {
    return t instanceof r ? this.assetAmount.isGreaterThanOrEqualTo(t.assetAmount) : this.assetAmount.isGreaterThanOrEqualTo(t);
  }
  gt(t) {
    return t instanceof r ? this.assetAmount.isGreaterThan(t.assetAmount) : this.assetAmount.isGreaterThan(t);
  }
  lte(t) {
    return t instanceof r ? this.assetAmount.isLessThanOrEqualTo(t.assetAmount) : this.assetAmount.isLessThanOrEqualTo(t);
  }
  lt(t) {
    return t instanceof r ? this.assetAmount.isLessThan(t.assetAmount) : this.assetAmount.isLessThan(t);
  }
  eq(t) {
    return t instanceof r ? this.assetAmount.isEqualTo(t.assetAmount) : this.assetAmount.isEqualTo(t);
  }
  toSignificant(t = 8, e = 8, n = T, i = 0) {
    return this.toSignificantBigNumber(t, n, i).decimalPlaces(e).toFormat();
  }
  toFixedDecimal(t = 8, e = G, n = 0) {
    if (!Number.isInteger(t))
      throw new Error(`${t} is not an integer.`);
    if (t <= 0)
      throw new Error(`${t} is not positive.`);
    return l.config({ FORMAT: e }), new l(this.assetAmount.toFixed(t, H[n])).toFormat();
  }
  toFixed(t = 8, e = T, n = 0) {
    return this.toFixedDecimal(t, e, n);
  }
  toAbbreviate(t = 2) {
    let e = this.assetAmount.toNumber();
    const n = ["", "K", "M", "B", "T", "Q", "Q", "s"];
    let i = 0;
    for (; e >= 1e3; )
      e /= 1e3, i++;
    return `${e.toFixed(t)}${i > 0 ? ` ${n[i]}` : ""}`;
  }
  toSignificantBigNumber(t = 8, e = T, n = 0) {
    if (!Number.isInteger(t))
      throw new Error(`${t} is not an integer.`);
    if (t <= 0)
      throw new Error(`${t} is not positive.`);
    return l.config({ FORMAT: e }), new l(this.assetAmount.toPrecision(t, H[n]));
  }
}
const J = (s, t = 8, e = 0) => (l.config({ FORMAT: T }), new l(s.toFixed(t, H[e])).toFormat()), k = ({
  liquidityUnits: s,
  poolUnits: t,
  runeDepth: e
}) => r.fromBaseAmount(e, h.THOR).mul(s).div(t), q = ({
  liquidityUnits: s,
  poolUnits: t,
  assetDepth: e
}) => r.fromBaseAmount(e, h.THOR).mul(s).div(t), W = ({
  liquidityUnits: s,
  poolUnits: t,
  runeDepth: e
}) => {
  const n = r.fromMidgard(s), i = r.fromBaseAmount(t, h.THOR), a = r.fromBaseAmount(e, h.THOR), m = n.mul(a), A = i.mul(i).mul(2), u = i.mul(n).mul(2), d = n.mul(n), B = i.mul(i).mul(i);
  return m.mul(A.sub(u).add(d)).div(B);
}, _ = ({
  liquidityUnits: s,
  poolUnits: t,
  assetDepth: e
}) => {
  const n = r.fromMidgard(s), i = r.fromBaseAmount(t, h.THOR), a = r.fromBaseAmount(e, h.THOR), m = n.mul(a), A = i.mul(i).mul(2), u = i.mul(n).mul(2), d = n.mul(n), B = m.mul(A.sub(u).add(d)), S = i.mul(i).mul(i);
  return B.div(S);
}, tt = ({
  percent: s,
  runeDepth: t,
  liquidityUnits: e,
  poolUnits: n
}) => W({ runeDepth: t, liquidityUnits: e, poolUnits: n }).mul(s), st = ({
  percent: s,
  assetDepth: t,
  liquidityUnits: e,
  poolUnits: n
}) => _({ assetDepth: t, liquidityUnits: e, poolUnits: n }).mul(s), et = ({
  liquidityUnits: s,
  poolUnits: t,
  runeDepth: e,
  assetDepth: n,
  percent: i
}) => ({
  assetAmount: q({ liquidityUnits: s, poolUnits: t, assetDepth: n }).mul(i),
  runeAmount: k({ liquidityUnits: s, poolUnits: t, runeDepth: e }).mul(i)
}), nt = ({
  runeDepth: s,
  poolUnits: t,
  assetDepth: e,
  liquidityUnits: n,
  runeAmount: i,
  assetAmount: a
}) => {
  const m = r.fromBaseAmount(s, h.THOR), A = r.fromBaseAmount(e, h.THOR), u = r.fromBaseAmount(t, h.THOR), d = r.fromBaseAmount(i, h.THOR), B = r.fromBaseAmount(a, h.THOR), S = d.mul(A), D = B.mul(m), g = d.mul(B), v = m.mul(A), P = u.mul(S.add(D.add(g.mul(2)))), y = S.add(D.add(v.mul(2))), L = P.div(y), p = r.fromMidgard(n).add(L), F = u.add(p);
  return p.div(F).assetAmount.toNumber();
}, it = ({
  runeAmount: s,
  assetAmount: t,
  runeDepth: e,
  assetDepth: n
}) => {
  const i = r.fromBaseAmount(e, h.THOR), a = r.fromBaseAmount(n, h.THOR), m = r.fromBaseAmount(t, h.THOR), A = r.fromBaseAmount(s, h.THOR), u = m.mul(i).sub(a.mul(A)), d = a.mul(A).add(i.mul(a));
  return u.div(d).assetAmount.absoluteValue().toNumber();
};
var V = /* @__PURE__ */ ((s) => (s.BOND = "BOND", s.DEPOSIT = "+", s.LEAVE = "LEAVE", s.THORNAME_REGISTER = "~", s.UNBOND = "UNBOND", s.UPGRADE = "SWITCH", s.WITHDRAW = "-", s.OPEN_LOAN = "$+", s.CLOSE_LOAN = "$-", s))(V || {});
const X = ({
  symbol: s,
  ticker: t,
  chain: e
}) => e === "ETH" && t !== "ETH" ? `${t}-${s.slice(-3)}` : s, rt = (s, t) => {
  switch (s) {
    case "LEAVE":
    case "SWITCH":
    case "BOND": {
      const { address: e } = t;
      return `${s}:${e}`;
    }
    case "UNBOND": {
      const { address: e, unbondAmount: n } = t;
      return `${s}:${e}:${n * 10 ** 8}`;
    }
    case "~": {
      const { name: e, chain: n, address: i, owner: a } = t;
      return `${s}:${e}:${n}:${i}${a ? `:${a}` : ""}`;
    }
    case "+": {
      const { chain: e, symbol: n, address: i, singleSide: a } = t;
      return a ? `${s}:${e}/${n}::t:0` : `${s}:${e}.${n}${i ? `:${i}` : ""}`;
    }
    case "-": {
      const { chain: e, ticker: n, symbol: i, basisPoints: a, targetAssetString: m, singleSide: A } = t, u = !A && m ? `:${m}` : "", d = X({ chain: e, symbol: i, ticker: n });
      return `${s}:${e}${A ? "/" : "."}${d}:${a}${u}`;
    }
    case "$+":
    case "$-": {
      const { asset: e, address: n } = t;
      return `${s}:${e}:${n}`;
    }
    default:
      return "";
  }
}, z = (s, t) => s === o.Bitcoin ? "Bitcoin" : s === o.Doge ? "Dogecoin" : s === o.Litecoin ? "Litecoin" : s === o.BitcoinCash ? "Bitcoin Cash" : s === o.Ethereum && t === "ETH" ? "Ethereum" : t, ot = (s) => {
  if (s < 0)
    throw new Error("Invalid number of year");
  return 10 + s;
}, at = (s) => {
  if (s.length > 30)
    return !1;
  const t = /^[a-zA-Z0-9+_-]+$/g;
  return !!s.match(t);
}, w = class {
  constructor(t, e, n = !1, i) {
    c(this, "chain");
    c(this, "symbol");
    c(this, "ticker");
    c(this, "type");
    c(this, "network");
    c(this, "name");
    c(this, "decimal");
    c(this, "isSynth", !1);
    c(this, "L1Chain");
    c(this, "setDecimal", (t) => {
      this.decimal = t || h[this.chain] || h.THOR;
    });
    this.chain = t, this.symbol = e.toUpperCase(), this.ticker = i || e.toUpperCase().split("-")[0], this.type = I(t, this.ticker, n), this.name = n ? `Synth ${this.ticker}` : this.ticker, this.network = z(t, this.ticker), this.decimal = n ? h.THOR : h[t], this.isSynth = n, this.L1Chain = n ? o.THORChain : t;
  }
  static fromAssetString(t) {
    var u;
    if (!t)
      return null;
    const e = t.includes("/"), [n, ...i] = t.split(e ? "/" : "."), a = i.join("."), m = (u = a == null ? void 0 : a.split("-")) == null ? void 0 : u[0];
    return n && a && m ? new w(n, a, e) : null;
  }
  getAssetObj() {
    if (this.isSynth) {
      const t = `${this.chain.toLowerCase()}/${this.symbol.toLowerCase()}`;
      return {
        chain: o.THORChain,
        symbol: t,
        ticker: t
      };
    }
    return { chain: this.chain, symbol: this.symbol, ticker: this.ticker };
  }
  /**
   * convert asset entity to string
   * @returns L1 asset -> btc.btc, Synth asset -> btc/btc
   */
  toString() {
    return `${this.chain}${this.isSynth ? "/" : "."}${this.symbol}`;
  }
  toURLEncoded() {
    return `${this.isSynth ? "THOR." : ""}${this.chain}.${this.symbol}`;
  }
  // full compare chain, symbol, synth
  eq(t) {
    return this.chain === t.chain && this.symbol.toUpperCase() === t.symbol.toUpperCase() && this.ticker.toUpperCase() === t.ticker.toUpperCase() && this.isSynth === t.isSynth;
  }
  // compare chain, symbol but not synth
  shallowEq(t) {
    return this.chain === t.chain && this.symbol.toUpperCase() === t.symbol.toUpperCase() && this.ticker.toUpperCase() === t.ticker.toUpperCase();
  }
  isRUNE() {
    return this.eq($(o.THORChain));
  }
  identifier() {
    return `${this.chain}.${this.symbol}`;
  }
  toSynth() {
    return this.isSynth ? this : new w(o.THORChain, `${this.chain}/${this.symbol}`, !0);
  }
};
let f = w;
/**
 *
 * @param urlEncodedAsset asset string from url
 * @returns btc.btc -> btc.btc, thor.btc.btc -> btc/btc
 */
c(f, "decodeFromURL", (t) => {
  var n, i, a;
  let e = t.toUpperCase();
  return e.startsWith("THOR.") && ((n = e.split("THOR.")) == null ? void 0 : n[1]) !== "RUNE" && (e = (a = (i = e.split("THOR.")) == null ? void 0 : i[1]) == null ? void 0 : a.replace(".", "/")), w.fromAssetString(e);
});
const j = "THOR-0XA5F2211B9B8170F694421F2046281775E8468044", Y = "RUNE-0X3155BA85D5F96B2D030A4966AF206230E46849CB", O = {}, $ = (s) => {
  if (O[s])
    return O[s];
  switch (s) {
    case o.Avalanche:
    case o.Binance:
    case o.BitcoinCash:
    case o.Bitcoin:
    case o.Doge:
    case o.Ethereum:
    case o.Litecoin: {
      const t = new f(s, s);
      return O[s] = t, t;
    }
    case o.BinanceSmartChain: {
      const t = new f(o.BinanceSmartChain, o.Binance);
      return t.setDecimal(18), O[s] = t, t;
    }
    case o.Cosmos: {
      const t = new f(o.Cosmos, N.ATOM, !1, N.ATOM);
      return O[s] = t, t;
    }
    case o.THORChain: {
      const t = new f(o.THORChain, N.RUNE, !1, N.RUNE);
      return O[s] = t, t;
    }
    case "USD": {
      const t = new f(o.THORChain, "USD-USD", !1, "USD-USD");
      return O[s] = t, t;
    }
    case "ETH_THOR": {
      const t = new f(o.Ethereum, j);
      return t.setDecimal(18), O[s] = t, t;
    }
    case "BNB_RUNE": {
      const t = new f(o.Binance, "RUNE-B1A");
      return O[s] = t, t;
    }
    case "ETH_RUNE": {
      const t = new f(o.Ethereum, Y);
      return t.setDecimal(18), O[s] = t, t;
    }
    default:
      return new f(o.THORChain, N.RUNE, !1, N.RUNE);
  }
}, ut = (s) => s.eq($(s.chain)), U = (s, t) => t.find((e) => s.shallowEq(e.asset));
class Q extends r {
  constructor({
    baseAsset: e,
    quoteAsset: n,
    unitPrice: i,
    pools: a,
    priceAmount: m
  }) {
    const A = r.fromAssetAmount(
      m ? m.assetAmount : 1,
      e.decimal
    );
    super(A.assetAmount, R.ASSET_AMOUNT, e.decimal);
    c(this, "baseAsset");
    c(this, "quoteAsset");
    c(this, "unitPrice");
    c(this, "price");
    c(this, "amount");
    if (this.amount = A, this.baseAsset = e, this.quoteAsset = n, i !== void 0)
      this.unitPrice = i, this.price = A.assetAmount.multipliedBy(i);
    else {
      if (!a)
        throw new Error("Pools must be provided if unitPrice omitted");
      if (this.unitPrice = new l(0), n)
        if (e.isRUNE() && !n.isRUNE()) {
          const u = U(n, a);
          u && (this.unitPrice = u.runePriceInAsset.assetAmount);
        } else if (!e.isRUNE() && n.isRUNE()) {
          const u = U(e, a);
          u && (this.unitPrice = u.assetPriceInRune.assetAmount);
        } else if (!e.isRUNE() && !n.isRUNE()) {
          const u = U(e, a), d = U(n, a);
          u && d && (this.unitPrice = u.assetPriceInRune.div(
            d.assetPriceInRune
          ).assetAmount);
        } else
          this.unitPrice = new l(1);
      else if (e.isRUNE()) {
        const u = a == null ? void 0 : a[0];
        u && (this.unitPrice = u.runePriceInAsset.mul(u.assetUSDPrice).assetAmount);
      } else {
        const u = U(e, a);
        u && (this.unitPrice = u.assetUSDPrice.assetAmount);
      }
      this.price = this.unitPrice.multipliedBy(A.assetAmount);
    }
  }
  raw() {
    return this.price;
  }
  invert() {
    return new l(1).dividedBy(this.raw());
  }
  toCurrencyFormat(e = 8, n = !0) {
    var m;
    const i = n ? this.toAbbreviateRaw(e) : this.toFixedRaw(e);
    return !this.quoteAsset || this.quoteAsset.ticker === "USD" ? `$${i}` : `${i} ${(m = this.quoteAsset) == null ? void 0 : m.ticker}`;
  }
  toAbbreviateRaw(e = 2) {
    return r.fromAssetAmount(this.price, 8).toAbbreviate(e);
  }
  toFixedRaw(e = 8, n = T, i = C.ROUND_DOWN) {
    return r.fromAssetAmount(this.price, 8).toFixed(e, n, i);
  }
  toFixedInverted(e = 8, n = T, i = C.ROUND_DOWN) {
    return r.fromAssetAmount(this.invert(), 8).toFixed(e, n, i);
  }
}
class E extends r {
  constructor(e, n) {
    super(n.assetAmount, R.ASSET_AMOUNT, e.decimal);
    c(this, "asset");
    c(this, "amount");
    this.asset = e, this.amount = new r(n.assetAmount, R.ASSET_AMOUNT, e.decimal);
  }
  add(e) {
    if (!this.asset.shallowEq(e.asset))
      throw new Error("asset must be same");
    return new E(this.asset, this.amount.add(e.amount));
  }
  sub(e) {
    if (!this.asset.shallowEq(e.asset))
      throw new Error("asset must be same");
    return new E(this.asset, this.amount.sub(e.amount));
  }
  mul(e) {
    let n;
    return e instanceof r ? n = new r(
      this.assetAmount.multipliedBy(e.assetAmount),
      R.ASSET_AMOUNT,
      this.decimal
    ) : n = new r(
      this.assetAmount.multipliedBy(e),
      R.ASSET_AMOUNT,
      this.decimal
    ), new E(this.asset, n);
  }
  div(e) {
    let n;
    return e instanceof r ? n = new r(
      this.assetAmount.dividedBy(e.assetAmount),
      R.ASSET_AMOUNT,
      this.decimal
    ) : n = new r(this.assetAmount.dividedBy(e), R.ASSET_AMOUNT, this.decimal), new E(this.asset, n);
  }
  toCurrencyFormat({
    significantDigits: e,
    format: n,
    rounding: i
  } = {
    significantDigits: 6,
    format: T,
    rounding: C.ROUND_DOWN
  }, a = !1) {
    const m = super.toSignificant(e, 8, n, i);
    return a ? `${this.asset.ticker} ${m}` : `${m} ${this.asset.ticker}`;
  }
  totalPriceIn(e, n) {
    return new Q({
      baseAsset: this.asset,
      quoteAsset: e,
      pools: n,
      priceAmount: r.fromAssetAmount(this.assetAmount, this.decimal)
    });
  }
}
const ct = (s) => {
  const t = $(s), e = [o.Bitcoin, o.Litecoin, o.BitcoinCash].includes(s) ? (
    // 10001 satoshi
    10001
  ) : [o.Doge].includes(s) ? (
    // 1 DOGE
    100000001
  ) : [o.Avalanche, o.Ethereum].includes(s) ? (
    //  10 gwei
    10 * 10 ** 9
  ) : s === o.THORChain ? (
    // 0 RUNE
    0
  ) : 1;
  return new E(t, r.fromBaseAmount(e, t.decimal));
};
class b {
  constructor(t, e, n, i) {
    c(this, "asset");
    c(this, "runeDepth");
    c(this, "assetDepth");
    c(this, "assetUSDPrice");
    c(this, "detail");
    this.asset = t, this.runeDepth = e, this.assetDepth = n, this.detail = i, this.assetUSDPrice = r.fromAssetAmount(i.assetPriceUSD, h.THOR);
  }
  static fromPoolData(t) {
    const { asset: e, runeDepth: n, assetDepth: i } = t, a = f.fromAssetString(e);
    if (a && n && i) {
      const m = r.fromBaseAmount(n, h.THOR), A = r.fromBaseAmount(i, h.THOR);
      return new b(a, m, A, t);
    }
    return null;
  }
  get assetPriceInRune() {
    return this.runeDepth.div(this.assetDepth);
  }
  get runePriceInAsset() {
    return this.assetDepth.div(this.runeDepth);
  }
}
export {
  r as Amount,
  R as AmountType,
  E as AssetAmount,
  f as AssetEntity,
  T as BN_FORMAT,
  G as EMPTY_FORMAT,
  V as MemoType,
  b as Pool,
  Q as Price,
  C as Rounding,
  J as formatBigNumber,
  q as getAssetShare,
  I as getAssetType,
  _ as getAsymmetricAssetShare,
  st as getAsymmetricAssetWithdrawAmount,
  W as getAsymmetricRuneShare,
  tt as getAsymmetricRuneWithdrawAmount,
  nt as getEstimatedPoolShare,
  it as getLiquiditySlippage,
  rt as getMemoFor,
  ct as getMinAmountByChain,
  z as getNetworkName,
  k as getRuneShare,
  $ as getSignatureAssetFor,
  et as getSymmetricWithdraw,
  ot as getTHORNameCost,
  ut as isGasAsset,
  at as validateTHORName
};
//# sourceMappingURL=index.es.js.map

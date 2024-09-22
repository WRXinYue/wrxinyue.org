---
title: Atan2
lang: en
type: note
---

[[toc]]

# Atan2

According to Kiwi on [Wikipedia](https://wikipedia.org/wiki/Atan2#East-counterclockwise,_north-clockwise_and_south-clockwise_conventions,_etc.), different conventions for the `atan2` function can be achieved by manipulating the positions and signs of the x- and y-arguments.

By changing the sign of the x- and/or y-arguments and/or swapping their positions, we can create **8 possible variations** of the `atan2` function. Interestingly, these variations correspond to 8 distinct definitions of angles, which can be defined as clockwise or counterclockwise starting from each of the 4 [cardinal directions](https://en.wikipedia.org/wiki/Cardinal_direction): north, east, south, and west.

## atan2(y, x)

$$
θ = atan2(y2 - y1, x2 - x1) * 180 / π
$$

<Compass north="N" east="E" south="S" west="W" />

```js
N = 90
S = -90
W = -180
E = 0
```

## atan2(-y, x)

$$
θ = atan2(-(y2 - y1), x2 - x1) * 180 / π
$$

<Compass north="S" east="E" south="N" west="W" />

```js
N = -90
S = 90
W = -180
E = 0
```

## atan2(y, -x)

$$
θ = atan2(y2 - y1, -(x2 - x1)) * 180 / π
$$

<Compass north="N" east="W" south="S" west="E" />

```js
N = 90
S = -90
W = 0
E = 180
```

## atan2(-y, -x)

$$
θ = atan2(-(y2 - y1), -(x2 - x1)) * 180 / π
$$

<Compass north="S" east="W" south="N" west="E" />

```js
N = -90
S = 90
W = 0
E = -180
```

## atan2(x, y)

$$
θ = atan2(x2 - x1, y2 - y1) * 180 / π
$$

<Compass north="E" east="N" south="W" west="S" />

```js
N = 0
S = 180
W = -90
E = 90
```

## atan2(-x, y)

$$
θ = atan2(-(x2 - x1), y2 - y1) * 180 / π
$$

<Compass north="W" east="N" south="E" west="S" />

```js
N = 0
S = -180
W = 90
E = -90
```

## atan2(x, -y)

$$
θ = atan2(x2 - x1, -(y2 - y1)) * 180 / π
$$

<Compass north="E" east="S" south="W" west="N" />

```js
N = 180
S = 0
W = -90
E = 90
```

## atan2(-x, -y)

$$
θ = atan2(-(x2 - x1), -(y2 - y1)) * 180 / π
$$

<Compass north="W" east="S" south="E" west="N" />

```js
N = -180
S = 0
W = 90
E = -90
```

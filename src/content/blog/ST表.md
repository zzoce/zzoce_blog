---
title: "ST表"
description: "通过花费较高的预处理实现后续以O(1)的复杂度完成区间查询问题"
pubDate: Oct 03 2024
image: /image/index.webp
categories:
  - 算法
tags:
  - 数据结构
  - ST表
badge: zzcoe
---

# **ST 表简介：**
ST 算法（Sparse Table Algorithm，稀疏表算法）是一种用于解决区间查询问题（如区间最小值、最大值、最大公约数等问题）的数据结构。ST 算法的核心优势在于它能够在预处理阶段花费较高的时间和空间成本（预处理时间复杂度为 $O(n\log n)$，空间复杂度也是 $O(n\log n)$），以实现后续的每次查询操作都能在 $O(1)$ 时间内完成。

### 工作原理

ST 算法的基本思想是预处理输入数组，构建一个稀疏表，这个表存储了所有可能的区间查询的结果。具体来说，对于一个长度为 $n$ 的数组，它预处理出一个二维数组 `dp[i][j]`，其中 `i` 是数组的索引，`j` 是一个表示区间长度的指数，`dp[i][j]` 存储了从索引 `i` 开始，长度为 $2^j$ 的子数组的查询结果（例如，最小值、最大值等）。

### 预处理

预处理阶段的目标是填充这个二维数组。首先，对于所有的 `i`，`dp[i][0]` 被初始化为数组本身的值，因为 $2^0 = 1$，即长度为 1 的区间的查询结果就是元素本身。然后，对于 `j > 0`，我们可以利用之前计算的结果来计算更长区间的查询结果，具体计算方法依赖于查询类型。例如，对于最小值查询，我们有：

$$
dp[i][j] = \min(dp[i][j-1], dp[i + 2^{j-1}][j-1])
$$

这个公式的含义是，长度为 $2^j$ 的区间的最小值可以通过两个长度为 $2^{j-1}$ 的子区间的最小值来计算。
![Pasted image 20240327143754](https://zzoce.obs.cn-north-4.myhuaweicloud.com/img/Pasted%20image%2020240327143754.png)

### 查询

当预处理完成后，任何区间的查询都可以快速完成。给定查询区间 `[L, R]`，我们可以找到最大的 `k`，使得 $2^k \leq R - L + 1$，然后区间 `[L, R]` 的查询结果可以由两个重叠或相邻的子区间的查询结果合并得到。对于最小值查询，查询过程如下：

$$
\text{查询结果} = \min(dp[L][k], dp[R - 2^k + 1][k])
$$
![Pasted image 20240327145101](https://zzoce.obs.cn-north-4.myhuaweicloud.com/img/Pasted%20image%2020240327145101.png)

### 应用

ST 算法特别适合于静态数据的区间查询问题，即数据在预处理之后不会再发生变化。它在处理如 RMQ（Range Minimum/Maximum Query，区间最小/最大查询）、区间最大公约数查询等问题时非常高效。

### 优缺点

- **优点**：查询速度快，每次查询时间复杂度为 $O(1)$。
- **缺点**：预处理时间和空间复杂度较高，不适合数据频繁变化的场景。

ST 算法是解决特定类型的区间查询问题的一个非常有效的工具，尤其在数据静态且查询操作频繁的应用场景中。


### 模板题
[P3865 【模板】ST 表 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/P3865)
```cpp
#include<iostream>
#include <queue>
#include <cstring>
#include <cmath>
#define ll long long
using namespace std;
const int maxn=1e5+5;
ll f[maxn][64];
int main ()
{
	int n,m;
	n=read(),m=read();
	for (int i=1;i<=n;i++){
		f[i][0]=read();
	}	
	for (int j=1;j<=20;j++){
		for (int i=1;i+(1<<j)-1<=n;i++){
			f[i][j]=max(f[i][j-1],f[i+(1<<(j-1))][j-1]); 
		}
	}
	int l,r;
	for (int i=1;i<=m;i++){
		l=read(),r=read();
		int k=log2(r-l+1);
		printf("%ld\n",max(f[l][k],f[r-(1<<k)+1][k]));
	}
	return 0;
}
```





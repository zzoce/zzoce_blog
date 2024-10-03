---
title: "线性DP"
description: "公共子序列问题"
pubDate: Oct 03 2024
image: /image/index.webp
categories:
  - 笔记
tags:
  - 数据结构
badge: zzcoe
---

# 最长上升子序列 LIS
## 方法一时间复杂度 O (N^2)
[B3637 最长上升子序列 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/B3637)
```cpp
int cnt=0;
    for (int i=1;i<=n;i++){
        dp[i]=1;
        for (int j=1;j<i;j++){
            if (mp[j]<mp[i]){
                dp[i]=max(dp[i],dp[j]+1);
                cnt=max(cnt,dp[i]);
            }
        }
    }
    cout<<cnt<<endl;
```
## 方法二时间复杂度 O (NlogN)
用 `f[len]` 表示**所有长度为 `len` 的序列最大值（即序列的最后一位）的最小值**，因此可知 `f` 数组呈现严格递增趋势。如果新的 `mp[i]` 大于 `f[len]` 则长度为 len 的序列加一，即维护 `f[len+1]` 的值，使它保持最小。
如何找到这样的 `f[len]` 呢？因为 `f` 严格递增，所以用**二分的方法找小于 `mp[i]` 的最大值（上升子序列，不下降则小于等于）**，然后对它的下一位也就是 `f[len+1]` 进行操作。
[B3637 最长上升子序列 - 洛谷 | 计算机科学教育新生态 (luogu.com.cn)](https://www.luogu.com.cn/problem/B3637)
```cpp
#include <iostream>
#include <string>
#include <cmath>
using namespace std;
int n;
int mp[5500];
struct node {
	int num,len;
};
node f[5500];
int Len=0;
int dic(int l,int r,int x){
	while (l<r){
		int mid=(l+r+1)/2;
		if (f[mid].num<x){
			l=mid;
		}else {
			r=mid-1;
		}
	}
	return l;
}
int main (){
	for (int i=0;i<5500;i++){
		f[i].num=10000000;//初始化一个很大的值
	}
	f[0].num=0;//初始化一个很小的值，因为要找小于mp[i]的位置。
	f[0].len=0;
	cin>>n;
	for (int i=1;i<=n;i++){
		cin>>mp[i];
			int len=dic (0,Len,mp[i]);
			//lower_bound返回首个不小于Mdp的迭代器
			//int low= lower_bound(dp+1,dp+n+1,Mdp)-dp;
			//lower_bound返回首个大于Mdp的迭代器
			//int low= upper_bound(dp+1,dp+n+1,Mdp)-dp;
			if (f[len+1].num>mp[i]){
				f[len+1].num=mp[i];
				f[len+1].len=f[len].len+1;
			}
  			Len=max(Len,f[len+1].len);
	}
	cout<<Len<<endl;
}
```
## 以最小输入顺序输出最长不下降子序列
`num[i]` 相当于数组链表，`num[i]` 表示以 `i` 为结尾的序列上一个位置的下标，且**仅在序列增长时更新**`num[i]` 来保证是最小输入顺序
```cpp
for (int i=1;i<=n;i++){  
    cin>>mp[i];  
}  
for (int i=1;i<=n;i++){  
    dp[i]=1;  
    for (int j=1;j<i;j++){  
        if (mp[j]<=mp[i]&&dp[i]<dp[j]+1){  //不能是dp[i]<=dp[j]+1，等于时修改就不是最小输入顺序了
            dp[i]=dp[j]+1;  
            num[i]=j;  
        }  
        Mdp=max(Mdp,dp[i]);
    }  
} 
//lower_bound返回不小于Mdp的最小值的迭代器
int low= lower_bound(dp+1,dp+n+1,Mdp)-dp;
int t=0;  
while(low){  
    cnt[++t]=mp[low];  
    low=num[low];  
}  
for (int i=t;i>=1;i--){  
    cout<<cnt[i]<<" ";  
}
```
## 以最小字典序输出最小不下降子序列
```Cpp
for (int i=1;i<100;i++){  
    d[i]=INT_MAX;  
}  
for (int i=1;i<=n;i++){  
    cin >> num;  
    int low= lower_bound(d+1,d+1+n, num) - d;  
    string str= to_string(num);  
    f[low]=f[low-1]+" "+str; //f为字符串数组
    d[low]=num;  
    MAX=max(MAX, low);  
}  
for (int i=1;i<f[MAX].size();i++){  
    cout<<f[MAX][i];  
}
//输入
//10
//21 11 2221 95 75 456 7852 1024 356482 452111
//输出
//11 75 456 1024 356482 452111
```


# 最长公共子序列 LCS
给定一个长度为 `n` 的序列 A，和一个长度为 `m` 的序列 B（n，m<=5000），求出一个最长的序列，使得该序列既是 A 的子序列，也是 B 的子序列。

`f[i][j]` 表示 A 的前 `i` 个元素与 B 的前 `j` 个元素的最长公共子序列,**时间复杂度 O (NM)**
```cpp
int a[MAXN], b[MAXM], f[MAXN][MAXM];

int dp() {
  for (int i = 1; i <= n; i++){
	  for (int j = 1; j <= m; j++){
		  if (a[i] == b[j]){
			f[i][j] = f[i - 1][j - 1] + 1;
		  }else{
			f[i][j] = max(f[i - 1][j], f[i][j - 1]);
			}
	  }
  }
  return f[n][m];
}
```
## 输出
这段代码首先创建了一个二维数组 `dp` 来存储两个字符串的最长公共子序列的长度。然后，通过比较两个字符串的字符来填充这个数组。如果字符相同，那么这个位置的值就是左上角的值加一；如果字符不同，那么这个位置的值就是左边和上边的最大值。

最后，从右下角开始回溯，如果当前字符相同，那么就将这个字符加入到结果字符串中，并向左上角移动；如果当前字符不同，那么就向值较大的方向移动。直到回溯到左上角，得到的字符串就是最长公共子序列。

时间复杂度 O (mn)，空间复杂度 O (mn)
```cpp
string LCS(string X, string Y) {
    int m = X.size();
    int n = Y.size();
    int dp[m+1][n+1];
    for (int i=0; i<=m; i++) {
        for (int j=0; j<=n; j++) {
            if (i == 0 || j == 0)
                dp[i][j] = 0;
            else if (X[i-1] == Y[j-1])
                dp[i][j] = dp[i-1][j-1] + 1;
            else
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    }

    int index = dp[m][n];
    string lcs(index+1, '\0');
    int i = m, j = n;
    while (i > 0 && j > 0) {
        if (X[i-1] == Y[j-1]) {
            lcs[index-1] = X[i-1];
            i--; j--; index--;
        }
        else if (dp[i-1][j] > dp[i][j-1])
            i--;
        else
            j--;
    }

    return lcs;
}
```

# 最长公共上升子序列
算法竞赛进阶指南 P 241
```cpp
For (int i=1; i<=n; i++){
	Int val;
	For (int j=1; j<=m; j++){
		If (a[i]==b[j]){
			F[i][j]=val+1;
		}else {
			F[i][j]=f[i-1][j];
		}
		If (b[j]<a[i]){
			Val=max (val, f[i-1][j]);
		}
	}
}
```


# 最长连续公共子序列
求解最长连续公共子序列（Longest Common Substring, LCSq）的问题可以通过动态规划来解决。这里提供一个 C++的实现示例：

```cpp
#include <iostream>
#include <vector>
#include <string>

Using namespace std;

// 函数用于找到两个字符串的最长连续公共子序列
String longestCommonSubstring (const string& str 1, const string& str 2) {
    Int m = str 1.Size ();
    Int n = str 2.Size ();

    // 创建一个二维动态规划表，所有值初始化为 0
    vector<vector<int>> dp (m + 1, vector<int>(n + 1, 0));
    Int maxLength = 0; // 最长连续公共子序列的长度
    Int endIndex = 0; // 最长连续公共子序列在 str 1 中的结束索引

    // 填充动态规划表
    For (int i = 1; i <= m; ++i) {
        For (int j = 1; j <= n; ++j) {
            // 当前字符匹配
            If (str 1[i - 1] == str 2[j - 1]) {
                Dp[i][j] = dp[i - 1][j - 1] + 1;
                // 更新最长连续公共子序列的信息
                If (dp[i][j] > maxLength) {
                    MaxLength = dp[i][j];
                    EndIndex = i - 1;
                }
            }
            // 不匹配时不需要特别操作，因为我们关注的是连续子序列
        }
    }

    // 根据最长长度和结束索引回溯找到子序列
    Return str 1.Substr (endIndex - maxLength + 1, maxLength);
}

Int main () {
    String str 1 = "ABABC";
    String str 2 = "BABCA";
    String lcsq = longestCommonSubstring (str 1, str 2);

    Cout << "The longest common substring is: " << lcsq << endl;
    Return 0;
}
```

### 代码解释：

1. **初始化**：我们创建了一个二维数组`dp`，其中`dp[i][j]`表示`str 1`的前`i`个字符和`str 2`的前`j`个字符之间的最长连续公共子序列的长度。所有元素初始化为 0。

2. **动态规划填表**：遍历两个字符串，当我们发现两个字符`str 1[i-1]`和`str 2[j-1]`相等时，我们将`dp[i][j]`设置为`dp[i-1][j-1] + 1`，表示找到了一个长度更长的连续公共子序列。同时，我们更新最长长度`maxLength`和子序列在`str 1`中的结束索引`endIndex`。

3. **回溯**：根据`maxLength`和`endIndex`，我们可以通过`substr`函数直接从`str 1`中提取出最长连续公共子序列。

4. **输出**：最后，程序打印出找到的最长连续公共子序列。

这种方法能够有效地找到两个字符串之间的最长连续公共子序列，其时间复杂度和空间复杂度均为\(O (mn)\)，其中\(m\) 和\(n\) 分别是两个字符串的长度。

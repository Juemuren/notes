---
title: SQLite
---

## 简介

SQLite 是一个轻量级的关系型数据库，适合作为命令行工具来处理数据，或作为库嵌入应用程序中

## 对比

相比于那些 **客户端 - 服务端** 架构的数据库，SQLite 有很多不同的地方

- 单文件存储。整个数据库内容都存储在一个文件中
- 零配置。不需要安装、配置数据库服务器，单个程序/库就可以直接使用
- 访问快。直接访问本地文件，不需要进程间通信/网络通信

`DuckDB` 和 SQLite 有着相同的架构，主要区别是

- SQLite 是 **OLTP（在线事务处理）** 数据库，适合需要高频写入的事务处理场景；而 DuckDB 是 **OLAP（在线分析处理）** 数据库，适合需要数据分析和复杂查询的场景
- SQLite 是 **行式存储**，而 DuckDB 是 **列式存储**
- SQLite 生态成熟，而 DuckDB 生态还比较新

## 安装

SQLite 作为命令行工具，可以通过系统包管理器安装

```sh
# Windows
scoop install sqlite3
```

SQLite 作为库，可以通过语言包管理器将其集成到应用程序中。大多数语言都有 SQLite 的接口绑定

## 使用

本部分只专注于 SQLite 作为命令行工具的用法，更详细的说明请阅读 [官方文档](https://sqlite.org/docs.html)。

运行 `sqlite3` 就可以进入数据库的交互式界面，这个交互界面可以使用 **点命令** 和 **SQL**。输入 `.help` 就能看到点命令的帮助，输入 `.quit` 可以退出这个界面。

### 基本使用

读取/保存数据文件

```sql
-- 从文件中读取数据
.open example.db
-- 将数据保存为文件
.save new_example.db
-- 查看当前打开的文件
.database
```

查看表信息

```sql
-- 列出所有表
.tables
-- 查看表的模式
.schema users
-- 查看表的索引
.indexes users
```

### 运行 SQL

```sql
-- 创建表
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT
);

-- 插入数据
INSERT INTO users VALUES(1,'Alice','alice@example.com');
INSERT INTO users VALUES(2,'Bob','bob@example.com');

-- 查询数据
SELECT * FROM users;
SELECT email FROM users WHERE name = 'Bob';

-- 修改数据
UPDATE users
SET email = 'new@example.com'
WHERE name = 'Bob';
```

或者不使用交互界面，直接命令行里运行

```sh
# 运行单条 SQL 语句
sqlite3 example.db "SELECT * FROM users;"
# 运行已保存的 SQL 脚本
sqlite3 example.db < query.sql
# pwsh 不支持 < 重定向，用管道替代
cat query.sql | sqlite3 example.db
```

### 转储 SQL

```sql
-- 将整个数据库备份为 SQL
.output example_backup.sql
.dump
.output stdout

-- 从 SQL 中重建数据库
.read example_backup.sql
```

或者不使用交互界面，直接进行备份

```sh
# 将数据备份为 SQL
sqlite3 example.db ".dump" > example_backup.sql
# 从 SQL 中恢复数据
sqlite3 new_example.db < example_backup.sql
# 若 Shell 不支持 < 重定向可使用管道替代
cat example_backup.sql | sqlite3 new_example.db
```

### 处理 CSV

```sql
-- 从 CSV 中导入数据
.mode csv
.import users.csv users
-- 或者跳过表头
.import --skip 1 users.csv users

-- 将查询结果保存为 CSV
.mode csv
.once data.csv
SELECT * FROM users;
```

或者不使用交互界面，直接将查询结果保存为 CSV

```sh
sqlite3 -header -csv example.db "SELECT * FROM users" > output.csv
```

### 处理 JSON

```sql
-- 从 JSON 中导入数据
.mode json
.import users.json users

-- 将查询结果保存为 JSON
.mode json
.once data.json
SELECT * FROM users;
```

或者不使用交互界面，直接将查询结果保存为 JSON

```sh
sqlite3 -json example.db "SELECT * FROM users" > output.json
```

此外 SQLite 还能够处理 Markdown、HTML 等格式的数据，用法都是类似的

## 示例

我想要统计游戏中的芯片数量，以了解该优先刷取哪个副本。首先准备一个 `chips.csv` 文件

```csv
职业,芯片类型,数量
先锋,小,7
先锋,大,9
辅助,小,15
辅助,大,15
狙击,小,13
狙击,大,13
术师,小,8
术师,大,9
近卫,小,10
近卫,大,11
特种,小,8
特种,大,10
重装,小,10
重装,大,11
医疗,小,11
医疗,大,13
```

有了 CSV 文件后需要将其导入数据库。这些 SQL 语句和操作保存在 `chip_import.sql` 文件里，通过 `sqlite3 chips.db < chips_import.sql` 来执行

```sql
-- 创建表
CREATE TABLE IF NOT EXISTS chips (
    职业 TEXT NOT NULL,
    芯片类型 TEXT NOT NULL,
    数量 INTEGER NOT NULL,
    UNIQUE(职业, 芯片类型)
);

-- 导入 CSV 数据
.mode csv
.import --skip 1 chips.csv chips
```

接着编写查询。这里结合了一些游戏内的逻辑，包括

- 游戏内的副本可能掉落两种芯片，并且这两种芯片之间可以互相转换，因此需要分组进行查询
- 游戏中干员精一需要 5 个小芯片，精二需要 8 个大芯片，因此需要筛选出紧缺的芯片

```sql
-- 查询小芯片
SELECT *
FROM chips
WHERE 芯片类型 = '小'
ORDER BY 数量 DESC;

-- 查询合并的小芯片
SELECT
    CASE
        WHEN 职业 IN ('先锋', '辅助') THEN '先锋 + 辅助'
        WHEN 职业 IN ('狙击', '术师') THEN '狙击 + 术师'
        WHEN 职业 IN ('近卫', '特种') THEN '近卫 + 特种'
        WHEN 职业 IN ('重装', '医疗') THEN '重装 + 医疗'
    END AS 组合,
    芯片类型,
    SUM(数量) AS 总数
FROM chips
WHERE 芯片类型 = '小'
GROUP BY 组合
ORDER BY 总数 DESC;

-- 查询紧缺的小芯片
SELECT *
FROM chips
WHERE
    芯片类型 = '小' AND 数量 < 5
ORDER BY 数量 DESC;
```

对大芯片的查询是类似的

```sql
SELECT *
FROM chips
WHERE 芯片类型 = '大'
ORDER BY 数量 DESC;
```

然后是更新数据。目前已经可以使用如下方式更新数据库

1. 修改 `chips.csv` 文件
2. 删除 `chips.db` 文件
3. 重新将 `chips.csv` 导入 `chips.db`，即再次运行 `sqlite3 chips.db < chips_import.sql`

当然也可以直接在数据库上进行更新。

一种方式是先运行 `sqlite3 chips.db` 打开数据库文件，再交互地运行 SQL 语句

```sql
-- +1 重装 大 芯片
UPDATE chips
SET 数量 = 数量 + 1
WHERE 职业 = '重装' AND 芯片类型 = '大';
```

另一种方式是将更新操作封装为一个脚本。比如使用 [just](../命令行工具/Just.md)，把任务写在 `Justfile` 里，运行 `just update <职业> <芯片类型> <增减量>` 执行更新操作

```justfile
DB := "chips.db"

update job type increment:
    sqlite3 "{{DB}}" "UPDATE chips SET 数量 = 数量 {{increment}} WHERE 职业 = '{{job}}' AND 芯片类型 = '{{type}}'"
    sqlite3 "{{DB}}" "SELECT * FROM chips WHERE 职业 = '{{job}}' AND 芯片类型 = '{{type}}'"
```

用 SQL 进行更新后，可以导出为 `chips.csv` 从而实现同步

```sh
sqlite3 -header -csv chips.db "SELECT * FROM chips" > chips.csv
```

---

不过对于上述场景，使用 DuckDB 可能更合适。毕竟这里没有高频写入，只需要处理复杂查询，而 DuckDB 就是为数据分析设计的。

DuckDB 可以根据 CSV 文件自动创建表，因此导入和查询 CSV 文件都非常简单

```sql
-- 查询所有芯片
SELECT * FROM chips.csv;
```

写成一行的脚本就是

```sh
duckdb -c "SELECT * FROM chips.csv"
```

或者也可以

```sh
duckdb chips.csv -c "SELECT * FROM file"
```

如果使用后一种方法，那么可以把所有查询逻辑保存在一个 SQL 文件里，然后对不同的 CSV 文件应用相同的查询逻辑

比如将以下内容保存为 `small_query.sql`，然后可以使用 `duckdb chips.csv -f small_query.sql` 进行查询

```sql
-- 查询小芯片
SELECT *
FROM file
WHERE 芯片类型 = '小'
ORDER BY 数量 DESC;
```

![IceWarp Infra](https://blog.icewarp.com/wp-content/uploads/2022/08/IW-Logo-Wide-4x.png)

# APPENDIX

## - 1. Download links and other URLs
1.1) [MariaDB](https://mariadb.org/download)

1.2) [MySQL](https://www.mysql.com/downloads/)

1.3) [Percona](https://www.percona.com/downloads/)

1.4) [IceWarp Application](https://www.icewarp.com/download-premise/server/)

##  - 2. Knowledgebase Articles
 2.1)	[Configure MariaDB on Windows](https://support.icewarp.com/hc/en-us/articles/360016806578-Windows-MySQL-MariaDB-setup-for-IceWarp)

 2.2)	[Windows database libraries for MySQL or MariaDB](https://support.icewarp.com/hc/en-us/article_attachments/360018704398/libraries_mysql_6.1.zip)

 2.3)	[Configure MariaDB on Linux](https://support.icewarp.com/hc/en-us/articles/360018895417-Linux-MySQL-MariaDB-setup-for-IceWarp)

 2.4) [IceWarp recommended network ports](https://support.icewarp.com/hc/en-us/articles/6808711405585-IceWarp-recommended-network-ports)

## - 3. Reference 
3.1) DNS Example settings for domain example.com and IceWarp server with IP 66.77.88.99 
```s
; SOA Record
	example.com.        3600     IN     SOA ns41.domaincontrol.com. dns.net. (
	                    2018122702
	                    28800
	                    7200
	                    604800
	                    3600
	                    )
	                    
	; A Records
	mail                86400     IN     A   66.77.88.99
	autodiscover        86400     IN     A   66.77.88.99

	; MX Records
	@                   86400     IN     MX  10          mail.example.com.
	@                   86400     IN     MX  20          backupmail.example.com.

	SRV Records
	_autodiscover._tcp.example.com.        86400 IN SRV 0 5  443 mail.example.com.
	_caldav._tcp.example.com.              86400 IN SRV 0 5   80 mail.example.com.
	_caldavs._tcp.example.com.             86400 IN SRV 0 5  443 mail.example.com.
	_carddav._tcp.example.com.             86400 IN SRV 0 5   80 mail.example.com.
	_carddavs._tcp.example.com.            86400 IN SRV 0 5  443 mail.example.com.
	_xmpp-server._tcp.example.com.         86400 IN SRV 0 5 5222 mail.example.com.
	_xmpp-client._tcp.example.com.         86400 IN SRV 0 5 5222 mail.example.com.
	_ischedule._tcp.examplesomewhere.com.  86400 IN SRV 0 5  443 mail.example.com.

```  

## - 4. Databases
### Installing MariaDB 

 1) 	Silent installation using the MSI installer 
 ```powershell
 msiexec.exe /i mariadb-10.8.6-winx64.msi remove=HeidiSQL PASSWORD=*** PORT=3306 SERVICENAME=MariaDB addlocal=all /passive
 ```
 2) 	Silent removing using the MSI installer 

```powershell
 msiexec.exe /i mariadb-10.8.6-winx64.msi remove=all /qn 
```
3) Check is MariaDB service is running

```powershell
 get-service -name "mariadb"

Status   Name               DisplayName
------   ----               -----------
Running  MariaDB            mariadb
```

 4.1)	[MySQL libraries for Windows](https://support.icewarp.com/hc/en-us/article_attachments/360018704398/libraries_mysql_6.1.zip)

 4.2)	Creating the seven Databases for IceWarp
```sql
CREATE DATABASE accounts default charset utf8mb4 collate utf8mb4_unicode_ci;
CREATE DATABASE antispam default charset utf8mb4 collate utf8mb4_unicode_ci;
CREATE DATABASE groupware default charset utf8mb4 collate utf8mb4_unicode_ci;
CREATE DATABASE webclient default charset utf8mb4 collate utf8mb4_unicode_ci;
CREATE DATABASE eas default charset utf8mb4 collate utf8mb4_unicode_ci;
CREATE DATABASE dircache default charset utf8mb4 collate utf8mb4_unicode_ci;
CREATE DATABASE asreports default charset utf8mb4 collate utf8mb4_unicode_ci;
```
4.3)	Database User and Permissions Syntax
```sql	
CREATE USER user@'<IP>' IDENTIFIED BY <password>;
GRANT ALL PRIVILEGES on <database>.* TO <user>@'<IP>';
```
Example:
```sql
CREATE USER 'iwdbuser'@'127.0.0.1' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON accounts.* TO 'iwdbuser'@'127.0.0.1';
FLUSH PRIVILEGES;
```

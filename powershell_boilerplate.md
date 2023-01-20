[Home](README.md)  |  [Appendix](appendix.md) | [PowerShell AD Boilerplate](powershell_boilerplate.md)  | 
[GitHub Repo](https://github.com/iwDevOps/iwWindowsCourse)

![IceWarp Infra](https://blog.icewarp.com/wp-content/uploads/2022/08/IW-Logo-Wide-4x.png)

# PowerShell  Boilerplate

## PowerShell Profile
```powershell
# Create a PowerShell Profile for current user. Should add profile.ps1 file to Documents\Powershell folder
New-Item $PROFILE.CurrentUserAllHosts -ItemType File -Force
```
### Add this function to Powershell Profile. 
### Function or Alias to call tool.exe from anywhere on the system 
```powershell
function iwtool.exe { C:\'Program Files\IceWarp\tool.exe' $args }
```

## Active Directory 

### Create Organizational Unit (OU)
```powershell
new-adorganizationalunit -name "mydomain2" -path "DC=iw,DC=inc"
```
### Users
```powershell
# Create one user
New-ADUser -Name "John D" -GivenName "John" -Surname "Doe" -SamAccountName "jdoe" -UserPrincipalName "jdoe@iwdevops.net" -EmailAddress "jdoe@iwdevops.net" -Path "OU=mydomain,DC=iw,DC=inc" -AccountPassword (ConvertTo-SecureString -AsPlainText "password" -Force) -Enabled $true -ChangePasswordAtLogon $false
```
### Add 10 Users 
```powershell
# Add 10 Users to the mydomain OU with the first 10 letters of the alphabet
$alphabet = "ABCDEFGHIJ"

for ($i=0; $i -lt 10; $i++) {
    $letter = $alphabet[$i]
    $username = $letter + "_user" 
    $email = $username + "@mydomain.com"

    New-ADUser -Name $username -SamAccountName $username -UserPrincipalName $email -EmailAddress $email -Path "OU=mydomain,DC=iw,DC=inc" -AccountPassword (ConvertTo-SecureString -AsPlainText "1password2?" -Force) -Enabled $true -ChangePasswordAtLogon $true
}
```

### Create one Contact 
```powershell
# Create a contact with an email address 
New-ADObject -Name "SaraDavisContact2" -Type "contact" -ProtectedFromAccidentalDeletion $True -OtherAttributes @{"mail"="sarah@gmail.com"}
New-ADObject -Name "SaraDavisContact3" -Type "contact" -Path "OU=mydomain4,DC=iw,dc=inc"  -OtherAttributes @{'mail'="sarah3@gmail.com"}
```

### For loop to Create 10 Contacts
```powershell
# Create Contact objects with email addresses using a for loop
$firstNames = "John", "Jane", "Bob", "Alice", "Tom", "Emily", "Chris", "Sara", "Mike", "Liz"
$lastNames = "Doe", "Smith", "Williams", "Johnson", "Jones", "Brown", "Miller", "Davis", "Garcia", "Rodriguez"
$emailDomains = "gmail.com", "yahoo.com", "outlook.com"

for ($i = 0; $i -lt 10; $i++) {
    $firstName = $firstNames[$i]
    $lastName = $lastNames[$i]
    $emailDomain = $emailDomains[$i % 3]
    $emailAddress = "$($firstName.Substring(0, 1))$($lastName)@$emailDomain"
    New-ADObject -Type Contact -Name "$firstName $lastName" -Path "OU=mydomain4,DC=iw,DC=inc" -OtherAttributes @{'mail'="$($firstName.Substring(0, 1))$($lastName)@$emailDomain"}
}
``` 
### Add Photo to user object. Admin poweshell session
```powershell
$photo = [byte[]](Get-Content photo.png -Encoding byte)
Set-ADUser <ADUser> -Replace @{thumbnailPhoto=$photo}
```

## Firewall
### Add a Rule 
```powershell
New-NetFirewallRule -DisplayName "IceWarp HTTPs" -Name "IceWarp HTTPs" -Protocol TCP -LocalPort 443 -Group IW -Action Allow -Profile Any
```
### List Enabled ports for the Group IW
```powershell
Get-NetFirewallRule -DisplayGroup '*IW*' |
Format-Table -Property Name,
DisplayName,
DisplayGroup,
@{Name='Protocol';Expression={($PSItem | Get-NetFirewallPortFilter).Protocol}},
@{Name='LocalPort';Expression={($PSItem | Get-NetFirewallPortFilter).LocalPort}},
Enabled,
Profile,
Direction,
Action
```
### Output example
```powershell
Name          DisplayName   DisplayGroup Protocol LocalPort RemotePort RemoteAddress Enabled Profile Direction Action
----          -----------   ------------ -------- --------- ---------- ------------- ------- ------- --------- ------
IceWarp HTTPs IceWarp HTTPs IW           TCP      443       Any        Any              True     Any   Inbound  Allow
```

## Windows Backups
### Enable Windows Backup feature 
```powershell
Install-WindowsFeature -Name Windows-Server-Backup
```
## Windows DNS 
### Export zone to C:\Windows\System32\dns
```powershell
Export-DnsServerZone "iwdevops.local" "iwdevops.local.bak"
```

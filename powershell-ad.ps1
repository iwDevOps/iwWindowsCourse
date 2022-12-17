# Create a PowerShell Profile for current user. Should add it to Documents folder
New-Item $PROFILE.CurrentUserAllHosts -ItemType File -Force

# Add this to Powershell Profile. 
## Function or Alias to call tool.exe from anywhere on the system 
function iwtool.exe { C:\'Program Files\IceWarp\tool.exe' $args }

# Add 10 Users to the mydomain OU with the first 10 letters of the alphabet
$alphabet = "ABCDEFGHIJ"

for ($i=0; $i -lt 10; $i++) {
    $letter = $alphabet[$i]
    $username = $letter+$i + "_user" 
    $email = $username + "@mydomain.com"

    New-ADUser -Name $username -SamAccountName $username -UserPrincipalName $email -EmailAddress $email -Path "OU=mydomain,DC=iw,DC=inc" -AccountPassword (ConvertTo-SecureString -AsPlainText "1password2?" -Force) -Enabled $true -ChangePasswordAtLogon $true
}


# Create an OU in Active Directory
new-adorganizationalunit -name "mydomain2" -path "DC=iw,DC=inc"

# Create one user 
New-ADUser -Name "John D" -GivenName "John" -Surname "Doe" -SamAccountName "jdoe" -UserPrincipalName "jdoe@iwdevops.net" -EmailAddress "jdoe@iwdevops.net" -Path "OU=mydomain,DC=iw,DC=inc" -AccountPassword (ConvertTo-SecureString -AsPlainText "password" -Force) -Enabled $true -ChangePasswordAtLogon $false

# Create a contact with an email address 
 New-ADObject -Name "SaraDavisContact2" -Type "contact" -ProtectedFromAccidentalDeletion $True -OtherAttributes @{"mail"="sarah@gmail.com"}
 New-ADObject -Name "SaraDavisContact3" -Type "contact" -Path "OU=mydomain4,DC=iw,dc=inc"  -OtherAttributes @{'mail'="sarah3@gmail.com"}
 
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
 

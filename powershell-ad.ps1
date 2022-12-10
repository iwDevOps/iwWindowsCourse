# Add Users to the mydomain OU

$alphabet = "ABCDEFGHIJ"

for ($i=0; $i -lt 10; $i++) {
    $letter = $alphabet[$i]
    $username = $letter+$i + "_user" 
    $email = $username + "@mydomain2.com"

    New-ADUser -Name $username -SamAccountName $username -UserPrincipalName $email -EmailAddress $email -Path "OU=mydomain,DC=iw,DC=inc" -AccountPassword (ConvertTo-SecureString -AsPlainText "1password2?" -Force) -Enabled $true -ChangePasswordAtLogon $true
}


# Create an OU in Active Directory
new-adorganizationalunit -name "mydomain2" -path "DC=iw,DC=inc"

# Create one user 
New-ADUser -Name "John D" -GivenName "John" -Surname "Doe" -SamAccountName "jdoe" -UserPrincipalName "jdoe@iwdevops.net" -EmailAddress "jdoe@iwdevops.net" -Path "OU=mydomain,DC=iw,DC=inc" -AccountPassword (ConvertTo-SecureString -AsPlainText "password" -Force) -Enabled $true -ChangePasswordAtLogon $false


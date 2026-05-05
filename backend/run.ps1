# Cravely Backend Run Script

# Load .env file
if (Test-Path ".env") {
    Get-Content .env | ForEach-Object {
        if ($_ -match "^(?<name>[^=]+)=(?<value>.*)$") {
            [System.Environment]::SetEnvironmentVariable($Matches.name, $Matches.value, "Process")
        }
    }
}

# Ensure Java is in path
if ($null -eq $env:JAVA_HOME -or -not (Test-Path "$env:JAVA_HOME\bin\java.exe")) {
    Write-Host "JAVA_HOME not found. Setting it manually for this session..."
    $env:JAVA_HOME = "C:\Program Files\Microsoft\jdk-17.0.19.10-hotspot"
}
$env:Path = "$env:JAVA_HOME\bin;" + $env:Path

# Run Maven
Write-Host "Starting Cravely Backend..."
.\apache-maven-3.9.6\bin\mvn spring-boot:run

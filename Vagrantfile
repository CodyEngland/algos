# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = "ubuntu/trusty64"

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine.
  config.vm.network "forwarded_port", guest: 9000, host: 9000
  config.vm.network "forwarded_port", guest: 9001, host: 9001

  config.vm.synced_folder "./algos-ui", "/home/vagrant/algos-ui", type: "rsync", rsync__exclude: ".git/"
  config.vm.synced_folder "./algos-index", "/home/vagrant/algos-index", type: "rsync", rsync__exclude: ".git/"

  # Setup sudo-less Docker and pip artifacts
  config.vm.provision "shell" do |sh|
    sh.path = "installer.sh"
  end

  config.vm.provision "file", source: "~/.gitconfig", destination: ".gitconfig"
  config.vm.provision "file", source: "~/.ssh/id_rsa", destination: ".ssh/id_rsa"
  config.vm.provision "file", source: "~/.ssh/id_rsa.pub", destination: ".ssh/id_rsa.pub"

  # Name for the guest instance
  config.vm.hostname = "local-docker-dev"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  config.vm.provider "virtualbox" do |vb|
    # Don't boot with headless mode
    # vb.gui = true

    # Specify number of CPUs
    vb.cpus = 2

    # Specify amount of memory
    vb.memory = 4096

    # Customize the max CPU utillization on physical host (max 50%)
    vb.customize ["modifyvm", :id, "--cpuexecutioncap", "50"]
  end

end

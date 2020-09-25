with (import <nixpkgs> {});
let
  env = bundlerEnv {
    name = "vim-wiki";
    inherit ruby;
    gemfile = ./Gemfile;
    lockfile = ./Gemfile.lock;
    gemset = ./gemset.nix;
  };
in stdenv.mkDerivation {
  name = "vim-wiki";
  buildInputs = [env ruby];
}

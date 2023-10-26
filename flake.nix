{
  description = "Personal website and blog";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-23.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        packageName = "jackstanek-github-io";
      in {
       devShells.default = pkgs.mkShell {
         buildInputs = [
           pkgs.zola
         ];
       };
      });
}

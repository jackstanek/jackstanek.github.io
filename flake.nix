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
        deps = [pkgs.zola];
      in {
        devShells.default = pkgs.mkShell {
          buildInputs = deps;
        };
        packages.default = pkgs.stdenvNoCC.mkDerivation {
          name = "website";
          src = self;
          buildInputs = deps;
          phases = ["unpackPhase" "buildPhase" "installPhase"];
          buildPhase = ''
            zola build
          '';
          installPhase = ''
            mkdir -p $out
            cp -r public/* $out/
          '';
        };
      });
}

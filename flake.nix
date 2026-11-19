{
  description = "Personal website and blog";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        packageName = "jackstanek-github-io";
        deps = [pkgs.zola pkgs.typst];
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
            typst compile --font-path ${pkgs.dejavu_fonts}/share/fonts/truetype --root . cv/cv.typ public/cv.pdf
          '';
          installPhase = ''
            mkdir -p $out
            cp -r public/* $out/
          '';
        };
      });
}

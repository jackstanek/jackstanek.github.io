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
        fontPaths = pkgs.lib.makeSearchPath "share/fonts" [pkgs.source-serif pkgs.cooper-hewitt];
      in {
        devShells.default = pkgs.mkShell {
          buildInputs = deps;
          TYPST_FONT_PATHS = fontPaths;
        };
        packages.default = pkgs.stdenvNoCC.mkDerivation {
          name = "website";
          src = self;
          buildInputs = deps;
          TYPST_FONT_PATHS = fontPaths;
          phases = ["unpackPhase" "buildPhase" "installPhase"];
          buildPhase = ''
            zola build
            typst compile --root . cv/cv.typ public/cv.pdf
          '';
          installPhase = ''
            mkdir -p $out
            cp -r public/* $out/
          '';
        };
      });
}

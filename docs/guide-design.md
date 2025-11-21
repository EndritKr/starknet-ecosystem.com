# Guide pour Modifier le Design du Site

Ce guide explique comment modifier l'esthétique de starknet-ecosystem.com de manière simple.

## 📋 Table des Matières

1. [Changer le Logo](#changer-le-logo)
2. [Modifier les Couleurs](#modifier-les-couleurs)
3. [Modifier le Texte du Header](#modifier-le-texte-du-header)
4. [Modifier les Styles Globaux](#modifier-les-styles-globaux)
5. [Aperçu des Changements](#aperçu-des-changements)

---

## 🎨 Changer le Logo

### Où est le logo actuel ?
Le logo se trouve dans le fichier : `src/components/layout/Logo.tsx`

### Logo Image
L'image du logo se trouve dans : `public/starknet-logo.png`

**Pour changer le logo :**
1. Remplacez le fichier `public/starknet-logo.png` par votre nouveau logo
   - Gardez le même nom de fichier : `starknet-logo.png`
   - Ou changez le nom et modifiez la ligne 26 dans `Logo.tsx`

2. Le texte à côté du logo se trouve à la ligne 30 dans `Logo.tsx`
   ```tsx
   <Text ml={3} fontSize="lg" fontWeight="bold">
     StarkNet Ecosystem  // ← Changez ce texte
   </Text>
   ```

### Taille du Logo
La taille du logo est définie ligne 18 dans `Logo.tsx` :
```tsx
<Flex boxSize="36px" alignItems="center">  // ← 36px = taille actuelle
```

---

## 🎨 Modifier les Couleurs

### Où sont les couleurs ?
Les couleurs principales sont dans : `src/styles/customTheme/colors.ts`

### Couleurs Principales (Background)
Les couleurs de fond principales sont dans `primary` (lignes 40-46) :
```typescript
primary: {
  200: "#2E5CFF",      // Bleu clair
  300: "rgba(0,71,255,0.56)",  // Bleu transparent
  500: "#7166F4",      // Violet
  700: "#22244D",      // Bleu foncé
  900: "#121232",      // Fond principal (très foncé) ← C'EST LA COULEUR DE FOND DU SITE
}
```

**Pour changer la couleur de fond du site :**
Modifiez la valeur `primary.900` (ligne 45)

**Exemples :**
- Noir pur : `"#000000"`
- Bleu marine : `"#0a0e27"`
- Gris foncé : `"#1a1a1a"`

### Couleurs d'Accent (Brand)
Les couleurs de la marque sont dans `brand` (lignes 18-28) :
```typescript
brand: {
  400: "#fa6f31",  // Orange
  900: "#ff5007",  // Orange foncé
}
```

**Pour changer les couleurs d'accent :**
Modifiez les valeurs `brand.400` et `brand.900`

### Autres Couleurs
- `flat` : Couleurs plates pour les tags (lignes 7-17)
- `warning` : Couleurs d'avertissement (lignes 47-52)
- `error` : Couleurs d'erreur (lignes 53-56)

### Couleur du Texte
La couleur du texte principal est dans `src/styles/customTheme/index.ts` ligne 15 :
```typescript
body: {
  color: "whiteAlpha.900",  // ← Texte blanc
}
```

Pour changer la couleur du texte, vous pouvez utiliser :
- `"blackAlpha.900"` pour du texte noir
- `"gray.100"` pour du texte gris clair
- Ou une couleur personnalisée : `"#FFFFFF"`

---

## 📝 Modifier le Texte du Header

### Où est le Header ?
Le Header se trouve dans : `src/components/layout/Header.tsx`

### Modifier les Liens du Menu
Les liens de navigation sont aux lignes 44-62 :
```tsx
<Link href={`/${locale}`}>
  {t.common.ecosystem || "Ecosystem"}  // ← Texte affiché
</Link>
```

**Note :** Le texte vient des traductions dans `src/assets/locales/`. 
Pour modifier directement sans passer par les traductions, remplacez `{t.common.ecosystem || "Ecosystem"}` par votre texte.

### Espacement du Menu
L'espacement entre les liens est défini par `ml={6}` (margin-left).
- Plus petit espacement : `ml={4}`
- Plus grand espacement : `ml={8}`

---

## 🎨 Modifier les Styles Globaux

### Où sont les styles globaux ?
Les styles globaux sont dans : `src/styles/globals.css`

### Taille de Police Globale
Modifiez dans `src/styles/customTheme/index.ts` si vous voulez changer la police globale.

### Polices
Les polices sont définies dans : `src/styles/customTheme/fonts.ts`

La police principale est "Syne" qui se trouve dans `public/fonts/`.

---

## 👀 Aperçu des Changements

### Tester vos Modifications

1. **Démarrer le serveur de développement :**
   ```bash
   npm run dev
   ```
   
2. **Ouvrir dans le navigateur :**
   - Allez sur : http://localhost:3000
   - Les changements se reflètent automatiquement (hot-reload)

3. **Voir les changements en temps réel :**
   - Modifiez un fichier
   - Sauvegardez (Cmd+S ou Ctrl+S)
   - Le navigateur se met à jour automatiquement

---

## 📁 Fichiers Importants à Retenir

| Élément | Fichier |
|---------|---------|
| **Logo** | `src/components/layout/Logo.tsx` |
| **Image du Logo** | `public/starknet-logo.png` |
| **Couleurs** | `src/styles/customTheme/colors.ts` |
| **Header** | `src/components/layout/Header.tsx` |
| **Footer** | `src/components/layout/Footer.tsx` |
| **Styles Globaux** | `src/styles/globals.css` |
| **Thème Principal** | `src/styles/customTheme/index.ts` |

---

## 💡 Conseils

1. **Faites des sauvegardes** : Avant de modifier, copiez les fichiers originaux
2. **Testez petit à petit** : Changez une chose à la fois pour voir l'effet
3. **Utilisez des outils** : 
   - Pour les couleurs : https://coolors.co ou https://htmlcolorcodes.com
   - Pour tester les couleurs : Changez une valeur, sauvegardez, regardez le résultat
4. **Format des couleurs** : Utilisez toujours le format hexadécimal : `"#RRGGBB"`

---

## 🆘 Besoin d'Aide ?

Si vous voulez modifier quelque chose de plus spécifique :
- Dites-moi ce que vous voulez changer
- Je vous indiquerai le fichier exact et les lignes à modifier


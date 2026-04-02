# Pitch Set Theory - Interactive JavaScript Tool

An interactive web-based implementation of pitch set theory operations, ported from the Haskell version.

## Features

### 🎹 Pitch Set Creator
- Click on piano keys to create custom pitch sets
- Visual highlighting shows selected pitches
- Displays both note names and numeric pitch class notation
- Clear button to reset selection

### 🔄 Transformations

#### Transposition (T)
- Move all pitches up by n semitones
- Example: T3 transposes all pitches up by 3 semitones

#### Transposition-Inversion (Ti)
- Invert the pitch set (flip around the chromatic axis), then transpose
- Creates related pitch sets used in serial composition

#### Inversion (I)
- Flip all pitches around the chromatic axis
- Each pitch p becomes (12 - p) mod 12

### 📊 Pitch Set Analysis
- **Cardinality**: Number of distinct pitches in the set
- **Intervals**: Distance between consecutive pitches
- **Interval Class Vector**: Counts of each interval type (used in 12-tone analysis)
- **Prime Form**: Canonical form of the pitch set (helps identify equivalent sets)

### 🎼 Automated Composition Generation
Generate musical compositions by applying sequences of transformations:

- **Composition Sequencing**: Build a sequence of T, Ti, and I operations to generate a complete piece
- **Step-by-Step Playback**: Plays each transformation step sequentially (starting set, after T10, after Ti6, etc.)
- **Parametric Control**: Adjust base octave offset (MIDI notes 0-127) for different registers
- **Audio Playback**: Listen to your compositions with adjustable tempo (1-300 BPM)
- **Looping**: Enable continuous playback to hear your composition repeat
- **Round Mode**: Layer phrases incrementally for rich, evolving textures (like a musical canon)
- **Reverb Control**: Add spatial reverb (0-100%) to fill out the sonic space

### 🎵 Pitch Class Converter
- Convert numbers (0-11) to musical note names
- C, Db, D, Eb, E, F, F#, G, Ab, A, Bb, B

## How to Use

### Basic Operations
1. **Create a Pitch Set**
   - Click on piano keys to select pitches
   - Or manually enter pitch numbers

2. **Apply Transformations**
   - Select transposition amount
   - Click the operation button
   - View results instantly

3. **Analyze the Set**
   - Click "Get Info" to see detailed analysis
   - Learn about intervals and relationships

### Automated Composition

1. Select or create a pitch set (click piano keys or use examples)
2. In the "Composition Generator" section:
   - Choose operation type (T, Ti, or I)
   - Enter the transposition amount (if T or Ti)
   - Click "Add to Sequence"
   - Repeat to build your sequence of transformations
3. Adjust the base octave offset (default 60 = middle C in MIDI)
4. Click "Generate Composition"
5. Click "▶ Play" to hear your composition
6. Use the playback controls:
   - **BPM slider** (1-300): Control tempo
   - **Loop checkbox**: Repeat the composition infinitely
   - **Round Mode checkbox**: Layer transformation steps like a musical canon for richer textures
   - **Reverb slider** (0-100%): Add spatial depth and reverb to fill out the sonic space

### Examples from the Repository

The original Haskell implementation includes three pre-built compositions:

**Piece 1** - pitch set [0,1,2,3]:
- T10 → Ti6 → T4 → Ti7 → Ti8 → T4

**Piece 2** - pitch set [0,4,7] (major chord):
- Voice 1 (octave 60): T3 → Ti6 → T4 → Ti11 → Ti8
- Voice 2 (octave 65): T3 → Ti6 → T1 → Ti8 → Ti1

**Piece 3** - pitch set [0,1,7,8]:
- Voice 1 (octave 60): T3 → Ti6 → T4 → Ti11 → Ti8
- Voice 2 (octave 65): T3 → Ti6 → T1 → Ti8 → Ti1
- Voice 3 (octave 57): T3 → Ti6 → T4 → Ti11 → Ti8

## Technical Details

### Pitch Class System
- Pitches are represented as integers 0-11
- Modulo 12 arithmetic keeps pitches within one octave
- No octave distinction (all Cs are equivalent as pitch classes)

### Pitch Set Operations

```javascript
// Create a pitch set
const mySet = new PitchSet([0, 2, 4]); // C, D, E

// Transpose up 5 semitones
const transposed = mySet.transpose(5);

// Invert
const inverted = mySet.invert();

// Transposition-Inversion
const transformed = mySet.ti(7);

// Get prime form
const prime = mySet.getPrimeForm();
```

## File Structure

- `index.html` - Web interface
- `pitchset.js` - Core pitch set theory implementation
- `README.md` - This file

## About Pitch Set Theory

Pitch set theory is a method for analyzing and composing music using pitch classes (0-11) instead of specific pitches. It's based on:

- **Pitch Class**: Represents all octaves of a note as a single entity
- **Transformations**: Systematic ways to modify sets while preserving structure
- **Prime Forms**: Canonical representations that group equivalent sets

Originally formulated by Allen Forte and developed by music theorists for analyzing 20th-century serial and atonal music.

## Examples

### Example 1: Whole Tone Set
```
Pitch Set: {C, D, E, F#, G#, Bb}
Numeric: {0, 2, 4, 6, 8, 10}
Properties: All pitches are 2 semitones apart
```

### Example 2: Chromatic Cluster
```
Original: {C, Db, D}
Transposed up 3 semitones: {Eb, E, F#}
Inverted: {B, Bb, A}
```

### Example 3: Recreate "Piece 1" from the Repository
1. Click "Load Piece 1 [0,1,2,3]" to auto-load the preset
2. Set BPM to 120
3. Adjust reverb to ~40-50%
4. **For a richer sound, enable "Round Mode"** before playing
5. Click "Generate Composition" then "▶ Play"
6. You'll hear each transformation step, with round mode creating layers that build over time
7. The reverb adds spatial depth to the composition

In **Round Mode**, each transformation phase plays while the previous ones continue layering, creating a musical canon effect that's much more sonically interesting than the sequential playback alone!

## Browser Compatibility

Works in all modern browsers (Chrome, Firefox, Safari, Edge) that support ES6 JavaScript.

## Original Reference

Based on the Haskell implementation from:
https://github.com/santolucito/PitchSetTheory
